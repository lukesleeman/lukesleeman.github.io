const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const url = require('url');
const { generateTitle, generateSlug } = require('./title-generator');

// Function to fetch RSS feed
function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Function to download an image/media file
function downloadMedia(mediaUrl, localPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(mediaUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : require('http');
    
    protocol.get(mediaUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${mediaUrl}: ${res.statusCode}`));
        return;
      }
      
      // Ensure directory exists
      const dir = path.dirname(localPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      const fileStream = fs.createWriteStream(localPath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(localPath);
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

// Function to get file extension from URL or media type
function getFileExtension(mediaUrl, mediaType) {
  // Try to get extension from URL first
  const urlPath = url.parse(mediaUrl).pathname;
  const urlExt = path.extname(urlPath);
  if (urlExt) {
    return urlExt;
  }
  
  // Fallback to media type mapping
  const typeMap = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'video/mp4': '.mp4',
    'video/webm': '.webm'
  };
  
  return typeMap[mediaType] || '.jpg';
}


// Helper function to extract text content from XML element
function getTextContent(element) {
  if (!element) return '';
  return element.textContent || element.innerText || '';
}

// Helper function to extract CDATA content
function getCDATAContent(element) {
  if (!element) return '';
  
  // Check for CDATA section
  const cdataMatch = element.innerHTML?.match(/<!\[CDATA\[(.*?)\]\]>/s);
  if (cdataMatch) {
    return cdataMatch[1];
  }
  
  // Fallback to regular text content
  return getTextContent(element);
}

// Function to parse RSS and extract posts using proper XML parsing
function parseRSS(xmlString) {
  const items = [];
  const cutoffDate = new Date(config.CUTOFF_DATE);
  
  // Use proper XML parsing via JSDOM
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM(xmlString, { contentType: 'text/xml' });
  const doc = dom.window.document;
  
  // Get all item elements
  const itemElements = doc.querySelectorAll('item');
  
  for (const itemElement of itemElements) {
    const titleElement = itemElement.querySelector('title');
    const descriptionElement = itemElement.querySelector('description');
    const pubDateElement = itemElement.querySelector('pubDate');
    const linkElement = itemElement.querySelector('link');
    
    const title = getCDATAContent(titleElement);
    const description = getCDATAContent(descriptionElement);
    const pubDate = getTextContent(pubDateElement);
    const link = getTextContent(linkElement);
    
    // Extract media content
    const mediaElements = itemElement.querySelectorAll('media\\:content');
    const media = [];
    
    for (const mediaElement of mediaElements) {
      const mediaUrl = mediaElement.getAttribute('url');
      const mediaType = mediaElement.getAttribute('type');
      const medium = mediaElement.getAttribute('medium'); // 'image' or 'video'
      
      // Get alt text from media:description
      const mediaDescElement = mediaElement.querySelector('media\\:description');
      const altText = mediaDescElement ? getTextContent(mediaDescElement) : '';
      
      if (mediaUrl && medium === 'image') { // Only handle images for now
        media.push({
          url: mediaUrl,
          type: mediaType,
          alt: altText
        });
      }
    }
    
    if (description && pubDate) {
      const postDate = new Date(pubDate);
      
      // Skip posts older than cutoff date
      if (postDate < cutoffDate) {
        console.log(`Skipping old post from ${pubDate}`);
        continue;
      }
      
      // Generate enhanced title from description using the title generator
      const finalTitle = title || generateTitle(description);
      
      // Add all posts from RSS feed (RSS already filters to original posts only)
      items.push({ title: finalTitle, description, pubDate, link, media });
    }
  }
  
  return items;
}

// Function to create Jekyll post
async function createJekyllPost(item, dryRun = false) {
  const date = new Date(item.pubDate);
  const dateStr = date.toISOString().split('T')[0];
  const timeStr = date.toTimeString().split(' ')[0];
  
  // Create a slug from the title using the enhanced slug generator
  const slug = generateSlug(item.title);
  
  const filename = `_posts/${dateStr}-${slug}.md`;
  
  // Check if post already exists
  if (fs.existsSync(filename)) {
    console.log(`Post already exists: ${filename}`);
    return false;
  }
  
  // Download images if any
  const downloadedImages = [];
  if (item.media && item.media.length > 0) {
    console.log(`${dryRun ? 'Would download' : 'Downloading'} ${item.media.length} images for post: ${slug}`);
    
    for (let i = 0; i < item.media.length; i++) {
      const mediaItem = item.media[i];
      const extension = getFileExtension(mediaItem.url, mediaItem.type);
      const imageName = `${dateStr}-${slug}-${i + 1}${extension}`;
      const localPath = `${config.IMAGE_SETTINGS.directory}/${imageName}`;
      
      if (dryRun) {
        console.log(`Would download: ${mediaItem.url} -> ${localPath}`);
        downloadedImages.push({
          path: `${config.IMAGE_SETTINGS.urlPath}/${imageName}`,
          alt: mediaItem.alt || `Image ${i + 1} from Mastodon post`
        });
      } else {
        try {
          await downloadMedia(mediaItem.url, localPath);
          downloadedImages.push({
            path: `${config.IMAGE_SETTINGS.urlPath}/${imageName}`,
            alt: mediaItem.alt || `Image ${i + 1} from Mastodon post`
          });
          console.log(`Downloaded: ${localPath}`);
        } catch (error) {
          console.error(`Failed to download image ${mediaItem.url}:`, error.message);
          // Continue with other images even if one fails
        }
      }
    }
  }
  
  // Build post content
  let postContent = item.description;
  
  // Add images to post content
  if (downloadedImages.length > 0) {
    postContent += '\n\n';
    for (const image of downloadedImages) {
      postContent += `![${image.alt}](${image.path})\n\n`;
    }
  }
  
  const frontMatter = `---
layout: ${config.POST_SETTINGS.layout}
title: "${item.title.replace(/"/g, '\\"')}"
date: ${dateStr} ${timeStr} ${config.POST_SETTINGS.timezone}
categories: ${JSON.stringify(config.POST_SETTINGS.categories)}
mastodon_url: "${item.link}"
excerpt: "${item.description.substring(0, 150).replace(/"/g, '\\"')}..."
---

${postContent}

*Originally posted on [Mastodon](${item.link})*
`;
  
  if (dryRun) {
    console.log(`Would create post: ${filename}`);
    console.log('--- POST CONTENT PREVIEW ---');
    console.log(frontMatter.substring(0, 500) + (frontMatter.length > 500 ? '...' : ''));
  } else {
    fs.writeFileSync(filename, frontMatter);
    console.log(`Created post: ${filename}`);
  }
  return true;
}

// Export functions for testing
module.exports = {
  fetchRSS,
  parseRSS,
  createJekyllPost
};

// Main function
async function main() {
  try {
    console.log('Fetching Mastodon RSS feed...');
    const rssXml = await fetchRSS(config.RSS_FEED_URL);
    
    console.log('Parsing RSS feed...');
    const items = parseRSS(rssXml);
    
    console.log(`Found ${items.length} items in RSS feed`);
    
    let newPosts = 0;
    for (const item of items.slice(0, config.MAX_POSTS_PER_RUN)) {
      if (await createJekyllPost(item)) {
        newPosts++;
      }
    }
    
    console.log(`Created ${newPosts} new posts`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();

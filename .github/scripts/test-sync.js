const { fetchRSS, parseRSS, createJekyllPost } = require('./sync-mastodon');
const config = require('./config');

async function testSync() {
  try {
    console.log('=== TESTING MASTODON RSS SYNC ===\n');
    
    console.log('Configuration:');
    console.log(`- RSS URL: ${config.RSS_FEED_URL}`);
    console.log(`- Image directory: ${config.IMAGE_SETTINGS.directory}`);
    console.log(`- Image URL path: ${config.IMAGE_SETTINGS.urlPath}`);
    console.log(`- Cutoff date: ${config.CUTOFF_DATE}`);
    console.log(`- Max posts per run: ${config.MAX_POSTS_PER_RUN}\n`);
    
    console.log('Fetching RSS feed...');
    const rssXml = await fetchRSS(config.RSS_FEED_URL);
    console.log(`RSS feed size: ${rssXml.length} characters\n`);
    
    console.log('Parsing RSS feed...');
    const items = parseRSS(rssXml);
    console.log(`Found ${items.length} posts after filtering\n`);
    
    if (items.length === 0) {
      console.log('No posts found to test.');
      return;
    }
    
    // Test the first post in dry run mode
    console.log('=== TESTING FIRST POST (DRY RUN) ===');
    const firstPost = items[0];
    console.log(`Title: ${firstPost.title}`);
    console.log(`Date: ${firstPost.pubDate}`);
    console.log(`Media count: ${firstPost.media ? firstPost.media.length : 0}`);
    console.log(`Link: ${firstPost.link}\n`);
    
    await createJekyllPost(firstPost, true); // Dry run
    
    console.log('\n=== TEST COMPLETE ===');
    console.log('The script is working correctly!');
    console.log('To run for real, use: node .github/scripts/sync-mastodon.js');
    
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

testSync();

// Enhanced title generation for Mastodon posts

/**
 * Generates a clean, readable title from Mastodon post content
 * @param {string} description - The HTML description from the Mastodon post
 * @param {string} originalTitle - The original title from RSS (often truncated)
 * @returns {string} - A clean, readable title
 */
function generateTitle(description, originalTitle = '') {
  if (!description) return 'Untitled Post';
  
  // First decode HTML entities, then strip HTML tags
  let cleanText = description
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '') // Remove HTML tags after decoding
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  if (!cleanText) return 'Untitled Post';
  
  // Try different strategies to generate a good title
  
  // Strategy 1: Look for natural sentence endings that could make good titles
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length > 0) {
    const firstSentence = sentences[0].trim();
    
    // If first sentence is a good length (15-80 chars), use it
    if (firstSentence.length >= 15 && firstSentence.length <= 80) {
      return capitaliseTitle(firstSentence);
    }
    
    // If first sentence is too long, try to find a natural break point
    if (firstSentence.length > 80) {
      const title = findNaturalBreakPoint(firstSentence);
      if (title) return capitaliseTitle(title);
    }
  }
  
  // Strategy 2: Look for hashtags that might indicate the topic
  const hashtagMatch = cleanText.match(/#(\w+)/);
  if (hashtagMatch) {
    const beforeHashtag = cleanText.substring(0, cleanText.indexOf('#')).trim();
    
    if (beforeHashtag.length >= 15 && beforeHashtag.length <= 70) {
      return capitaliseTitle(beforeHashtag);
    }
  }
  
  // Strategy 3: Look for common post patterns
  const patterns = [
    // "Day X of..." patterns
    /^(Day \d+ of .{10,50}?)(?:[.!?]|$)/i,
    // "I'm doing X" or "I've been X"
    /^(I'm|I've|I am|I have)\s+(.{10,50}?)(?:[.!?]|$)/i,
    // "Just X" or "Today I X"
    /^(Just|Today I|Yesterday I)\s+(.{10,50}?)(?:[.!?]|$)/i,
    // "Check out X" or "Look at X"
    /^(Check out|Look at|Here's)\s+(.{10,50}?)(?:[.!?]|$)/i,
    // Questions
    /^(.{15,70}\?)(?:\s|$)/i,
    // "Over the past..." or "Why..." patterns
    /^(Over the past|Why|When|Where|How)\s+(.{10,50}?)(?:[.!?]|$)/i
  ];
  
  for (const pattern of patterns) {
    const match = cleanText.match(pattern);
    if (match) {
      let title;
      if (match[2]) {
        title = `${match[1]} ${match[2]}`;
      } else {
        title = match[1];
      }
      return capitaliseTitle(title.replace(/[.!?]+$/, ''));
    }
  }
  
  // Strategy 4: Use first meaningful chunk of text
  const words = cleanText.split(/\s+/);
  let title = '';
  let wordCount = 0;
  
  for (const word of words) {
    // Skip very short words at the start unless they're important
    if (title === '' && word.length < 2 && !['I', 'A'].includes(word)) {
      continue;
    }
    
    title += (title ? ' ' : '') + word;
    wordCount++;
    
    // Stop at natural break points
    if (wordCount >= 4 && (
      title.length >= 40 || 
      word.endsWith('.') || 
      word.endsWith('!') || 
      word.endsWith('?') ||
      word.endsWith(':')
    )) {
      break;
    }
    
    // Don't make titles too long
    if (title.length >= 80) {
      break;
    }
  }
  
  // Clean up the final title
  title = title.replace(/[.!?:]+$/, '').trim();
  
  // Ensure minimum length
  if (title.length < 15) {
    title = cleanText.substring(0, 60).trim();
    // Try to end at a word boundary
    const lastSpace = title.lastIndexOf(' ');
    if (lastSpace > 20) {
      title = title.substring(0, lastSpace);
    }
  }
  
  // Ensure maximum length
  if (title.length > 80) {
    title = title.substring(0, 77);
    // Try to end at a word boundary
    const lastSpace = title.lastIndexOf(' ');
    if (lastSpace > 50) {
      title = title.substring(0, lastSpace);
    }
    title += '...';
  }
  
  return capitaliseTitle(title) || 'Untitled Post';
}

/**
 * Finds a natural break point in a long sentence
 * @param {string} sentence - The sentence to break
 * @returns {string|null} - The title or null if no good break point found
 */
function findNaturalBreakPoint(sentence) {
  // Look for natural break points like commas, colons, or conjunctions
  const breakPoints = [
    /^(.{25,70}),\s+/,  // Comma break
    /^(.{25,70}):\s+/,  // Colon break
    /^(.{25,70})\s+(and|but|or|so)\s+/i,  // Conjunction break
    /^(.{25,70})\s+(because|since|while|when|if)\s+/i,  // Subordinate clause break
  ];
  
  for (const pattern of breakPoints) {
    const match = sentence.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // If no natural break, just truncate at word boundary
  const words = sentence.split(/\s+/);
  let result = '';
  
  for (const word of words) {
    const testResult = result + (result ? ' ' : '') + word;
    if (testResult.length > 70) break;
    result = testResult;
  }
  
  return result.length >= 25 ? result : null;
}

/**
 * Capitalises the title appropriately (British spelling)
 * @param {string} title - The title to capitalise
 * @returns {string} - The capitalised title
 */
function capitaliseTitle(title) {
  if (!title) return '';
  
  // Don't over-capitalise if it already looks properly formatted
  const hasProperCapitalisation = /^[A-Z]/.test(title) && /[a-z]/.test(title);
  
  if (hasProperCapitalisation) {
    return title;
  }
  
  // Simple sentence case: capitalise first letter
  return title.charAt(0).toUpperCase() + title.slice(1);
}

/**
 * Generates a URL-friendly slug from the title
 * @param {string} title - The title to convert to slug
 * @returns {string} - The slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens
    .substring(0, 50)         // Limit length
    .replace(/-+$/, '');      // Remove trailing hyphens again
}

module.exports = {
  generateTitle,
  generateSlug,
  capitaliseTitle,
  findNaturalBreakPoint
};

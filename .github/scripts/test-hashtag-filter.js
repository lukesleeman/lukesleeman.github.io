const { parseRSS } = require('./sync-mastodon');
const config = require('./config');

// Mock RSS feed with posts containing and not containing #microblog
const mockRSSWithHashtag = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Test Feed</title>
    <item>
      <title>Post with hashtag</title>
      <description><![CDATA[This is a test post with #microblog hashtag]]></description>
      <pubDate>Thu, 01 Nov 2025 10:00:00 +0000</pubDate>
      <link>https://example.com/post1</link>
    </item>
    <item>
      <title>Post without hashtag</title>
      <description><![CDATA[This is a test post without the hashtag]]></description>
      <pubDate>Thu, 02 Nov 2025 10:00:00 +0000</pubDate>
      <link>https://example.com/post2</link>
    </item>
    <item>
      <title>Another post with hashtag</title>
      <description><![CDATA[Another post with #microblog in it]]></description>
      <pubDate>Thu, 03 Nov 2025 10:00:00 +0000</pubDate>
      <link>https://example.com/post3</link>
    </item>
  </channel>
</rss>`;

console.log('=== TESTING HASHTAG FILTERING ===\n');

// Test 1: With filtering disabled (default)
console.log('Test 1: Hashtag filtering DISABLED');
console.log('Expected: All 3 posts should be parsed\n');
config.HASHTAG_FILTER.ENABLED = false;
const itemsWithoutFilter = parseRSS(mockRSSWithHashtag);
console.log(`Result: Found ${itemsWithoutFilter.length} posts`);
itemsWithoutFilter.forEach((item, i) => {
  console.log(`  ${i + 1}. ${item.title}`);
});
console.log(`✓ ${itemsWithoutFilter.length === 3 ? 'PASSED' : 'FAILED'}\n`);

// Test 2: With filtering enabled
console.log('Test 2: Hashtag filtering ENABLED (tag: "microblog")');
console.log('Expected: Only 2 posts with #microblog should be parsed\n');
config.HASHTAG_FILTER.ENABLED = true;
config.HASHTAG_FILTER.TAG = 'microblog';
const itemsWithFilter = parseRSS(mockRSSWithHashtag);
console.log(`Result: Found ${itemsWithFilter.length} posts`);
itemsWithFilter.forEach((item, i) => {
  console.log(`  ${i + 1}. ${item.title}`);
});
console.log(`✓ ${itemsWithFilter.length === 2 ? 'PASSED' : 'FAILED'}\n`);

// Test 3: Verify the filtered posts are the correct ones
console.log('Test 3: Verify correct posts were filtered');
const hasCorrectPosts = itemsWithFilter.every(item =>
  item.title === 'Post with hashtag' || item.title === 'Another post with hashtag'
);
console.log(`✓ ${hasCorrectPosts ? 'PASSED - Correct posts filtered' : 'FAILED - Wrong posts filtered'}\n`);

// Test 4: Different hashtag
console.log('Test 4: Different hashtag that doesn\'t exist');
console.log('Expected: 0 posts\n');
config.HASHTAG_FILTER.ENABLED = true;
config.HASHTAG_FILTER.TAG = 'nonexistent';
const itemsWithDifferentTag = parseRSS(mockRSSWithHashtag);
console.log(`Result: Found ${itemsWithDifferentTag.length} posts`);
console.log(`✓ ${itemsWithDifferentTag.length === 0 ? 'PASSED' : 'FAILED'}\n`);

// Reset config
config.HASHTAG_FILTER.ENABLED = false;
config.HASHTAG_FILTER.TAG = 'microblog';

console.log('=== ALL TESTS COMPLETE ===');

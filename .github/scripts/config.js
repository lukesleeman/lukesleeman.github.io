// Configuration for Mastodon to Jekyll sync
module.exports = {
  // Only process posts after this date (set to go-live date)
  CUTOFF_DATE: '2025-08-29T00:00:00Z',
  
  // Mastodon RSS feed URL
  RSS_FEED_URL: 'https://aus.social/@lukesleeman.rss',
  
  // Jekyll post settings
  POST_SETTINGS: {
    layout: 'post',
    categories: ['mastodon', 'microblog'],
    timezone: '+1000'
  },
  
  // Image handling settings
  IMAGE_SETTINGS: {
    // Directory to store downloaded images (relative to site root)
    directory: 'assets/images/mastodon',
    // URL path for images in posts (should match directory with leading slash)
    urlPath: '/assets/images/mastodon'
  },
  
  // Processing limits
  MAX_POSTS_PER_RUN: 10,
  MIN_POST_LENGTH: 10
};

# Mastodon to Jekyll Sync Setup

This repository now includes an automated system to sync your Mastodon posts to Jekyll blog posts.

## How It Works

The GitHub Actions workflow (`.github/workflows/mastodon-to-jekyll.yml`) runs every 2 hours and:

1. Fetches your Mastodon RSS feed from `https://aus.social/@lukesleeman.rss`
4. Creates Jekyll markdown files in the `_posts/` directory for new posts
5. Commits and pushes any new posts automatically

## Go live date

The system automatically filters out posts before a "go live date"

### Date Filtering
- **Cutoff Date**: Only processes posts after `2025-08-29T00:00:00Z`
- **Easy to Change**: Update the `CUTOFF_DATE` variable at the top of the workflow file
- **Prevents Spam**: Won't import your entire Mastodon history

## What Gets Created

Each Mastodon post becomes a Jekyll post with:
- **Layout**: `post`
- **Categories**: `[mastodon, microblog]`
- **Title**: First 50 characters of your toot (cleaned for filename)
- **Date**: Original post date from Mastodon
- **Content**: Full toot content plus link back to original
- **Front matter**: Includes `mastodon_url` for reference

## Local Testing

You can test locally without creating files (dry run) by running

`node .github/scripts/test-sync.js`

Or create actual posts and download images by 

`node .github/scripts/sync-mastodon.js`

## Customisation Options

### Changing Configuration
All settings are now in `.github/scripts/config.js` for easy modification:

```javascript
module.exports = {
  // Only process posts after this date (set to go-live date)
  CUTOFF_DATE: '2025-08-29T00:00:00Z',  // Change this date
  
  // Mastodon RSS feed URL
  RSS_FEED_URL: 'https://aus.social/@lukesleeman.rss',
  
  // Jekyll post settings
  POST_SETTINGS: {
    layout: 'post',
    categories: ['mastodon', 'microblog'],  // Change categories here
    timezone: '+1000'
  },
  
  // Processing limits
  MAX_POSTS_PER_RUN: 10,  // How many posts to process per run
  MIN_POST_LENGTH: 10     // Minimum post length to include
};
```

The `cron` schedule can be edited in the workflow file
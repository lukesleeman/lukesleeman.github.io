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
- **Easy to Change**: Update the `CUTOFF_DATE` variable in `.github/scripts/config.js`
- **Prevents Spam**: Won't import your entire Mastodon history

### Hashtag Filtering

You can configure the sync to only import posts that include a specific hashtag. This is useful if you want to be selective about which posts get synced to your blog.

To enable hashtag filtering, edit `.github/scripts/config.js`:

```javascript
HASHTAG_FILTER: {
  // Set to true to only sync posts with a specific hashtag
  enabled: true,  // Change to true to enable filtering
  // The hashtag to filter by (without the # symbol)
  // Posts will only be synced if they contain this hashtag
  tag: 'microblog'  // Change to your preferred hashtag
}
```

**Behavior Options:**
- `enabled: false` - Syncs all posts (default behavior)
- `enabled: true` - Only syncs posts containing the specified hashtag (e.g., `#microblog`)

**Example:**
- If `tag: 'microblog'`, only posts containing `#microblog` will be synced
- Change `tag` to any hashtag you want (without the `#` symbol)
- Posts without the hashtag will be skipped and logged

## What Gets Created

Each Mastodon post becomes a Jekyll post with:
- **Layout**: `post`
- **Categories**: `[mastodon, microblog]`
- **Title**: Intelligently generated from post content using enhanced title generation
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
  MIN_POST_LENGTH: 10,    // Minimum post length to include

  // Hashtag filtering settings
  HASHTAG_FILTER: {
    enabled: false,       // Set to true to enable hashtag filtering
    tag: 'microblog'      // The hashtag to filter by (without #)
  }
};
```

The `cron` schedule can be edited in the workflow file

## Title Generation

The system uses intelligent title generation (`.github/scripts/title-generator.js`) that creates readable, descriptive titles from your Mastodon posts instead of simple truncation.

### Title Generation Strategies
- **Natural sentences**: Uses complete first sentences when they're a good length (15-80 chars)
- **Pattern recognition**: Recognises common patterns like "Day X of...", "I'm doing...", questions, etc.
- **HTML entity decoding**: Properly converts `&#39;` to `'`, `&quot;` to `"`, etc.
- **Smart truncation**: Finds natural break points at commas, conjunctions, or word boundaries
- **Fallback handling**: Uses meaningful text chunks when other strategies don't work

### Examples
- `"I&#39;m challenging myself to build 10 things in 10 d"` → `"I'm challenging myself to build 10 things in 10 days using agentic AI"`
- `"Day 2 of &amp;quot;building stuff&amp;quot; with using agentic"` → `"Day 2 of "building stuff" with using agentic AI"`

You can test title generation with: `node .github/scripts/test-title-generator.js`

// HTML to Markdown converter for Mastodon posts

/**
 * Converts HTML content from Mastodon to clean Markdown
 * @param {string} html - The HTML content to convert
 * @returns {string} - Clean Markdown content
 */
function htmlToMarkdown(html) {
  if (!html) return '';
  
  let markdown = html;
  
  // First decode HTML entities
  markdown = markdown
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Convert paragraphs - handle both opening and closing tags
  markdown = markdown.replace(/<p[^>]*>/g, '\n\n').replace(/<\/p>/g, '');
  
  // Convert line breaks
  markdown = markdown.replace(/<br\s*\/?>/g, '\n');
  
  // Handle Mastodon's complex link structure - extract all text content from within the <a> tag
  markdown = markdown.replace(
    /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g,
    (match, url, content) => {
      // Strip all HTML tags from the content and concatenate the text
      const linkText = content.replace(/<[^>]*>/g, '');
      return `[${linkText}](${url})`;
    }
  );
  
  // Handle mention links
  markdown = markdown.replace(
    /<span class="h-card"[^>]*><a href="([^"]*)" class="u-url mention">@<span>([^<]*)<\/span><\/a><\/span>/g,
    '[@$2]($1)'
  );
  
  // Convert hashtag links
  markdown = markdown.replace(
    /<a href="[^"]*" class="mention hashtag"[^>]*>#<span>([^<]*)<\/span><\/a>/g,
    '#$1'
  );
  
  // Convert simple links (after complex ones)
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '[$2]($1)');
  
  // Remove any remaining spans and other formatting tags
  markdown = markdown.replace(/<\/?span[^>]*>/g, '');
  markdown = markdown.replace(/<\/?div[^>]*>/g, '');
  
  // Convert formatting tags
  markdown = markdown.replace(/<\/?strong>/g, '**');
  markdown = markdown.replace(/<\/?em>/g, '*');
  markdown = markdown.replace(/<\/?i>/g, '*');
  markdown = markdown.replace(/<\/?b>/g, '**');
  
  // Convert headings (if any)
  markdown = markdown.replace(/<h([1-6])[^>]*>([^<]*)<\/h[1-6]>/g, (match, level, text) => {
    return '\n' + '#'.repeat(parseInt(level)) + ' ' + text + '\n';
  });
  
  // Convert lists
  markdown = markdown.replace(/<ul[^>]*>/g, '\n');
  markdown = markdown.replace(/<\/ul>/g, '\n');
  markdown = markdown.replace(/<ol[^>]*>/g, '\n');
  markdown = markdown.replace(/<\/ol>/g, '\n');
  markdown = markdown.replace(/<li[^>]*>/g, '- ');
  markdown = markdown.replace(/<\/li>/g, '\n');
  
  // Convert blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>/g, '\n> ');
  markdown = markdown.replace(/<\/blockquote>/g, '\n');
  
  // Convert code blocks and inline code
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>([^<]*)<\/code><\/pre>/g, '\n```\n$1\n```\n');
  markdown = markdown.replace(/<code[^>]*>([^<]*)<\/code>/g, '`$1`');
  
  // Remove any remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Clean up whitespace
  markdown = markdown
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Multiple newlines to double newlines
    .replace(/^\s+|\s+$/g, '') // Trim start and end
    .replace(/[ \t]+/g, ' ') // Multiple spaces to single space
    .replace(/\n /g, '\n'); // Remove spaces at start of lines
  
  return markdown;
}

module.exports = {
  htmlToMarkdown
};

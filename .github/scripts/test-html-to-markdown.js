// Test script for HTML to Markdown conversion
const { htmlToMarkdown } = require('./html-to-markdown');

// Test cases from actual Mastodon posts
const testCases = [
  {
    name: "Simple paragraph with entities",
    html: "<p>I&#39;m challenging myself to build 10 things in 10 days using agentic AI!</p>",
    expected: "I'm challenging myself to build 10 things in 10 days using agentic AI!"
  },
  {
    name: "Multiple paragraphs with line breaks",
    html: "<p># Tools I used<br />Visual studio code, with the Clien plugin using the claude 4.0 sonnet model.</p><p>The website is hosted using GitHub pages.</p>",
    expected: "# Tools I used\nVisual studio code, with the Clien plugin using the claude 4.0 sonnet model.\n\nThe website is hosted using GitHub pages."
  },
  {
    name: "Complex link with spans",
    html: '<p>For day 1 I decided to resurrect my website at <a href="http://www.lukesleeman.com" target="_blank" rel="nofollow noopener" translate="no"><span class="invisible">http://www.</span><span class="">lukesleeman.com</span><span class="invisible"></span></a></p>',
    expected: "For day 1 I decided to resurrect my website at [lukesleeman.com](http://www.lukesleeman.com)"
  },
  {
    name: "Mention link",
    html: '<p>This morning I was talking to <span class="h-card" translate="no"><a href="https://mastodon.social/@mitch_nz" class="u-url mention">@<span>mitch_nz</span></a></span> who suggested I should try out different tools.</p>',
    expected: "This morning I was talking to [@mitch_nz](https://mastodon.social/@mitch_nz) who suggested I should try out different tools."
  },
  {
    name: "List with line breaks",
    html: '<p>- The websites back up and running!<br />- The tool was able to do a surprisingly broad range of things.<br />- I was able to get a surprisingly large amount of things done.</p>',
    expected: "- The websites back up and running!\n- The tool was able to do a surprisingly broad range of things.\n- I was able to get a surprisingly large amount of things done."
  },
  {
    name: "Hashtag link",
    html: '<p>Over the past month, I&#39;ve been participating in the <a href="https://aus.social/tags/pushupchallenge2025" class="mention hashtag" rel="tag">#<span>pushupchallenge2025</span></a> to raise money for <a href="https://aus.social/tags/mentalhealth" class="mention hashtag" rel="tag">#<span>mentalhealth</span></a></p>',
    expected: "Over the past month, I've been participating in the #pushupchallenge2025 to raise money for #mentalhealth"
  },
  {
    name: "Question with entities",
    html: '<p>Why liquid glass, when Bayeux Tapestry was right there waiting for them?</p>',
    expected: "Why liquid glass, when Bayeux Tapestry was right there waiting for them?"
  },
  {
    name: "Emojis and quotes",
    html: '<p>YOLO I guess 🤷‍♂️<br />- It costs 💰💰💰! By the end of the day I had burnt through $30 of tokens<br />- It hallucinates and makes things up, and makes mistakes. This isn&#39;t as bad as would you expect.</p>',
    expected: "YOLO I guess 🤷‍♂️\n- It costs 💰💰💰! By the end of the day I had burnt through $30 of tokens\n- It hallucinates and makes things up, and makes mistakes. This isn't as bad as would you expect."
  }
];

console.log('Testing HTML to Markdown Conversion\n');
console.log('='.repeat(80));

let passedTests = 0;
let failedTests = 0;

testCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}: ${testCase.name}`);
  console.log('-'.repeat(50));
  
  const result = htmlToMarkdown(testCase.html);
  const passed = result.trim() === testCase.expected.trim();
  
  console.log(`Input:    ${testCase.html}`);
  console.log(`Expected: ${testCase.expected}`);
  console.log(`Result:   ${result}`);
  console.log(`Status:   ${passed ? '✅ PASS' : '❌ FAIL'}`);
  
  if (passed) {
    passedTests++;
  } else {
    failedTests++;
    console.log(`Difference: Expected "${testCase.expected.trim()}" but got "${result.trim()}"`);
  }
});

console.log('\n' + '='.repeat(80));
console.log(`Test Results: ${passedTests} passed, ${failedTests} failed`);

// Test with a full post example
console.log('\n' + '='.repeat(80));
console.log('Full Post Example:');
console.log('-'.repeat(50));

const fullPostHtml = `<p>I&#39;m challenging myself to build 10 things in 10 days using agentic AI!</p><p>I&#39;ve been ... ambivalent... about Ai tools for quite a while.  This morning I was talking to <span class="h-card" translate="no"><a href="https://mastodon.social/@mitch_nz" class="u-url mention">@<span>mitch_nz</span></a></span> who suggested I should try out different tools and build 10 things in 10 days.</p><p>For day 1 I decided to resurrect my website at <a href="http://www.lukesleeman.com" target="_blank" rel="nofollow noopener" translate="no"><span class="invisible">http://www.</span><span class="">lukesleeman.com</span><span class="invisible"></span></a> </p><p># Tools I used<br />Visual studio code, with the Clien plugin using the claude 4.0 sonnet model.</p>`;

const fullPostResult = htmlToMarkdown(fullPostHtml);
console.log('Converted full post:');
console.log(fullPostResult);

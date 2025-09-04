---
layout: post
title: "Day 2 of \"building stuff\" with using agentic AI"
date: 2025-09-03 17:35:04 +1000
categories: ["mastodon","microblog"]
mastodon_url: "https://aus.social/@lukesleeman/115139209106715226"
excerpt: "<p>Day 2 of &quot;building stuff&quot; with using agentic AI!   I built a bookmarklet to automate crew entry for my dragon boat club.</p><p>The websit..."
---

Day 2 of "building stuff" with using agentic AI! I built a bookmarklet to automate crew entry for my dragon boat club.

The website we use for registering crews is good ... but it has no "bulk entry", which means adding a crew of 26 paddlers involves **a lot** of clicking, typing and cross checking spreadsheets to ensure there are no errors.

The code is at [github.com/lukesleeman/revspor](https://github.com/lukesleeman/revsport-crew-entry-bookmarklet)

# Tools I used

- Claude Code, firstly in the terminal and then with the VS plugin
- I setup a nifty bookmarklet development environment using webpack to bundle and compress the javascript into a bookmarklet
- NPM ties everything together and is used for building

# What went well

- I was able to get an environment setup quickly, even though I had no idea around the best way to develop bookmarklets
- Added functionality rapidly, and got a lot of stuff working with little effort
- My estimate was I got a 200% to 300% speed boost. That is, it would have taken me 2 or 3 days to do this on my own, instead it took an afternoon
- Most of the time I would have taken to do this by hand would have been around researching the tech stack and tools and figuring out how to do basic stuff. So having the ability to have claude get all the environment together rapidly was very helpful
- Claude always asks you before executing any tool, so there were no more instances of it checking stuff in and deploying by its self!

# What went badly

- The claude interface is pretty clunky, not sure I like it as much as cline
- Perhaps its the "we are building a bookmarklet" - but the tool tended towards fairly "hacky" solutions. This wasn't too bad, as I was able to point it in better directions.

# What I learnt

- It really helps to have somebody with software dev experience and a solid mental model of how to structure and architect software, to guide the tool in the right direction
- If your looking to get started quickly with a unfamiliar environment, agentic AI can be really helpful

![A screenshot of the bookmarklet in action.  We can see it fuzzy matching 3 names in a list](/assets/images/mastodon/2025-09-03-day-2-of-building-stuff-with-using-agentic-ai-1.png)



*Originally posted on [Mastodon](https://aus.social/@lukesleeman/115139209106715226)*

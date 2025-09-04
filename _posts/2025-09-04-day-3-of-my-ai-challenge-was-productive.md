---
layout: post
title: "Day 3 of my AI challenge was productive"
date: 2025-09-04 13:07:29 +1000
categories: ["mastodon","microblog"]
mastodon_url: "https://aus.social/@lukesleeman/115146178494646879"
excerpt: "<p>Day 3 of my AI challenge was productive.  I re-worked the name matching logic of my revsport bookmarklet to be a lot more robust.  I also updated t..."
---

Day 3 of my AI challenge was productive. I re-worked the name matching logic of my revsport bookmarklet to be a lot more robust. I also updated the docs, putting installation instructions right up the top, and recorded a nice video of it in action.

The code is at [github.com/lukesleeman/revspor](https://github.com/lukesleeman/revsport-crew-entry-bookmarklet)

# Tools I used

- Claude Code, then Cline
- I switched between a few models, trying out the very pricy Claude Opus 4.1 model
- Apart from the JS used in the bookmarklet, I also generated some python script to modify test data.

# What went well

- Matching names is non trivial. I spent some time getting together test data based off previous regattas, then asked the agent to come up with an approach. It developed a robust multi-strategy approach, that I would have taken a long time to come up with.
- We were able to quickly iterate through various UI design ideas for dealing with the name matching process, coming up with a good final design
- We were able to remove personally identifying information from a copy of the revsport webpage, allowing me to use it for a video recording, and to check the page in.

# What went badly
- WOW the Opus 4.1 model is expensive to use 💸
- I asked the tool to replace personally identifying information in a saved copy of the revsport webpage, with mock data. It tried to do this using sed, and landed up in all kinds of trouble. Prompting it to create a script to modify the page worked much better.

# What I learnt

- For data processing tasks its often better to get it to write a script to do the processing, rather than having the model attempt it directly.
- I'm not sure the Opus 4.1 model actually gives better results. Its smarter - but that sometimes leads it towards choosing solutions that are too smart for their own good! In coding, a simpler approach of breaking things down into basic steps often gives better results.
- This feels a lot like helping guide a junior dev. Being able to provide good reviews of the code, and guide the tool in better directions are critical skills.

<video controls loop muted style="max-width: 100%; height: auto;">
  <source src="/assets/images/mastodon/2025-09-04-day-3-of-my-ai-challenge-was-productive-1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>



*Originally posted on [Mastodon](https://aus.social/@lukesleeman/115146178494646879)*

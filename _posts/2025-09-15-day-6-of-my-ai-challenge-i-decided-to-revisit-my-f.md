---
layout: post
title: "Day 6 of my AI challenge I decided to revisit my fixing up the the"
date: 2025-09-15 05:44:57 +1000
categories: ["mastodon","microblog"]
mastodon_url: "https://aus.social/@lukesleeman/115206723853353195"
excerpt: "<p>Day 6 of my AI challenge I decided to revisit my fixing up the the albums on my immich instance.</p><p>Reflecting on what went wrong last time, I t..."
---

Day 6 of my AI challenge I decided to revisit my fixing up the the albums on my immich instance.

Reflecting on what went wrong last time, I think I was relying way to much on the supposed "intelligence" part of AI to figure out what was going wrong and how to solve it. This time I started out by spending a bunch of time poking at the immich API, writing up the results and figuring out how to solve my duplicate image problem. Only once I had a solid handle on the problem did I jump into the tools and start generating code.

# Tools I used

- Cline, with the claude 4.0 sonnet model
- Go for scripting
- Bruno for exploring the immich API

# What went well

- A lot! I was able to quickly generate a go script that would detect duplicate images in my immich albums. From there it was easy to generate further code to cleanup the duplicate images.
- I landed up with a robust script to solve the problem!

# What went badly

- Nothing really - things moved along quite quickly and efficiently.

# What I learnt

- Its up to you to provide the "intelligence"!

*Originally posted on [Mastodon](https://aus.social/@lukesleeman/115206723853353195)*

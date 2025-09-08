---
layout: post
title: "Day 4 of my AI challenge was disaster"
date: 2025-09-08 07:08:16 +1000
categories: ["mastodon","microblog"]
mastodon_url: "https://aus.social/@lukesleeman/115167415292709300"
excerpt: "<p>Day 4 of my AI challenge was disaster!  I wanted to test how well the system would go diagnosing an issue with a large, multi language codebase.</p..."
---

Day 4 of my AI challenge was disaster! I wanted to test how well the system would go diagnosing an issue with a large, multi language codebase.

I've setup an immich ( [https://immich.app/](https://immich.app/) ) instance and I've imported my photos from a google photos backup using the immich-go tool. However I'm experiencing some strange behaviour with the way edited photos inside albums were handled. I was hoping that by inspecting the immich and immich-go codebase + hitting up the API of my local immich instance, I would be able to figure out what had gone wrong, and write a simple script to automate fixing it.

# Tools I used

- Cline, mostly with the claude 4.0 sonnet model

# What went well

- The tool was able to quickly identify a likely bug in immich-go along with walk me through how immich handled stacking images in albums, with references to specific blocks of code in the codebase.
- I did eventually get a better understanding of the issue.

# What went badly

Pretty much everything else!

- The tool thought it knew what was going wrong, and generated likely looking explanations. In reality neither of us were even close to understanding what was happening.
- We wasted a lot of time going around in cicles writing a hacky python script to fix the issue. Unfortunately when you don't actually know the undying issue, or have a solid handle on how you would like it resolved, writing a script will get you nowhere!
- Eventually I realised that we didn't have a good enough understanding of what was actually going on, and focused on digging through API responses, to get a better understanding of the data model and how it was rendered in the immich UI. Unfortunately since the tool couldn't see the UI, it straight up wouldn't believe UI behaviour I was describing was occurring! Cline allows multimodal input, so I was able to paste in screenshots. It used a lot of tokens to convince the tool that was I was describing was actually happening!
- In the end, I burnt through loads of tokens and am only a small way towards a workable solution. Mainly, I now understand all the things I _don't know_ and need to find out to move forwards.

I would say the boost I got from using AI was -50%. If I was working without assistance, I probably would have realised I had no idea what what was happening a lot sooner!

# What I learnt

- The tools ability to generate code, can far outpace your understanding of the problem your trying to solve. Sometimes this is helpful as it allows you to see things in action and iterate - but sometimes it can lead you right up the garden path ...
- When trying to diagnose and fix a complex bug, good software engineering practises are essential : you need to be able to cleanly reproduce the issue, log network requests, and reason about how you would like to resolve the issue.
- Don't offload to much "intelligence" to the tools. It will happily write code for you - but it will never tell you if its the right thing to be building!

*Originally posted on [Mastodon](https://aus.social/@lukesleeman/115167415292709300)*

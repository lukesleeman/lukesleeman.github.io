---
layout: post
title: "For Day 5 of my AI challenge I explored running LLMs locally"
date: 2025-09-09 23:53:30 +1000
categories: ["mastodon","microblog"]
mastodon_url: "https://aus.social/@lukesleeman/115177030337135519"
excerpt: "<p>For Day 5 of my AI challenge I explored running LLMs locally.  I&#39;ve been using LM Studio ( <a href=\"https://lmstudio.ai/\" target=\"_blank\" rel=\"..."
---

For Day 5 of my AI challenge I explored running LLMs locally. I've been using LM Studio ( [https://lmstudio.ai/](https://lmstudio.ai/) ) with a number of models. I tried running cline against the qwen3-coder-30b model, however the performance was slow, the results mediocre and the context window too small.

I shifted to doing some more "traditional" AI assistant/chat work, using googles gemma-3-27b model to help me take some interview transcripts and turn them into one page case studies.

It went very well - its a little bit slow, but workable. gemma-3 is a multimodal model, so I was able to include images and attach files, which came in very helpful.

# Tools I used

- LM Studio, with the gemma-3-27b model.

# What went well

- Things were surprisingly performant on my 2021 Macbook Pro. I think it helped having 32gb ram. I was able to run some surprisingly large models.
- Chat worked really well - its almost a drop in replacement for web based tools, except its running locally!
- Was able to get useful help writing copy, re-wording things, etc
- Multimodal input is very helpful - its useful being able to drop in files, images, etc and then have the assistant work with them.
- It feels good being able to run things locally, and know that you have full control over the process, privacy, no sever costs, etc!

# What went badly

- My laptop isn't powerful enough to run models useful for agentic coding
- I found myself running out of context space quickly - however this is a parameter you can tweak when loading the model.
- The gemma-3 model is the open source base for googles gemini assistant. Gemini Pro can do things like search for results from the web, and integrate them into an answer. Unfortunately this isn't something that I could do with gemma-3 running locally in LM studio. It would be nice to have a complete local replacement for Gemini.

# What I learnt

- Running things locally is surprisingly doable, and produces good results!
- You need lots for RAM! But if you have a decently specced macbook you may be surprised by whats possible

![LM Studio runing the gemma 3 model locally](/assets/images/mastodon/2025-09-09-for-day-5-of-my-ai-challenge-i-explored-running-ll-1.png)



*Originally posted on [Mastodon](https://aus.social/@lukesleeman/115177030337135519)*

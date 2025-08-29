# Luke Sleeman Portfolio Website - Final Minimal Architecture

## Site Structure (3 Pages + Blog Integration)

### 1. Home (`/`)
**Layout**: `page` with recent blog post integration
**Purpose**: Main landing page showcasing everything important
**Content**:
- Professional summary (current intro + highlights from resume)
- **Recent Post Section**: Latest blog post title, excerpt, and "Read more" link
- Key achievements and current role
- Social links and contact

### 2. About (`/about/`)
**Layout**: `page`
**Purpose**: Personal story and professional journey
**Content**:
- Extended bio and career narrative
- Personal interests (sailing, hiking, cooking, parenting, zodiac cakes, tea)
- Professional philosophy on team building and leadership
- Community involvement (GDG Melbourne leadership)

### 3. Work (`/work/`)
**Layout**: `page`
**Purpose**: Professional showcase with integrated resume highlights
**Content**:
- **Resume Highlights**: Key achievements from ANZ Plus, leadership experience
- **Speaking**: Conference talks with YouTube links (from resume)
- **Key Projects**: ANZ Plus transformation, team scaling, architecture work
- **Download Full Resume**: Link to PDF version
- **Skills Summary**: Android, leadership, team building

### 4. Blog (`/posts/`)
**Layout**: `index` (Jekyll blog)
**Purpose**: Occasional updates and insights
**Integration**: Recent post automatically appears on homepage

## Enhanced Home Page Structure

```markdown
# Hey! 👋

I'm a Principal Android Engineer at Mantel Group, passionate about building diverse, inclusive, and high-performing teams. Over 7 years leading complex mobile projects, I've helped scale teams from 2 to 80+ developers.

## Recent Highlights
- Led ANZ Plus Android team through 4+ years of hypergrowth
- Scaled Australia's fastest-growing digital bank to $14B in deposits
- Migrated entire codebase to Jetpack Compose
- Spoke at DevFest Melbourne & Auckland on Zero Tech Debt

## Latest Post
[Recent blog post title and excerpt automatically pulled from _posts]

## Connect
[Current social links + professional contact]
```

## Work Page Integration with Resume

```markdown
# Professional Work

## Current Role
**Principal Android Engineer** at Mantel Group (2017-Present)
Leading client engagements and representing our brand internationally.

## Key Achievement: ANZ Plus
**Android Principal Engineer & Team Lead** (2019-2024)
- Grew Android team from 2 to 80+ developers
- Built foundational architecture for Australia's fastest-growing digital bank
- Led multi-year Jetpack Compose migration
- Designed team structures using Team Topologies

## Speaking & Community
### Recent Talks
- **Zero Tech Debt** - DevFest Melbourne/Auckland 2023 [YouTube Link]
- **Designing ANZ Plus** - GDG Melbourne 2022 [YouTube Link]
- **Continuous Delivery at ANZx** - GDG Melbourne, DDD Melbourne 2022 [YouTube Link]

### Community Leadership
Lead Organiser, GDG Melbourne (2016-2021)

## Skills
- Building high-performing, diverse teams
- Android development (11+ years)
- Software engineering (20+ years)
- Continuous delivery & platform teams

[Download Full Resume (PDF)]
```

## Technical Implementation

### Homepage Blog Integration
```html
<!-- In index.md front matter -->
---
layout: page
title: Home
---

<!-- Content with liquid template for recent post -->
{% assign latest_post = site.posts.first %}
{% if latest_post %}
## Latest Post
### [{{ latest_post.title }}]({{ latest_post.url }})
{{ latest_post.excerpt }}
[Read more →]({{ latest_post.url }})
{% endif %}
```

### File Structure
```
/
├── _config.yml
├── index.md (home with blog integration)
├── about.md
├── work.md
├── posts.html (blog index)
├── _posts/ (occasional posts)
└── assets/
    └── resume-luke-sleeman-2024.pdf
```

### Navigation (3 main items)
1. **Home** - Landing page with recent post
2. **About** - Personal story
3. **Work** - Professional showcase + resume highlights
4. **Posts** - Blog archive (accessible but not primary nav)

## Content Migration Strategy

### From Current Site
- Move current intro to Home page, expand with resume highlights
- Personal interests → About page
- Professional links → Work page

### From Resume
- ANZ Plus achievements → Work page highlights
- Conference talks → Work page speaking section
- Skills summary → Work page
- Full PDF → downloadable asset

### Blog Integration
- Recent post automatically shows on homepage
- No pressure for regular posting
- When you do post, it immediately appears on main page

## Maintenance
- **Quarterly**: Add new talks to Work page
- **As needed**: Blog posts appear automatically on homepage
- **Annually**: Update resume PDF, refresh key achievements

This gives you a professional, comprehensive site that's easy to maintain while showcasing your expertise and keeping visitors engaged with your latest content.

# Luke Sleeman's Personal Website

This is my personal website built with Jekyll and the Hydeout theme, hosted on GitHub Pages.

## Local Development Setup

To preview changes before they go live, you can run the site locally on your machine.

### Prerequisites

You need Ruby installed on your system. On macOS, you can install it via Homebrew:

```bash
# Install Ruby (if not already installed)
brew install ruby

# Add Ruby to your PATH (add this to your ~/.zshrc or ~/.bash_profile)
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
```

### Setup and Running

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Run the local server:**
   ```bash
   bundle exec jekyll serve
   ```

3. **View your site:**
   Open http://localhost:4000 in your browser

4. **Making changes:**
   - Edit any files while the server is running
   - The site will automatically rebuild and refresh
   - You can see your changes instantly in the browser

### Tech Stack

- Jekyll 3.9.x (compatible with GitHub Pages)
- Hydeout theme (`fongandrew/hydeout`)
- GitHub Pages for hosting
- Local development with `bundle exec jekyll serve`

## Contributing

This project follows a clean git workflow with feature branches. All changes should be made in branches before merging to main.

### Branch Naming Conventions

- `feature/description` - For new features or content
- `fix/description` - For bug fixes
- `docs/description` - For documentation updates
- `style/description` - For styling changes

### Workflow Steps

1. **Create a feature branch** for each change:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them:
   ```bash
   # Edit files as needed
   git add .
   git commit -m "Descriptive commit message"
   ```

3. **Switch to main and merge** when ready:
   ```bash
   git checkout main
   git merge feature/your-feature-name
   ```

4. **Clean up the feature branch** after merging:
   ```bash
   git branch -d feature/your-feature-name
   ```

### Guidelines

- Keep branches focused on a single feature or fix
- Use descriptive commit messages
- Test changes locally before pushing
- Don't commit directly to main - always use branches
- Always delete feature branches after merging to keep the repository clean

### Troubleshooting

If you encounter issues:

1. **Bundle install fails**: Make sure you have Ruby and bundler installed
2. **Jekyll serve fails**: Try `bundle update` then `bundle exec jekyll serve`
3. **Changes not showing**: Hard refresh your browser (Cmd+Shift+R on Mac)

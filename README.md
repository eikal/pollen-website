# Pollen – Data Governance for Business-Owned Control

A modern, vendor-neutral data governance platform with AI-powered catalog, API gateway, data contracts, and monetization.

## Quick Deploy

### Deploy to Netlify (Recommended)

1. **Push to GitHub** (or create a new repo):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Pollen marketing site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/pollen-website.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Netlify will auto-detect `netlify.toml` and deploy
   - Your site will be live at `https://[project-name].netlify.app`

3. **Custom Domain** (optional):
   - In Netlify dashboard, go to **Domain settings**
   - Add your custom domain (e.g., `pollen.io`)
   - Update DNS records as instructed

## Features

- **Hero Section**: Immediate value proposition and core stats
- **Core Values**: Business ownership + zero vendor lock-in
- **4 Pillars**: Smart Data Catalog, API Gateway, Data Contracts, Data Monetization
- **Architecture**: Vendor-neutral stack visualization
- **CTA**: Lead capture form
- **Responsive**: Mobile-first design, works on all devices

## Customization

### Update CTA Form
Edit the form submission handler in `script.js` to integrate with your CRM or email service:

```javascript
// Connect to Zapier, Segment, HubSpot, etc.
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Call your API or webhook here
  await fetch('YOUR_WEBHOOK_URL', {
    method: 'POST',
    body: JSON.stringify({ /* form data */ }),
  });
});
```

### Colors & Branding
Update CSS variables in `styles.css`:
- `--accent`: Primary color (gold/yellow)
- `--accent-2`: Secondary color (teal/green)
- `--bg`: Dark background

### Content
All content is in `index.html`. Edit directly to update copy, stats, or sections.

## Files

- `index.html` – Main page structure
- `styles.css` – Design system and responsive layout
- `script.js` – Mobile nav + form interaction
- `netlify.toml` – Netlify build & deployment config

## Performance

- No build step needed (pure HTML/CSS/JS)
- Optimized images with lazy loading ready
- Security headers configured
- Cache busting for assets

## License

Built for Pollen Data Governance.

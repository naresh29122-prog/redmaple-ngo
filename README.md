
# RedMaple AI Website

A mobile-first static site you can deploy on GitHub Pages.

## Local preview
Open `index.html` in your browser or use `python -m http.server`.

## Deploy to GitHub Pages
1. Create a new repo and push this folder.
2. Enable **Pages** → **Deploy from GitHub Actions**.
3. The included workflow builds & deploys automatically on `main`.

## Customize
- Edit text in the HTML files and `data/site.json`.
- Replace images in `assets/img/` (add `hero.webp`, `partners.webp`, `og-image.png`).
- Update colors in `assets/css/styles.css`.
- Update phone, email, and address in `data/site.json` and page templates.

## Forms
The contact form uses Netlify forms mark-up. For GitHub Pages, replace it with Formspree or Email (mailto).

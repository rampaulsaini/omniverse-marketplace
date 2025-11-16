# Omniverse Marketplace

Zero-cost AI Tools Marketplace — client-side only, runs on GitHub Pages.

## Features
- Multiple AI tools (resume, bio, scripts, notes, ideas)
- Tools run offline/template-based by default (no paid APIs)
- Premium unlock via local key (owner sets locally)
- Payments/donations via saved payment link (owner provides)
- Downloads and usage tracked locally (localStorage)

## How to deploy
1. Create a repo named `omniverse-marketplace` (or any name).
2. Copy these files into the repo root and commit.
3. Enable GitHub Pages: Settings → Pages → Branch: `main` → Folder: `(root)`.
4. Visit `https://<your-username>.github.io/<repo-name>/`.

## Notes
- This is intentionally zero-cost: no server, no external paid API calls by default.
- If you add an OpenAI API key in Owner Settings (locally), OpenAI calls may be made and will incur costs on that account.
- 

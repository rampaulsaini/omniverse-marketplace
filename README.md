# Omniverse AI Tools Marketplace

Zero-cost AI Tools Marketplace — fully client-side, GitHub Pages ready.

## What this repo contains
- index.html — main marketplace UI
- style.css — styling
- assets/logo.svg — brand logo (also used as favicon)
- scripts/* — core JS (tools, ai-core, marketplace logic, UI)
- .github/workflows/pages.yml — GitHub Pages deploy action

## How it works
- Tools use local template-based generation (no paid API required).
- Owner can set a local "Premium Unlock Key" and a donation/payment link (stored in browser localStorage).
- Users can generate outputs, download results, and optionally donate via saved payment link.

## Deploy
1. Create repository `omniverse-marketplace` in your GitHub account.
2. Copy files into repo (preserve structure).
3. Push to `main`.
4. Go to Settings → Pages → Set branch `main` and folder `/ (root)` → Save.
5. Visit `https://<your-username>.github.io/omniverse-marketplace/`.

## Monetization ideas (zero-cost start)
- Add a visible Donate/Pay button (use PayPal / UPI / Ko-fi link).
- Offer premium outputs unlocked via a key or manual receipt (for now, manual local key).
- Sell premium templates via external marketplace / email delivery.

## Notes
- All settings are saved locally on the browser. There is no server component in this starter kit.
- If you want real LLM outputs (OpenAI), you can add an API key in settings and enable the optional OpenAI branch (costs may apply).
- 

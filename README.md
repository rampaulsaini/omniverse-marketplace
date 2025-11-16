# Omniverse AI Tools Marketplace

Zero-cost Omniverse AI Tools Marketplace — host on GitHub Pages, run entirely in the browser.

## What this repo contains
- `index.html` — main marketplace / dashboard UI
- `style.css` — styles
- `assets/logo.svg`, `assets/favicon.ico`
- `scripts/` — client-side JS: ai-core, tools list, marketplace UI
- `.github/workflows/pages.yml` — deploy workflow for GitHub Pages

## How to deploy (free)
1. Create a repository named e.g. `omniverse-marketplace` on GitHub.
2. Copy these files and folders into the repo root.
3. Commit and push to `main`.
4. In GitHub → Settings → Pages enable branch `main` and folder `/ (root)` to serve.
5. Visit `https://<your-username>.github.io/omniverse-marketplace/`.

## Monetization (zero-cost start)
- Set a donation/payment link in *Owner Settings* (localStorage) to receive tips.
- Use the local "owner key" to enable premium outputs for users you authorize.
- Offer paid services or premium templates via the donation link and handle payments externally (PayPal, UPI, Razorpay, Ko-fi, etc).

## Extending
- Replace the client-side `AICore.generate()` with real LLM calls (OpenAI/HuggingFace) by adding API key support in the UI (requires paid API or free trial).
- Add more tools in `scripts/tools.js` and templates in `scripts/ai-core.js`.
- Add server-side automation later (webhooks, payment verification, DB).

## Notes
- This repo is intentionally zero-cost: all logic runs in the browser and data/settings are stored in localStorage.
- For production use with many users, consider adding a backend for payment verification and secure premium key management.
- 

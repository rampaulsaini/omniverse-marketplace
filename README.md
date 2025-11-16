# Omniverse AI Marketplace (Zero-cost)

This repo contains a zero-cost AI tools marketplace designed to run on GitHub Pages.

## How to use
1. Put files into a repository (branch `main`).
2. Push and enable GitHub Pages (Settings → Pages) with branch `main` and folder `/ (root)`.
3. Open `https://<your-username>.github.io/omniverse-marketplace/`.

## Owner setup (zero-cost monetization)
- Click "Donate / Pay" → add your PayPal / Ko-fi / UPI details (stored in browser localStorage).
- When a buyer pays externally, provide them a one-time unlock key (set in Owner → Set Premium Key).
- Buyer enters the unlock key locally (owner-provided) — once premium key exists in buyer's localStorage downloads work.

## Replace mock AI with real provider
- All tools are client-side mock generators in `scripts/tools.js`.
- Replace tool.run implementations with fetch calls to OpenAI / HuggingFace or your own serverless functions.
- For production API keys, use serverless endpoints (do NOT embed keys in client-side JS).

## Next steps (I can implement)
- Serverless payment verification (Stripe/PayPal) + automatic unlock key issuing
- Replace mock AI outputs with real OpenAI / HF inference (via serverless)
- Add email automation, order management, simple admin UI
- cd /path/to/omniverse-marketplace
git init
git add .
git commit -m "Add omniverse-marketplace starter"
git branch -M main
git remote add origin https://github.com/rampaulsaini/omniverse-marketplace.git
git push -u origin main
# omniverse-marketplace
Omniverse Marketplace – A zero-cost AI tools hub with generators, templates, automations, and a free deployment dashboard.
# omniverse-api

Serverless API for Omniverse Marketplace:
- `/api/generate` : OpenAI proxy (POST { prompt })
- `/api/create-checkout` : Create Stripe Checkout session
- `/api/webhook` : Stripe webhook to auto-issue keys (stores in a private gist)

Set environment variables before deploy:
OPENAI_API_KEY, STRIPE_SECRET, STRIPE_WEBHOOK_SECRET, GITHUB_TOKEN, PUBLIC_URL

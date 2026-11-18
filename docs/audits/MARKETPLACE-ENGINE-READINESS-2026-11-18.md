# Marketplace Engine Readiness Audit — 2026-11-18

## Scope and method

Read-only inspection of the default-branch workflow definitions, marketplace automation notes, order-intake contract, specialist-agent manifest/code, health-check helper, and payment API source files. No live checkout, webhook, customer submission, payment, deployment, or production dispatch was executed.

## What is actually connected

- `.github/workflows/shirmani-marketplace-automation.yml` listens for `repository_dispatch` type `shirmani-orchestrator`, supports `CONTINUOUS|PAUSED`, checks that `index.html` exists and contains the words Omniverse and Marketplace, and uploads a status artifact.
- That check is a repository/frontend smoke test only. The workflow does not build or publish products, contact customers, process orders, confirm payments, deliver files, or verify customer acceptance.
- `factory-agent.py` creates a deterministic SHA-256 inventory manifest of selected repository files. It does not call an AI model, produce a product, or independently validate research.
- `ORDER_INTAKE.md` correctly states that the frontend is static and that an HTTPS intake endpoint must be configured before claiming an order has been queued. It also says secrets must not be placed in browser code.
- `scripts/health-check.js` uses browser `fetch(..., mode: 'no-cors')`; opaque responses do not provide a reliable HTTP status or application-health assertion.

## Federation intake hardening gaps

The inspected `.github/workflows/omniverse-federation-intake.yml`:
- Accepts `omniverse_federation_job` and manual dispatch.
- Grants `contents: write` to the whole workflow.
- Does not validate that the dispatch sender and source repository are approved.
- Does not enforce a bounded brief length in the inspected version.
- Does not enforce a main-branch-only receipt publication guard.
- Uses a timestamp-only receipt filename, so two events in the same second may collide.
- Commits and pushes receipts directly from the intake job.

This intake is separate from the marketplace automation worker. Keep the two event contracts distinct until an adapter registry and tests explicitly map them.

## Payment/API findings — do not enable production

Static inspection found serious blockers in `api/create-checkout.js` and `api/webhook.js`:

- The checked-in source contains duplicated/concatenated fragments and malformed JavaScript, so it is not safe to assume either endpoint parses or runs.
- Checkout accepts a client-supplied price and item name without a trusted server-side product/price allowlist.
- The fallback public URL points to a Vercel domain. Vercel is not part of the approved hosting plan and must not be re-enabled implicitly.
- The webhook source contains multiple overlapping implementations. One fragment creates a new private gist per completed checkout, writes customer email/session/key data, and logs an issued key. The code shown does not demonstrate robust idempotency, fulfilment state reconciliation, or safe delivery.
- The repository's order-intake documentation says the production HTTPS intake endpoint is not connected until configured.

These payment paths must remain disabled/unadvertised until rebuilt and tested in an approved free-first environment with trusted server-side pricing, verified webhook signatures, idempotency, secure customer-data storage, reconciliation, and tested fulfilment. Do not create or rotate payment credentials as part of this audit.

## Recent test evidence

GitHub Actions showed two successful runs named `Federation Intake Contract Tests` (run IDs `44289991539` and `44289980940`). In each, the `receipt-contract` job and `Run federation receipt regression tests` step completed successfully. This is evidence for the tested receipt contract only; it does not prove the separate production checkout/webhook endpoints work.

## Recommended staged remediation

1. Keep the public marketplace in static/demo mode and show order submission as not connected unless a verified HTTPS intake endpoint exists.
2. Add sender/source allowlisting, bounded payload validation, unique job IDs, idempotent receipt writes, main-branch protection, and least-privilege write permissions to federation intake.
3. Make the marketplace worker emit truthful health states (for example, `FRONTEND_SMOKE_PASS`) rather than a generic `READY` that could be mistaken for production readiness.
4. Add tests for event payloads, duplicate deliveries, malformed/oversized briefs, untrusted senders, and receipt collisions.
5. Treat payment API repair as a separate project: inspect the intended hosting/runtime and data store first; do not patch or run payment code until its deployment target and test-mode credentials are confirmed.
6. Only after these gates pass should the marketplace be counted as a verified production engine.

## Changes in this audit branch

- Documentation only: this file.
- No payment, checkout, webhook, browser, production, deployment, workflow, secret, or customer data was changed or executed.

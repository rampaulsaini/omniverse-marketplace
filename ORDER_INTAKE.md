# Omniverse Marketplace — Order Intake

The marketplace is a static GitHub Pages frontend. It does not directly write to the central queue and must not contain GitHub tokens, payment secrets, or private credentials.

## Production flow

Customer → Marketplace → HTTPS Order Intake API → validation → central queue → Omniverse-Platform worker.

## Queue contract

The central platform accepts validated jobs matching `schemas/order-intake.schema.json`.

Required fields:
- `job_id`
- `kind`
- `status: queued`
- `created_at`
- `customer.name`
- `customer.contact`
- `request.title`
- `request.brief`

## Security

The browser must send orders only to a separately deployed HTTPS intake endpoint. The endpoint is responsible for authentication/rate limiting as appropriate, schema validation, abuse protection, and enqueueing. No GitHub token or platform secret belongs in browser JavaScript.

Until an intake endpoint is configured, the UI must clearly show that production submission is not connected rather than pretending an order was queued.

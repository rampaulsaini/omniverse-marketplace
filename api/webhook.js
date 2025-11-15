// api/webhook.js
const fetch = require('node-fetch');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const stripe = require('stripe')(process.env.STRIPE_SECRET);
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customer_email = session.customer_details?.email || 'no-email';
    // generate key
    const key = 'OMNI-' + crypto.randomBytes(6).toString('hex').toUpperCase();
    // store key -> create/update a gist (append)
    const gistBody = {
      description: `Omniverse keys store - ${new Date().toISOString()}`,
      public: false,
      files: {
        'keys.txt': { content: `Email: ${customer_email} | Key: ${key} | session:${session.id}\n` }
      }
    };
    const ghResp = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(gistBody)
    });
    // Optionally send key to buyer via email using a transactional email provider (SendGrid) - not included here.
    console.log('Issued key', key, 'for', customer_email);
  }
  res.json({ received: true });
};

// api/create-checkout.js
const Stripe = require('// api/create-checkout.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).send('Method not allowed');
    const { price, itemName } = req.body || {};
    if (!price || !itemName) return res.status(400).json({ error: 'price & itemName required' });
    const domain = process.env.PUBLIC_URL || 'https://your-vercel-domain.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: itemName },
          unit_amount: Math.round(Number(price) * 100)
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${domain}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel.html`
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};
');
const stripe = Stripe(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const { price, itemName } = req.body;
  const domain = process.env.PUBLIC_URL || 'https://your-vercel-domain.vercel.app';
  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: { currency: 'inr', product_data: { name: itemName }, unit_amount: Number(price)*100 },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${domain}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel.html`,
    });
    res.json({ url: session.url });
  }catch(e){
    res.status(500).json({ error: e.message });
  }
};
curl -X POST 'https://omniverse-api.vercel.app/api/generate' \
 -H "Content-Type: application/json" \
 -d '{"prompt":"Write a 2-line bio for Alice, software engineer","max_tokens":150}'
  

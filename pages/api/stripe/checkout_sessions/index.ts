import { NextApiRequest, NextApiResponse } from 'next'

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../../config'
import { formatAmountForStripe } from '../../../../utils/stripe/stripe-helpers'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const customer_id: string = "cus_IRxuGQBQJ5ISjY"
    const price_id: string = "price_1GtDqWAIoFjQl5HEI6hQ0w7z"
    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        customer: customer_id,
        payment_method_types: ["card"],
        mode: "subscription",
        metadata: {priceId: price_id},
        line_items: [
          {
            price: price_id,
            quantity: 1
          },
        
        ],
        success_url: `${req.headers.origin}/stripe/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/stripe/donate-with-checkout`,
      }

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      )

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

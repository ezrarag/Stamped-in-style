import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    // Placeholder: you can pass more dynamic data from the form later
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Custom Trip Deposit',
              description: 'Deposit for your custom trip',
            },
            unit_amount: 50000, // $500.00
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/dashboard/client?success=true`,
      cancel_url: `${req.nextUrl.origin}/build?canceled=true`,
    })
    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
} 
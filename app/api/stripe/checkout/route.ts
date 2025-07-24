import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(req: NextRequest) {
  try {
    const { amount, tripData } = await req.json()
    
    // Use dynamic amount from form, fallback to 50000 (500 USD) if not provided
    const stripeAmount = amount ? Math.round(amount * 100) : 50000
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Custom Trip to ${tripData?.destination_name || 'Destination'}`,
              description: `Trip for ${tripData?.duration || '7'} days with ${tripData?.experiences?.length || 0} experiences`,
            },
            unit_amount: stripeAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/dashboard/client?success=true&trip_id=${tripData?.id}`,
      cancel_url: `${req.nextUrl.origin}/build?canceled=true`,
      metadata: {
        trip_id: tripData?.id,
        destination_id: tripData?.destination_id,
        customer_email: tripData?.email,
      },
    })
    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
} 
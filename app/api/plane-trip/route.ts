import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-side key, never expose to client
)

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const { city, budget, duration, experiences, email } = await req.json()

    if (!city || !budget || !duration || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Save user submission to Supabase
    const { data: saved, error: dbError } = await supabase
      .from('trip_plans')
      .insert([
        {
          email,
          city,
          budget,
          duration,
          experiences,
        },
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Fancy AI prompt
    const prompt = `You are a friendly travel planner.
Plan a fun ${duration}-day trip to ${city} on a ${budget} budget.
Traveler likes: ${experiences.length ? experiences.join(', ') : 'no specific preferences'}.

Format:
- Break it down by day (Day 1, Day 2, etc.)
- Add emojis for each activity (e.g., 🏞️, 🍝, 🎶)
- Keep it concise but vivid (2-3 activities per day, 3-4 sentences total).
- End with a short encouragement line.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or "gpt-4.1-mini" for cheaper
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 350,
    })

    const itinerary = completion.choices[0]?.message?.content?.trim() || 'Could not generate itinerary.'

    return NextResponse.json({ itinerary, saved })
  } catch (err) {
    console.error('Plan-trip API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
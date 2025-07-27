import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const tripData = await req.json()
    
    const { data, error } = await supabase
      .from('trip_submissions')
      .insert([{
        destination_id: tripData.destination_id,
        budget: tripData.budget,
        duration: tripData.duration,
        experiences: tripData.experiences,
        name: tripData.name,
        email: tripData.email,
        notes: tripData.notes,
        total_price: tripData.total_price,
        status: tripData.status
      }])
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, trip: data[0] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('trip_submissions')
      .select(`
        *,
        destinations (
          name,
          image_url,
          price_range
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ trips: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
} 
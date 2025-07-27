import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()
    
    // Create client record first
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .insert([{
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        contact_preference: formData.contactPreference,
        created_at: new Date().toISOString()
      }])
      .select()
    
    if (clientError) {
      return NextResponse.json({ error: clientError.message }, { status: 500 })
    }

    const clientId = clientData[0].id
    
    // Create trip submission record
    const { data, error } = await supabase
      .from('trip_submissions')
      .insert([{
        client_id: clientId,
        destination: formData.destination,
        travel_date: formData.travelDate,
        nights_count: formData.nightsCount,
        passenger_count: formData.passengerCount,
        passenger_ages: formData.passengerAges,
        valid_passports: formData.validPassports,
        room_count: formData.roomCount,
        budget_per_person: formData.budgetPerPerson,
        specific_hotel: formData.specificHotel,
        all_inclusive: formData.allInclusive,
        include_flights: formData.includeFlights,
        flight_details: formData.flightDetails,
        activities: formData.activities,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      id: data[0].id,
      clientId: clientId,
      trip: data[0] 
    })
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
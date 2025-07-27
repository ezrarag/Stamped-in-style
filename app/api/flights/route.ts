import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const origin = searchParams.get('origin') || 'JFK'
  const destination = searchParams.get('destination') || 'LHR'
  const date = searchParams.get('date') || '2025-08-01'

  try {
    const response = await fetch(`https://<AIRSCRAPER-ENDPOINT>?origin=${origin}&destination=${destination}&date=${date}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
        'X-RapidAPI-Host': '<AIRSCRAPER-HOST>', // from RapidAPI docs
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
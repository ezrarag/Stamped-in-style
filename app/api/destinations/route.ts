import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || 'new york' // default city

  try {
    const response = await fetch(
      `https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${encodeURIComponent(query)}&search_type=CITY`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
          'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`RapidAPI error: ${response.statusText}`)
    }

    const data = await response.json()

    const destinations = (data || []).map((item: any) => ({
      id: item.id || item.cityID || Math.random().toString(),
      name: item.cityName || item.name || 'Unknown',
      image_url: '/placeholder.jpg', // You can swap in real images later
      is_featured: false,
    }))

    return NextResponse.json({ destinations })
  } catch (err: any) {
    console.error('Destination API error:', err.message)

    return NextResponse.json({
      destinations: [
        { id: 'paris', name: 'Paris', image_url: '/about-hero.jpg', is_featured: true },
        { id: 'tokyo', name: 'Tokyo', image_url: '/hero-desert.jpg', is_featured: false },
        { id: 'bali', name: 'Bali', image_url: '/placeholder.jpg', is_featured: true },
      ],
    })
  }
}
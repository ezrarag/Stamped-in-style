import { NextRequest, NextResponse } from 'next/server'
import { generateSmartRecommendations } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { destination, budget, experiences, previousTrips } = body

    // Validate required fields
    if (!destination || !budget || !experiences) {
      return NextResponse.json(
        { error: 'Missing required fields: destination, budget, experiences' },
        { status: 400 }
      )
    }

    // Validate experiences is an array
    if (!Array.isArray(experiences)) {
      return NextResponse.json(
        { error: 'Experiences must be an array' },
        { status: 400 }
      )
    }

    // Generate smart recommendations using AI
    const recommendations = await generateSmartRecommendations(
      destination,
      budget,
      experiences,
      previousTrips
    )

    return NextResponse.json({
      success: true,
      data: recommendations
    })

  } catch (error) {
    console.error('Recommendations API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate recommendations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 
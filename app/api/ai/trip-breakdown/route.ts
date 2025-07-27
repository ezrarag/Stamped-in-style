import { NextRequest, NextResponse } from 'next/server'
import { generateTripBreakdown } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { destination, duration, budget, experiences, notes } = body

    // Validate required fields
    if (!destination || !duration || !budget || !experiences) {
      return NextResponse.json(
        { error: 'Missing required fields: destination, duration, budget, experiences' },
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

    // Generate trip breakdown using AI
    const tripAnalysis = await generateTripBreakdown(
      destination,
      duration,
      budget,
      experiences,
      notes
    )

    return NextResponse.json({
      success: true,
      data: tripAnalysis
    })

  } catch (error) {
    console.error('Trip breakdown API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate trip breakdown',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface TripBreakdown {
  day: number
  title: string
  description: string
  activities: string[]
  accommodation?: string
  dining?: string
  transportation?: string
  estimatedCost: number
}

export interface AIRecommendation {
  type: 'activity' | 'restaurant' | 'hotel' | 'experience'
  name: string
  description: string
  whyRecommended: string
  estimatedCost: number
  location?: string
}

export interface TripAnalysis {
  breakdown: TripBreakdown[]
  recommendations: AIRecommendation[]
  totalEstimatedCost: number
  summary: string
  tips: string[]
}

// Generate daily trip breakdown
export async function generateTripBreakdown(
  destination: string,
  duration: string,
  budget: string,
  experiences: string[],
  notes?: string
): Promise<TripAnalysis> {
  try {
    const durationDays = getDurationDays(duration)
    const budgetRange = getBudgetRange(budget)
    
    const prompt = `Create a detailed ${durationDays}-day luxury travel itinerary for ${destination} with the following specifications:

Budget Range: ${budgetRange}
Duration: ${durationDays} days
Preferred Experiences: ${experiences.join(', ')}
Special Notes: ${notes || 'None'}

Please provide:
1. A day-by-day breakdown with:
   - Day number and title
   - Detailed description of the day
   - 3-4 specific activities
   - Recommended accommodation (if overnight)
   - Dining recommendations
   - Transportation details
   - Estimated daily cost

2. 5-8 personalized recommendations for:
   - Unique activities
   - Fine dining restaurants
   - Luxury hotels
   - Special experiences

3. A summary paragraph about the trip
4. 3-5 insider tips for the destination

Format the response as JSON with this structure:
{
  "breakdown": [
    {
      "day": 1,
      "title": "Day Title",
      "description": "Detailed day description",
      "activities": ["Activity 1", "Activity 2", "Activity 3"],
      "accommodation": "Hotel name and brief description",
      "dining": "Restaurant recommendations",
      "transportation": "Transportation details",
      "estimatedCost": 500
    }
  ],
  "recommendations": [
    {
      "type": "activity|restaurant|hotel|experience",
      "name": "Name",
      "description": "Description",
      "whyRecommended": "Why this is perfect for this traveler",
      "estimatedCost": 200,
      "location": "Location if applicable"
    }
  ],
  "totalEstimatedCost": 5000,
  "summary": "Overall trip summary",
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}

Make it luxurious, personalized, and include insider knowledge that only a luxury travel expert would know.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert luxury travel planner with deep knowledge of destinations worldwide. You create personalized, high-end travel experiences that exceed expectations. Always provide specific, actionable recommendations with realistic pricing."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Parse JSON response
    const tripAnalysis = JSON.parse(response) as TripAnalysis
    
    // Validate and enhance the response
    return validateAndEnhanceTripAnalysis(tripAnalysis, destination, budgetRange)
  } catch (error) {
    console.error('Error generating trip breakdown:', error)
    throw new Error('Failed to generate trip breakdown')
  }
}

// Generate smart recommendations based on user preferences
export async function generateSmartRecommendations(
  destination: string,
  budget: string,
  experiences: string[],
  previousTrips?: string[]
): Promise<AIRecommendation[]> {
  try {
    const budgetRange = getBudgetRange(budget)
    
    const prompt = `Based on the following traveler profile, suggest 6-8 unique luxury recommendations for ${destination}:

Budget Range: ${budgetRange}
Preferred Experiences: ${experiences.join(', ')}
Previous Destinations: ${previousTrips?.join(', ') || 'None'}

Provide recommendations that are:
- Within the budget range
- Aligned with their experience preferences
- Unique and not commonly found in guidebooks
- Suitable for luxury travelers
- Specific to ${destination}

Format as JSON array:
[
  {
    "type": "activity|restaurant|hotel|experience",
    "name": "Name",
    "description": "Detailed description",
    "whyRecommended": "Why this matches their preferences",
    "estimatedCost": 200,
    "location": "Specific location"
  }
]`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a luxury travel expert who knows the hidden gems and exclusive experiences at destinations worldwide. Provide recommendations that go beyond typical tourist attractions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(response) as AIRecommendation[]
  } catch (error) {
    console.error('Error generating recommendations:', error)
    throw new Error('Failed to generate recommendations')
  }
}

// Helper functions
function getDurationDays(duration: string): number {
  const durationMap: Record<string, number> = {
    'weekend': 3,
    'week': 7,
    'two-weeks': 14,
    'month': 30
  }
  return durationMap[duration] || 7
}

function getBudgetRange(budget: string): string {
  const budgetMap: Record<string, string> = {
    'budget': '$1,000 - $3,000',
    'mid-range': '$3,000 - $7,000',
    'luxury': '$7,000 - $15,000',
    'ultra-luxury': '$15,000+'
  }
  return budgetMap[budget] || '$5,000 - $10,000'
}

function validateAndEnhanceTripAnalysis(
  analysis: TripAnalysis, 
  destination: string, 
  budgetRange: string
): TripAnalysis {
  // Ensure all required fields are present
  if (!analysis.breakdown || !Array.isArray(analysis.breakdown)) {
    analysis.breakdown = []
  }
  
  if (!analysis.recommendations || !Array.isArray(analysis.recommendations)) {
    analysis.recommendations = []
  }
  
  if (!analysis.tips || !Array.isArray(analysis.tips)) {
    analysis.tips = []
  }
  
  // Ensure total cost is calculated
  if (!analysis.totalEstimatedCost) {
    analysis.totalEstimatedCost = analysis.breakdown.reduce(
      (total, day) => total + (day.estimatedCost || 0), 
      0
    )
  }
  
  // Add default summary if missing
  if (!analysis.summary) {
    analysis.summary = `Experience the best of ${destination} with this carefully curated luxury itinerary designed for discerning travelers.`
  }
  
  return analysis
} 
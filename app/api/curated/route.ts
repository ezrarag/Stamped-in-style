import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { preferences, adminStyle, marketplaceData, trends } = await req.json();

  const systemPrompt = `
You are a luxury travel curator for Stamped in Style. 
Generate 5 unique, stylish, and on-brand trip suggestions based on:
- User preferences (budget, vibe, destinations): ${JSON.stringify(preferences)}
- Admin curation style (tone, preferred destinations, aesthetic): ${adminStyle}
- Current marketplace listings: ${JSON.stringify(marketplaceData)}
- Contemporary travel trends: ${JSON.stringify(trends)}

Each suggestion must:
- Feel curated and exclusive (luxury or boutique tone).
- Have a catchy name, a short enticing description, and 3 quick highlights.
- Include a price estimate or deal (if available).

Return the response as valid JSON:
[
  {
    "title": "Trip Name",
    "description": "Short curated description",
    "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
    "price": "$X,XXX",
    "image": "optional-image-url"
  },
  ...
]
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt }
    ],
    temperature: 0.8,
    max_tokens: 1200,
  });

  // Try to parse the first code block as JSON, fallback to []
  let text = completion.choices[0]?.message?.content || "[]";
  let json = [];
  try {
    // Extract JSON from markdown code block if present
    const match = text.match(/```json([\s\S]*?)```/);
    if (match) {
      text = match[1];
    }
    json = JSON.parse(text);
  } catch (e) {
    json = [];
  }

  return NextResponse.json(json);
} 
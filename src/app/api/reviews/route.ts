import { NextResponse } from 'next/server';
import { REAL_REVIEWS } from '@/data/testimonials';

// In a production environment with a Google Places API Key, 
// you would fetch from:
// https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&fields=reviews&key=YOUR_API_KEY

export async function GET() {
  // Simulate network latency for the "Sync" feel
  await new Promise(resolve => setTimeout(resolve, 1500));

  return NextResponse.json({
    reviews: REAL_REVIEWS,
    total_reviews: 26,
    rating: 5.0,
    status: "OK"
  });
}

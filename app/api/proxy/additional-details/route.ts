import { NextResponse } from 'next/server';

// Camunda API endpoint
const API_URL = 'http://localhost:8085/inbound/additional_details';

// Basic auth credentials for Camunda API
const USERNAME = 'demo';
const PASSWORD = 'demo';

// Handler for POST requests
export async function POST(request: Request) {
  try {
    // Get request body
    const body = await request.json();

    // Forward the request to Camunda API with basic auth
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')}`,
      },
      body: JSON.stringify(body),
    });

    // Get response data
    const data = await response.json();

    // Return the response from the Camunda API
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in additional-details proxy:', error);
    return NextResponse.json(
      { error: 'Failed to submit additional details' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

// Camunda API credentials and endpoints
const CAMUNDA_API = {
  baseUrl: 'http://localhost:8085',
  inboundEndpoint: '/inbound/fcsrt1265',
  auth: {
    username: 'demo',
    password: 'demo'
  }
};

// Proxy handler for Camunda API
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authString = `${CAMUNDA_API.auth.username}:${CAMUNDA_API.auth.password}`;
    const url = `${CAMUNDA_API.baseUrl}${CAMUNDA_API.inboundEndpoint}`;
    
    console.log('Proxying request to Camunda API:', url);
    
    // Forward the request to Camunda API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(authString)}`
      },
      body: JSON.stringify(body)
    });
    
    // Get response data
    const data = await response.json().catch(() => null);
    
    // Log response status
    console.log('Camunda API response status:', response.status);
    
    // Return response with appropriate status
    return NextResponse.json(data || {}, {
      status: response.status,
      statusText: response.statusText
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to Camunda API' },
      { status: 500 }
    );
  }
}

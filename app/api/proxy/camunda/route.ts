import { NextRequest, NextResponse } from 'next/server';

const CAMUNDA_API = {
  baseUrl: 'http://localhost:8085',
  inboundEndpoint: '/inbound/fcsrt1265',
  auth: {
    username: 'demo',
    password: 'demo'
  }
};

export async function POST(request: NextRequest) {
  console.log('🚀 Webhook proxy called');
  
  try {
    const body = await request.json();
    const authString = `${CAMUNDA_API.auth.username}:${CAMUNDA_API.auth.password}`;
    const url = `${CAMUNDA_API.baseUrl}${CAMUNDA_API.inboundEndpoint}`;
    
    console.log('📤 Proxying request to:', url);
    console.log('📤 Auth string:', authString);
    console.log('📤 Request headers from client:', Object.fromEntries(request.headers.entries()));
    console.log('📤 Original request body:', JSON.stringify(body, null, 2));

    // Ensure the payload has the correct structure with "variables" wrapper
    let camundaPayload;
    if (body.variables) {
      camundaPayload = body;
    } else {
      camundaPayload = { variables: body };
    }
    
    console.log('📤 Camunda payload:', JSON.stringify(camundaPayload, null, 2));

    // Create exact headers as curl command
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(authString)}`,
      'User-Agent': 'Node.js'  // Add explicit User-Agent
    };
    
    console.log('📤 Request headers to Camunda:', headers);

    // Forward the request to Camunda API with Basic Auth
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(camundaPayload)
    });

    console.log('📥 Camunda response status:', response.status);
    console.log('📥 Camunda response statusText:', response.statusText);
    console.log('📥 Camunda response headers:', Object.fromEntries(response.headers.entries()));

    // Try to get response body regardless of content type
    let data;
    let responseText = '';
    
    try {
      responseText = await response.text();
      console.log('📥 Camunda raw response text:', responseText);
      
      if (responseText) {
        try {
          data = JSON.parse(responseText);
          console.log('📥 Camunda parsed JSON:', JSON.stringify(data, null, 2));
        } catch (e) {
          console.log('⚠️ Response is not JSON, treating as text');
          data = { message: responseText, status: response.status };
        }
      } else {
        console.log('⚠️ Empty response body from Camunda');
        data = { 
          message: 'Empty response from Camunda', 
          status: response.status,
          statusText: response.statusText 
        };
      }
    } catch (e) {
      console.error('❌ Error reading response:', e);
      data = { 
        error: 'Failed to read Camunda response',
        status: response.status,
        statusText: response.statusText 
      };
    }

    // Return response with CORS headers
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('❌ Proxy error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to proxy request to Camunda API',
        details: error instanceof Error ? error.message : 'Unknown error',
        camundaUrl: `${CAMUNDA_API.baseUrl}${CAMUNDA_API.inboundEndpoint}`
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

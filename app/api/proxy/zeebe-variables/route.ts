import { NextRequest, NextResponse } from 'next/server';

const ZEEBE_API = {
  baseUrl: 'http://localhost:8080',
  variablesEndpoint: '/v1/variables/search'
};

export async function POST(request: NextRequest) {
  console.log('🚀 Zeebe Variables proxy called');
  
  try {
    const body = await request.json();
    const url = `${ZEEBE_API.baseUrl}${ZEEBE_API.variablesEndpoint}`;
    
    console.log('📤 Proxying variables request to:', url);
    console.log('📤 Request headers from client:', Object.fromEntries(request.headers.entries()));
    console.log('📤 Original request body:', JSON.stringify(body, null, 2));

    // Create headers
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Node.js'
    };
    
    console.log('📤 Request headers to Zeebe:', headers);

    // Forward the request to Zeebe API
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    console.log('📥 Zeebe response status:', response);
    console.log('📥 Zeebe response statusText:', response.statusText);
    console.log('📥 Zeebe response headers:', Object.fromEntries(response.headers.entries()));

    // Try to get response body regardless of content type
    let data;
    let responseText = '';
    
    try {
      responseText = await response.text();
      console.log('📥 Zeebe raw response text:', responseText);
      
      if (responseText) {
        try {
          data = JSON.parse(responseText);
          console.log('📥 Zeebe parsed JSON:', JSON.stringify(data, null, 2));
        } catch (e) {
          console.log('⚠️ Response is not JSON, treating as text');
          data = { message: responseText, status: response.status };
        }
      } else {
        console.log('⚠️ Empty response body from Zeebe');
        data = { 
          message: 'Empty response from Zeebe', 
          status: response.status,
          statusText: response.statusText 
        };
      }
    } catch (e) {
      console.error('❌ Error reading response:', e);
      data = { 
        error: 'Failed to read Zeebe response',
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
        error: 'Failed to proxy variables request to Zeebe API',
        details: error instanceof Error ? error.message : 'Unknown error',
        zeebeUrl: `${ZEEBE_API.baseUrl}${ZEEBE_API.variablesEndpoint}`
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

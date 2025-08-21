// Route handler for Camunda edit_resubmit API
import { NextRequest, NextResponse } from 'next/server';

// Base URL for Camunda API
const CAMUNDA_API_URL = 'http://localhost:8085';
const EDIT_RESUBMIT_ENDPOINT = '/inbound/edit_resubmit';

// Credentials for Basic Auth
const USERNAME = 'demo';
const PASSWORD = 'demo';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Log incoming request
    console.log('Edit resubmit proxy received request:', body);
    
    // Create Authorization header for Basic Auth
    const authString = `${USERNAME}:${PASSWORD}`;
    const authHeader = `Basic ${Buffer.from(authString).toString('base64')}`;
    
    // Forward the request to Camunda
    const camundaResponse = await fetch(`${CAMUNDA_API_URL}${EDIT_RESUBMIT_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(body)
    });
    
    // Check if the request was successful
    if (!camundaResponse.ok) {
      const errorText = await camundaResponse.text();
      console.error('Error from Camunda edit_resubmit API:', errorText);
      return NextResponse.json(
        { error: 'Failed to process edit_resubmit request', details: errorText },
        { status: camundaResponse.status }
      );
    }
    
    // Check the Content-Type of the response
    const contentType = camundaResponse.headers.get('content-type');
    
    // Handle different response types appropriately
    if (contentType && contentType.includes('application/json')) {
      try {
        const data = await camundaResponse.json();
        console.log('Edit resubmit successful response:', data);
        return NextResponse.json(data);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        const rawText = await camundaResponse.text();
        console.log('Raw response text:', rawText);
        // Return success with the raw text
        return NextResponse.json({ success: true, message: 'Request successful', rawResponse: rawText });
      }
    } else {
      // Handle non-JSON responses
      const rawText = await camundaResponse.text();
      console.log('Non-JSON response:', rawText);
      // Still return a success response since the request succeeded
      return NextResponse.json({ success: true, message: 'Request successful', rawResponse: rawText });
    }
  } catch (error) {
    console.error('Error in edit_resubmit proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error in edit_resubmit proxy' },
      { status: 500 }
    );
  }
}

// app/api/proxy/zeebe-variables/route.ts
import { NextRequest, NextResponse } from 'next/server';

const ZEEBE_API = {
  baseUrl: 'http://localhost:8080',
  variablesEndpoint: '/v1/variables/search',
};

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body safely
    let body = {};
    try {
      body = await request.json();
    } catch {
      console.warn('No JSON body sent, using empty filter.');
    }

    const url = `${ZEEBE_API.baseUrl}${ZEEBE_API.variablesEndpoint}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    // Transform Zeebe variables into an easy object: { name: value }
    const formatted: Record<string, any> = {};
    if (data.items) {
      data.items.forEach((item: any) => {
        try {
          formatted[item.name] = JSON.parse(item.value);
        } catch {
          formatted[item.name] = item.value;
        }
      });
    }

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ error: 'Failed to fetch Zeebe variables' }, { status: 500 });
  }
}

// Optional GET handler (safe fallback)
export async function GET() {
  return NextResponse.json({ message: 'Send a POST request with filter JSON.' });
}



import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json() as { pin: string };
    
    // In production, use env variable for PIN
    if (pin === '1234') {
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'admin_auth',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });
      return response;
    }
    
    return NextResponse.json({ success: false, error: 'Invalid PIN' }, { status: 401 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

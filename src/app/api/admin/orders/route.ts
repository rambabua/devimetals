export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = getRequestContext().env.DB as any;
    const { results } = await db.prepare('SELECT * FROM Orders ORDER BY created_at DESC').all();
    return NextResponse.json({ success: true, orders: results });
  } catch (e: any) {
    console.error("Admin fetch orders error:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

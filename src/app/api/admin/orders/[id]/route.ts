export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json() as { status: string };
    const db = getRequestContext().env.DB as any;
    
    await db.prepare('UPDATE Orders SET status = ? WHERE id = ?')
            .bind(status, params.id)
            .run();
            
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Admin update order error:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

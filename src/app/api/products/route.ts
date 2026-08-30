export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
  try {
    const db = getRequestContext().env.DB as any;
    const { results } = await db.prepare('SELECT * FROM Products').all();
    return Response.json(results);
  } catch (e: any) {
    console.error("Failed to fetch products:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

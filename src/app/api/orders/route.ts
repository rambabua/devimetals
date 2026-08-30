export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function POST(request: Request) {
  try {
    const body = await request.json() as any;
    const db = (getRequestContext().env as any).DB;
    
    const orderId = 'ord_' + Date.now();
    
    await db.prepare(`
      INSERT INTO Orders (id, customer_name, customer_phone, customer_email, shipping_address, city, state, pincode, total_amount, transaction_ref)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      orderId,
      body.firstName + ' ' + body.lastName,
      body.phone,
      body.email || '',
      body.address,
      body.city,
      body.state,
      body.pincode,
      body.total,
      body.transactionRef
    ).run();

    if (body.items && body.items.length > 0) {
      for (const item of body.items) {
        await db.prepare(`
          INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase)
          VALUES (?, ?, ?, ?)
        `).bind(
          orderId,
          item.id,
          item.quantity,
          item.price
        ).run();
      }
    }

    return Response.json({ success: true, orderId });
  } catch (e: any) {
    console.error("Failed to place order:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

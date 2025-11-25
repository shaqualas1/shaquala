import { nanoid } from 'nanoid';
import { db } from '../db.js';

const insertOrderStmt = db.prepare(`
  INSERT INTO orders (
    id, customer_name, email, phone, pair_type, size, color, quantity,
    contact_preference, notes, urgency, budget, catalog_snapshot, status,
    created_at, updated_at, raw_payload
  ) VALUES (
    @id, @customer_name, @email, @phone, @pair_type, @size, @color, @quantity,
    @contact_preference, @notes, @urgency, @budget, @catalog_snapshot, @status,
    @created_at, @updated_at, @raw_payload
  )
`);

const listOrdersStmt = db.prepare(`
  SELECT * FROM orders
  ORDER BY datetime(created_at) DESC
  LIMIT @limit OFFSET @offset
`);

const getOrderStmt = db.prepare(`SELECT * FROM orders WHERE id = ?`);

export function createOrder(payload) {
  const timestamp = new Date().toISOString();
  const record = {
    id: nanoid(),
    customer_name: payload.customerName,
    email: payload.email,
    phone: payload.phone ?? null,
    pair_type: payload.pairType,
    size: payload.size,
    color: payload.color,
    quantity: payload.quantity,
    contact_preference: payload.contactPreference,
    notes: payload.notes ?? null,
    urgency: payload.urgency,
    budget: payload.budget ?? null,
    catalog_snapshot: payload.catalogSnapshot ? JSON.stringify(payload.catalogSnapshot) : null,
    status: 'new',
    created_at: timestamp,
    updated_at: timestamp,
    raw_payload: JSON.stringify(payload.rawPayload ?? {})
  };

  insertOrderStmt.run(record);
  return mapRowToOrder(record);
}

export function listOrders({ limit = 50, offset = 0 } = {}) {
  return listOrdersStmt.all({ limit, offset }).map(mapRowToOrder);
}

export function findOrderById(id) {
  const row = getOrderStmt.get(id);
  return row ? mapRowToOrder(row) : null;
}

function mapRowToOrder(row) {
  return {
    id: row.id,
    customerName: row.customer_name,
    email: row.email,
    phone: row.phone,
    pairType: row.pair_type,
    size: row.size,
    color: row.color,
    quantity: row.quantity,
    contactPreference: row.contact_preference,
    notes: row.notes,
    urgency: row.urgency,
    budget: row.budget,
    catalogSnapshot: row.catalog_snapshot ? JSON.parse(row.catalog_snapshot) : null,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    rawPayload: row.raw_payload ? JSON.parse(row.raw_payload) : null
  };
}

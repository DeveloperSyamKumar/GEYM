import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import {
  categories, products, shops, deliveryPartners, STATUS_FLOW, STATUS_LABELS,
} from './data/seed.js';

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

// In-memory "database" — swap for Postgres/Mongo in production.
// This single backend is what makes the 4 separate frontends interlinked:
// an order created by the customer-app is immediately visible to
// shop-app, delivery-app, and admin-panel because they all read/write here.
let orders = [];

const log = (...args) => console.log(new Date().toISOString(), ...args);

// ---------- Reference data ----------
app.get('/api/categories', (req, res) => res.json(categories));

app.get('/api/products', (req, res) => {
  const { category } = req.query;
  const list = category ? products.filter((p) => p.categoryId === category) : products;
  res.json(list);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.get('/api/shops', (req, res) => res.json(shops));
app.get('/api/delivery-partners', (req, res) => res.json(deliveryPartners));
app.get('/api/status-flow', (req, res) => res.json({ flow: STATUS_FLOW, labels: STATUS_LABELS }));

app.get('/api/customers', (req, res) => {
  const customerMap = new Map();
  for (const order of orders) {
    const existing = customerMap.get(order.phone) || {
      id: `customer-${order.phone}`, name: order.customerName, phone: order.phone, orders: 0,
    };
    existing.orders += 1;
    customerMap.set(order.phone, existing);
  }
  res.json([...customerMap.values()]);
});

// ---------- Orders (shared across all 4 apps) ----------
app.get('/api/orders', (req, res) => {
  const { shopId, deliveryPartnerId, status } = req.query;
  let list = orders;
  if (shopId) list = list.filter((o) => o.shopId === shopId);
  if (deliveryPartnerId) list = list.filter((o) => o.deliveryPartnerId === deliveryPartnerId);
  if (status) list = list.filter((o) => o.status === status);
  res.json(list.toSorted((a, b) => new Date(b.placedAt) - new Date(a.placedAt)));
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const { items, customerName, phone, address, paymentMethod } = req.body;
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'Order must include items' });

  const orderItems = items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    const qty = Number(item.qty);
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > 99) return null;
    return { productId: product.id, name: product.name, price: product.price, qty };
  });
  if (orderItems.some((item) => !item)) {
    return res.status(400).json({ error: 'Order contains an invalid product or quantity' });
  }

  const itemTotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = 40;
  const packagingFee = 20;

  const order = {
    id: `GEYM${nanoid(8).toUpperCase()}`,
    items: orderItems, itemTotal, deliveryFee, packagingFee,
    total: itemTotal + deliveryFee + packagingFee,
    customerName: customerName || 'Rohit Sharma',
    phone: phone || '+91 98765 43210',
    address: address || 'Sector 63, Noida, Uttar Pradesh - 201301',
    paymentMethod: paymentMethod || 'UPI',
    status: 'confirmed',
    shopId: shops[0].id,
    deliveryPartnerId: null,
    placedAt: new Date().toISOString(),
    statusHistory: [{ status: 'confirmed', at: new Date().toISOString() }],
  };
  orders.unshift(order);
  log('Order placed', order.id);
  res.status(201).json(order);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const { status } = req.body;
  if (!STATUS_FLOW.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const currentIndex = STATUS_FLOW.indexOf(order.status);
  if (STATUS_FLOW.indexOf(status) !== currentIndex + 1) {
    return res.status(409).json({ error: `Order can only move from ${order.status} to the next status` });
  }

  order.status = status;
  order.statusHistory.push({ status, at: new Date().toISOString() });
  // Auto-assign the delivery partner once a shop marks an order picked up
  if (status === 'pickedUp' && !order.deliveryPartnerId) {
    order.deliveryPartnerId = deliveryPartners[0].id;
  }
  log('Order status updated', order.id, status);
  res.json(order);
});

// ---------- Admin aggregates ----------
app.get('/api/stats', (req, res) => {
  res.json({
    totalCustomers: 1256,
    totalShops: shops.length,
    totalDeliveryPartners: deliveryPartners.length,
    totalOrders: orders.length,
    completedOrders: orders.filter((o) => o.status === 'delivered').length,
    pendingOrders: orders.filter((o) => o.status !== 'delivered').length,
    totalSales: orders.reduce((sum, o) => sum + o.total, 0),
  });
});

export default app;

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => log(`GEYM shared backend running on http://localhost:${PORT}`));
}

# GEYM Shared Backend

One Express API shared by all 4 frontends (`customer-app`, `shop-app`,
`delivery-app`, `admin-panel`). This is what makes them genuinely
interlinked: an order placed in the customer app is immediately visible
in the shop app's order list, the delivery app's delivery list, and the
admin panel's stats — because they're all reading/writing the same
in-memory store over HTTP.

Data resets on server restart (in-memory). Swap the arrays in `server.js`
for a real database (Postgres/Mongo + Prisma) when you're ready to go to
production — the route shapes won't need to change.

## Run it

```bash
npm install
npm run dev     # http://localhost:4000
```

## Endpoints
- `GET /api/categories`
- `GET /api/products?category=electrical`
- `GET /api/products/:id`
- `GET /api/shops`
- `GET /api/delivery-partners`
- `GET /api/status-flow`
- `GET /api/orders?shopId=&deliveryPartnerId=&status=`
- `GET /api/orders/:id`
- `POST /api/orders` — customer app calls this at checkout
- `PATCH /api/orders/:id/status` — shop/delivery apps call this to advance status
- `GET /api/stats` — admin dashboard KPIs

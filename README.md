# GEYM Web Suite — Customer, Shop, Delivery, Admin

Four separate React + Tailwind apps that share one backend, so they're
genuinely interlinked: place an order in the Customer app and it
instantly shows up in the Shop app's order list, gets picked up and
routed to the Delivery app, and is visible in the Admin panel's stats —
all in real time via polling against the shared API.

```
geym-web/
├── shared-backend/    Express API — the single source of truth all 4 apps hit
├── customer-app/      Port 5173 — browse, cart, checkout, track orders
├── shop-app/          Port 5174 — shop dashboard, accept orders, pack
├── delivery-app/       Port 5175 — delivery dashboard, pick up, deliver
└── admin-panel/        Port 5176 — KPIs, all orders, products, customers
```

## Run everything (5 terminals)

```bash
# 1. Start the shared backend first
cd shared-backend && npm install && npm run dev        # http://localhost:4000

# 2-5. Start each frontend (separate terminals)
cd customer-app  && npm install && npm run dev          # http://localhost:5173
cd shop-app      && npm install && npm run dev          # http://localhost:5174
cd delivery-app  && npm install && npm run dev          # http://localhost:5175
cd admin-panel   && npm install && npm run dev          # http://localhost:5176
```

Then open all four in tabs and try the full flow:
1. **Customer app** → browse Electrical category → add "Finolex PVC Insulated Copper Wire" to cart → Checkout → Place Order
2. **Shop app** → the new order appears on the dashboard within ~3s → open it → "Accept & Pack Order" → "Mark Picked Up"
3. **Delivery app** → the order is now assigned and appears on the dashboard → "Start Delivery" → "Mark Delivered"
4. **Customer app** (tracking screen, still open) → watch the status timeline update live as you do the above
5. **Admin panel** → Orders table and dashboard KPIs update as the order moves through the pipeline

Each app also has small "Other GEYM apps" links in its footer/profile so you can jump between them.

## Deploy everything together

Deploy the repository root as one Vercel project. The root build publishes the customer app at `/`, shop partner at `/shop`, delivery partner at `/delivery`, admin panel at `/admin`, and the shared backend at `/api`. No frontend or backend deployment is required separately. The `.env.example` files show the local development value.

## Seed Firestore catalog

The catalog seed contains products in all seven categories. After authenticating with the Firebase project and allowing writes to the `categories` and `products` collections, run:

```bash
cd shop-app
npm run seed:firestore
```

The command writes deterministic document IDs, so it can be run again safely without creating duplicates.

Copy `shop-app/.env.example` to `shop-app/.env`, fill in the Firebase values from the Firebase Console, and keep the `.env` file out of Git. Add the `VITE_FIREBASE_*` values to Vercel environment variables for the shop app. If the Firebase API key was ever used as a server credential, rotate it in Google Cloud Console and restrict it to the project's web domains.

## Why this architecture
- **One shared backend, four frontends** mirrors how this would actually be built in production: separate deployable apps for separate audiences (customers, shop owners, riders, internal admins), all backed by one API and one database.
- Data lives **in memory** in `shared-backend/server.js` for this starter — restarting the backend clears orders. Swap in Postgres/Mongo + an ORM (Prisma is a good fit) when you're ready; the route shapes won't need to change.
- Status transitions are deliberately simple (`confirmed → packed → pickedUp → outForDelivery → delivered`) and enforced only loosely — add real validation/auth before this goes anywhere near production.

## Next steps toward production
- **Auth**: phone OTP for customers, email/password or SSO for shop/delivery/admin — each app currently assumes a single hardcoded logged-in identity (`shop1`, `dp1`) for demo purposes
- **Real-time**: replace the 3-second polling with WebSockets or Server-Sent Events for instant updates
- **Payments**: wire Razorpay/Stripe for UPI/Card at checkout
- **Images**: replace the colored icon placeholders with real product photos
- **Maps**: add `@react-google-maps/api` or Mapbox GL to the delivery app's map placeholder for live routing
- **Persistence**: move off the in-memory array to a real database
- **Deployment**: each folder deploys independently (Vercel/Netlify for the frontends, Render/Railway/Fly for the backend) — just point `VITE_API_URL` at your deployed backend URL

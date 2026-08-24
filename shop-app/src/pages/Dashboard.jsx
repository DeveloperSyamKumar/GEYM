import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import StatusBadge from '../components/StatusBadge.jsx';

const SHOP_ID = 'shop1'; // Sharma Electricals — the logged-in shop for this demo

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const load = () => api.get(`/orders?shopId=${SHOP_ID}`).then(setOrders).catch(console.error);

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000); // picks up new orders from customer-app live
    return () => clearInterval(interval);
  }, []);

  const newOrders = orders.filter((o) => o.status === 'confirmed').length;
  const totalSales = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold">Welcome, Sharma Electricals</h1>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <Kpi label="New Orders" value={newOrders} />
        <Kpi label="Total Orders" value={orders.length} />
        <Kpi label="Total Sales" value={`₹${totalSales.toFixed(0)}`} />
      </div>

      <h2 className="font-semibold mt-6 mb-2">Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders yet. Place one from the customer app to see it here live.</p>
      ) : (
        <div className="space-y-2">
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => navigate(`/orders/${o.id}`)}
              className="w-full text-left border border-gray-200 rounded-xl p-3 bg-white flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-sm">#{o.id}</p>
                <p className="text-xs text-gray-500">{o.customerName} · ₹{o.total.toFixed(2)}</p>
              </div>
              <StatusBadge status={o.status} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

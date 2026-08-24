import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { api } from '../api/client.js';
import StatusBadge from '../components/StatusBadge.jsx';

const DP_ID = 'dp1'; // Amit Kumar — the logged-in delivery partner for this demo

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const load = () => api.get(`/orders?deliveryPartnerId=${DP_ID}`).then(setOrders).catch(console.error);

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000); // picks up newly-assigned deliveries live
    return () => clearInterval(interval);
  }, []);

  const active = orders.filter((o) => o.status !== 'delivered');
  const totalEarnings = orders.filter((o) => o.status === 'delivered').length * 45; // flat demo rate per delivery

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold">Today's Deliveries</h1>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <Kpi label="Active" value={active.length} />
        <Kpi label="Total Assigned" value={orders.length} />
        <Kpi label="Earnings" value={`₹${totalEarnings}`} />
      </div>

      <h2 className="font-semibold mt-6 mb-2">Deliveries</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No deliveries assigned yet. A delivery is auto-assigned once a shop marks an order as picked up.
        </p>
      ) : (
        <div className="space-y-2">
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => navigate(`/deliveries/${o.id}`)}
              className="w-full text-left border border-gray-200 rounded-xl p-3 bg-white flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-sm">#{o.id}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin size={12} /> {o.address}
                </p>
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

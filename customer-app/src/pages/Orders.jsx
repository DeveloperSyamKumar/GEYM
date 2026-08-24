import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/orders').then(setOrders).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders yet — place one from the home screen.</p>
      ) : (
        <div className="space-y-2">
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => navigate(`/tracking/${o.id}`)}
              className="w-full text-left border border-gray-200 rounded-2xl p-3 bg-white"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm">#{o.id}</p>
                <StatusBadge status={o.status} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {o.items.length} item(s) · ₹{o.total.toFixed(2)}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

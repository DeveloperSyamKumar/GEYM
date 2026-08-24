import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api/client.js';
import StatusBadge from '../components/StatusBadge.jsx';

const NEXT_STATUS = {
  confirmed: 'packed',
  packed: 'pickedUp',
};

const ACTION_LABEL = {
  confirmed: 'Accept & Pack Order',
  packed: 'Mark Picked Up by Delivery Partner',
};

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const load = () => api.get(`/orders/${orderId}`).then(setOrder).catch(console.error);

  useEffect(() => {
    load();
  }, [orderId]);

  const advance = async () => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    setUpdating(true);
    try {
      const updated = await api.patch(`/orders/${orderId}/status`, { status: next });
      setOrder(updated);
    } finally {
      setUpdating(false);
    }
  };

  if (!order) return <div className="p-6 text-gray-500">Loading…</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="border border-gray-200 rounded-xl p-4 bg-white">
        <div className="flex justify-between items-center">
          <p className="font-bold">Order #{order.id}</p>
          <StatusBadge status={order.status} />
        </div>
        <p className="text-sm text-gray-500 mt-1">Customer: {order.customerName}</p>
        <p className="text-sm text-gray-500">{order.address}</p>

        <div className="mt-4 space-y-2">
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span>{item.name} × {item.qty}</span>
              <span>₹{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-sm">
          <span>Total Amount</span>
          <span>₹{order.total.toFixed(2)}</span>
        </div>
      </div>

      {NEXT_STATUS[order.status] ? (
        <button
          onClick={advance}
          disabled={updating}
          className="w-full bg-navy text-white rounded-xl py-3 font-semibold text-sm mt-4 disabled:opacity-50"
        >
          {updating ? 'Updating…' : ACTION_LABEL[order.status]}
        </button>
      ) : (
        <p className="text-sm text-gray-500 mt-4 text-center">
          This order has moved on to the delivery partner — no further shop action needed.
        </p>
      )}
    </div>
  );
}

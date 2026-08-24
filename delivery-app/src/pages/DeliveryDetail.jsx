import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation2 } from 'lucide-react';
import { api } from '../api/client.js';
import StatusBadge from '../components/StatusBadge.jsx';

const NEXT_STATUS = {
  pickedUp: 'outForDelivery',
  outForDelivery: 'delivered',
};

const ACTION_LABEL = {
  pickedUp: 'Start Delivery (Out for Delivery)',
  outForDelivery: 'Mark Delivered',
};

export default function DeliveryDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/orders/${orderId}`).then(setOrder).catch(console.error);
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
          <p className="font-bold">Delivery #{order.id}</p>
          <StatusBadge status={order.status} />
        </div>

        <div className="mt-4 h-40 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm gap-2">
          <Navigation2 size={18} /> Live map view goes here (Google Maps / Mapbox SDK)
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" /> Pickup: Sharma Electricals
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" /> Drop: {order.address}
          </p>
        </div>

        <hr className="my-3" />
        <p className="text-sm text-gray-600">Customer: {order.customerName} · {order.phone}</p>
        <p className="text-sm text-gray-600">{order.items.length} item(s) · ₹{order.total.toFixed(2)}</p>
      </div>

      {NEXT_STATUS[order.status] ? (
        <button
          onClick={advance}
          disabled={updating}
          className="w-full bg-navy text-white rounded-xl py-3 font-semibold text-sm mt-4 disabled:opacity-50"
        >
          {updating ? 'Updating…' : ACTION_LABEL[order.status]}
        </button>
      ) : order.status === 'delivered' ? (
        <p className="text-sm text-green-700 mt-4 text-center font-medium">Delivered — great job!</p>
      ) : (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Waiting on the shop to mark this order picked up before you can start the delivery.
        </p>
      )}
    </div>
  );
}

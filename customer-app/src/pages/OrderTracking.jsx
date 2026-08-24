import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Circle, Phone, MessageCircle } from 'lucide-react';
import { api } from '../api/client.js';

const FLOW = ['confirmed', 'packed', 'pickedUp', 'outForDelivery', 'delivered'];
const LABELS = {
  confirmed: 'Order Confirmed',
  packed: 'Packed by Store',
  pickedUp: 'Picked Up by Delivery Partner',
  outForDelivery: 'Out for Delivery',
  delivered: 'Delivered',
};

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = () => api.get(`/orders/${orderId}`).then(setOrder).catch(console.error);
    load();
    // Poll so status changes made in the shop/delivery apps show up live here —
    // this is the "interlinked" part in action.
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <div className="p-4 text-gray-500">Loading…</div>;

  const currentIndex = FLOW.indexOf(order.status);

  return (
    <div className="p-4 pb-28">
      <h1 className="text-lg font-bold mb-1">Order Tracking</h1>
      <p className="text-sm font-semibold">Order ID: #{order.id}</p>
      <p className="text-xs text-gray-500 mb-5">
        Placed on {new Date(order.placedAt).toLocaleString()}
      </p>

      <div className="space-y-0">
        {FLOW.map((status, i) => {
          const reached = i <= currentIndex;
          return (
            <div key={status} className="flex gap-3">
              <div className="flex flex-col items-center">
                {reached ? (
                  <CheckCircle2 size={20} className="text-green-600" />
                ) : (
                  <Circle size={20} className="text-gray-300" />
                )}
                {i !== FLOW.length - 1 && (
                  <div className={`w-0.5 h-10 ${reached ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
              <p className={`text-sm pb-6 ${reached ? 'font-semibold' : 'text-gray-400'}`}>
                {LABELS[status]}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 border border-gray-200 rounded-2xl p-3 bg-white mt-2">
        <div className="w-10 h-10 rounded-full bg-gray-100" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Amit Kumar</p>
          <p className="text-xs text-gray-500">4.8 ★ · DL-05-AB-1234</p>
        </div>
        <Phone size={18} className="text-gray-500" />
        <MessageCircle size={18} className="text-gray-500" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 max-w-md mx-auto">
        <button className="flex-1 border border-navy text-navy rounded-xl py-3 font-semibold text-sm">
          Need Help?
        </button>
        <button
          onClick={() => navigate(`/order/${order.id}`)}
          className="flex-1 bg-navy text-white rounded-xl py-3 font-semibold text-sm"
        >
          Order Details
        </button>
      </div>
    </div>
  );
}

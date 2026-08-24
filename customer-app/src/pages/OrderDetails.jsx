import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Package } from 'lucide-react';
import { api } from '../api/client.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${orderId}`).then(setOrder).catch(console.error);
  }, [orderId]);

  if (!order) return <div className="p-4 text-gray-500">Loading…</div>;

  return (
    <div className="p-4 pb-28">
      <h1 className="text-lg font-bold mb-4">Order Details</h1>

      <div className="border border-gray-200 rounded-2xl p-4 bg-white mb-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-500">Order ID</p>
            <p className="font-semibold text-sm">#{order.id}</p>
          </div>
          <button className="text-navy text-xs">Copy</button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Order Date: {new Date(order.placedAt).toLocaleString()}
        </p>
        <div className="mt-2">
          <StatusBadge status={order.status} />
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl p-4 bg-white mb-3">
        <p className="font-semibold text-sm mb-1">Delivery Address</p>
        <p className="text-sm">{order.customerName}</p>
        <p className="text-sm text-gray-600">{order.address}</p>
        <p className="text-sm text-gray-600">{order.phone}</p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-4 bg-white">
        <p className="font-semibold text-sm mb-2">Items ({order.items.length})</p>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <Package size={18} className="text-gray-500" />
              </div>
              <p className="flex-1 text-sm line-clamp-1">{item.name}</p>
              <p className="text-sm">₹{(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-extrabold text-sm">
          <span>Total Amount</span>
          <span>₹{order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto">
        <button className="w-full border border-navy text-navy rounded-xl py-3 font-semibold text-sm">
          Download Invoice
        </button>
      </div>
    </div>
  );
}

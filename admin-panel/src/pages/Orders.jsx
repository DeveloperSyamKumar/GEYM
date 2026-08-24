import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = () => api.get('/orders').then(setOrders).catch(console.error);
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Orders</h1>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-gray-100">
                <td className="p-3 font-medium">#{o.id}</td>
                <td className="p-3">{o.customerName}</td>
                <td className="p-3">{o.items.length}</td>
                <td className="p-3">₹{o.total.toFixed(2)}</td>
                <td className="p-3">{o.paymentMethod}</td>
                <td className="p-3"><StatusBadge status={o.status} /></td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  No orders yet — place one from the customer app.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

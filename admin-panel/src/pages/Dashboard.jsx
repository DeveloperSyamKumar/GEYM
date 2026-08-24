import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = () => api.get('/stats').then(setStats).catch(console.error);
    load();
    const interval = setInterval(load, 3000); // reflects orders placed/updated across all apps live
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div className="p-6 text-gray-500">Loading…</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <Kpi label="Customers" value={stats.totalCustomers.toLocaleString()} />
        <Kpi label="Shops" value={stats.totalShops} />
        <Kpi label="Delivery Partners" value={stats.totalDeliveryPartners} />
        <Kpi label="Total Orders" value={stats.totalOrders} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500 mb-2">Orders Overview</p>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-green-600">Completed: {stats.completedOrders}</span>
            <span className="text-orange-600">Pending: {stats.pendingOrders}</span>
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 bg-white col-span-2">
          <p className="text-sm text-gray-500 mb-2">Sales Overview</p>
          <p className="text-2xl font-bold">₹{stats.totalSales.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">Total sales across all shops</p>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

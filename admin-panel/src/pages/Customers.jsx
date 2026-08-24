import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get('/customers').then(setCustomers).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      {customers.length === 0 ? (
        <p className="text-sm text-gray-500">No customers yet.</p>
      ) : <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
}

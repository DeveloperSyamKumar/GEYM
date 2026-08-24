import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">{p.categoryId}</td>
                <td className="p-3">₹{p.price.toFixed(2)} / {p.unit}</td>
                <td className="p-3">{p.rating} ★ ({p.ratingCount})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

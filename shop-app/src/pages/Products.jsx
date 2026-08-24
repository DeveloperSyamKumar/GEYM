import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { api } from '../api/client.js';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">My Products</h1>
      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 bg-white">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${p.color}22` }}
            >
              <Package size={20} style={{ color: p.color }} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs text-gray-500">{p.brand}</p>
            </div>
            <p className="font-semibold text-sm">₹{p.price.toFixed(2)} / {p.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

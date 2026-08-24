import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MapPin } from 'lucide-react';
import { api } from '../api/client.js';
import CategoryIcon from '../components/CategoryIcon.jsx';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories').then(setCategories).catch(console.error);
    api.get('/shops').then(setShops).catch(console.error);
    api.get('/products').then(setProducts).catch(console.error);
  }, []);

  const matches = search.trim()
    ? products.filter((product) => `${product.name} ${product.brand}`.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
    : [];

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-1 font-semibold">
          <MapPin size={18} className="text-navy" />
          Sector 63, Noida
        </div>
        <Bell size={20} className="text-gray-500" />
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
          <Search size={18} className="text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search electrical, mechanical materials"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
        {matches.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl mt-2 overflow-hidden">
            {matches.map((product) => (
              <button
                type="button"
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full text-left px-3 py-2 border-b last:border-b-0 border-gray-100 text-sm"
              >
                {product.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 mt-4">
        <div className="bg-navy rounded-2xl p-5 text-white">
          <p className="text-xl font-bold leading-snug">
            Everything you need,
            <br />
            delivered fast.
          </p>
        </div>
      </div>

      <div className="px-4 mt-6 flex items-center justify-between">
        <h2 className="font-bold">Categories</h2>
        <button onClick={() => navigate('/categories')} className="text-gray-500 text-sm">
          View all
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 px-4 mt-3">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/category/${c.id}`)}
            className="flex flex-col items-center gap-1 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-navy">
              <CategoryIcon name={c.icon} />
            </div>
            <span className="text-[11px] leading-tight line-clamp-2">{c.name}</span>
          </button>
        ))}
      </div>

      <div className="px-4 mt-6 flex items-center justify-between">
        <h2 className="font-bold">Top Stores Near You</h2>
      </div>
      <div className="px-4 mt-3 space-y-2">
        {shops.map((s) => (
          <div key={s.id} className="flex items-center gap-3 border border-gray-200 rounded-2xl p-3 bg-white">
            <div className="w-10 h-10 rounded-full bg-gray-100" />
            <div className="flex-1">
              <p className="font-semibold text-sm">{s.name}</p>
              <p className="text-gray-500 text-xs">
                {s.rating} ★ · {s.deliveryTime} · Min. order ₹{s.minOrder}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                s.isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {s.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

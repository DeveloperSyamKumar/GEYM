import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { api } from '../api/client.js';
import CategoryIcon from '../components/CategoryIcon.jsx';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories').then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Categories</h1>
      <div className="space-y-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/category/${c.id}`)}
            className="w-full flex items-center gap-3 border border-gray-200 rounded-2xl p-3 bg-white text-left"
          >
            <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-navy shrink-0">
              <CategoryIcon name={c.icon} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-gray-500 text-xs">{c.productCount}+ Products</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

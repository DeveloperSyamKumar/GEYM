import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';
import ProductRow from '../components/ProductRow.jsx';

export default function ProductList() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();
  const cart = useCart();

  useEffect(() => {
    api.get(`/products?category=${categoryId}`).then(setProducts).catch(console.error);
    api.get('/categories').then((cats) => {
      const found = cats.find((c) => c.id === categoryId);
      setCategoryName(found?.name || '');
    });
  }, [categoryId]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">{categoryName}</h1>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 text-sm">No products in this category yet.</p>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onAdd={cart.add}
              onClick={() => navigate(`/product/${p.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

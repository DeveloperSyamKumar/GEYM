import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Package } from 'lucide-react';
import { api } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const cart = useCart();

  useEffect(() => {
    api.get(`/products/${productId}`).then(setProduct).catch(console.error);
  }, [productId]);

  if (!product) return <div className="p-4 text-gray-500">Loading…</div>;

  return (
    <div className="pb-28">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-4">
          <Heart size={20} className="text-gray-500" />
          <Share2 size={20} className="text-gray-500" />
        </div>
      </div>

      <div className="px-4">
        <div
          className="h-52 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${product.color}1F` }}
        >
          <Package size={72} style={{ color: product.color }} />
        </div>

        <h1 className="text-xl font-bold mt-4">{product.name}</h1>
        <div className="flex items-center gap-3 mt-2 text-sm">
          <span className="flex items-center gap-1">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            {product.rating} ({product.ratingCount})
          </span>
          <span className="text-gray-500">{product.soldCount}+ sold</span>
        </div>

        <p className="text-2xl font-extrabold text-navy mt-3">
          ₹{product.price.toFixed(2)} / {product.unit}
        </p>

        <hr className="my-4" />

        <div className="text-sm space-y-1">
          <p>
            <span className="text-gray-500">Brand: </span>
            {product.brand}
          </p>
          {product.material && (
            <p>
              <span className="text-gray-500">Material: </span>
              {product.material}
            </p>
          )}
          {product.size && (
            <p>
              <span className="text-gray-500">Size: </span>
              {product.size}
            </p>
          )}
          {product.length && (
            <p>
              <span className="text-gray-500">Length: </span>
              {product.length}
            </p>
          )}
        </div>

        {product.features?.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold text-sm mb-1">Features:</p>
            <ul className="text-sm space-y-1">
              {product.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 max-w-md mx-auto">
        <button
          onClick={() => cart.add(product)}
          className="flex-1 border border-navy text-navy rounded-xl py-3 font-semibold text-sm"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            cart.add(product);
            navigate('/checkout');
          }}
          className="flex-1 bg-navy text-white rounded-xl py-3 font-semibold text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

import { Package } from 'lucide-react';

export default function ProductRow({ product, onAdd, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-3 cursor-pointer hover:shadow-sm transition"
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${product.color}22` }}
      >
        <Package size={24} style={{ color: product.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm line-clamp-2">{product.name}</p>
        <p className="text-gray-500 text-sm mt-1">
          ₹{product.price.toFixed(2)} / {product.unit}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAdd(product);
        }}
        className="bg-navy text-white rounded-full w-9 h-9 flex items-center justify-center text-lg shrink-0"
      >
        +
      </button>
    </div>
  );
}

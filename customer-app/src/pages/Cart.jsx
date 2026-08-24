import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Package } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const cart = useCart();
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-28">
      <h1 className="text-lg font-bold mb-4">Cart · {cart.itemCount} Items</h1>

      {cart.items.length === 0 ? (
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3">
            {cart.items.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-3 border border-gray-200 rounded-2xl p-3 bg-white">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${product.color}22` }}
                >
                  <Package size={24} style={{ color: product.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                  <p className="text-gray-500 text-sm">₹{product.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <button onClick={() => cart.decrement(product.id)} className="w-7 h-7 rounded-full border flex items-center justify-center">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm w-4 text-center">{qty}</span>
                    <button onClick={() => cart.increment(product.id)} className="w-7 h-7 rounded-full border flex items-center justify-center">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold text-sm">₹{(product.price * qty).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-gray-200 rounded-2xl p-4 bg-white mt-4">
            <p className="font-semibold text-sm mb-2">Bill Details</p>
            <Row label="Item Total" value={cart.itemTotal} />
            <Row label="Delivery Fee" value={cart.DELIVERY_FEE} />
            <Row label="Packaging Fee" value={cart.PACKAGING_FEE} />
            <hr className="my-2" />
            <Row label="Total Amount" value={cart.total} bold />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-navy text-white rounded-xl py-3 font-semibold text-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex justify-between text-sm py-0.5 ${bold ? 'font-extrabold' : ''}`}>
      <span>{label}</span>
      <span>₹{value.toFixed(2)}</span>
    </div>
  );
}

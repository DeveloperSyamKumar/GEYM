import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('UPI');
  const [placing, setPlacing] = useState(false);

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const order = await api.post('/orders', {
        items: cart.items.map(({ product, qty }) => ({
          productId: product.id,
          name: product.name,
          price: product.price,
          qty,
        })),
        customerName: 'Rohit Sharma',
        phone: '+91 98765 43210',
        address: 'Sector 63, Noida, Uttar Pradesh - 201301',
        paymentMethod: payment,
      });
      cart.clear();
      navigate(`/tracking/${order.id}`);
    } catch (e) {
      alert(e.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="p-4 pb-28">
      <h1 className="text-lg font-bold mb-4">Checkout</h1>

      <div className="border border-gray-200 rounded-2xl p-4 bg-white mb-3">
        <div className="flex justify-between mb-2">
          <p className="font-semibold text-sm">Deliver to</p>
          <button className="text-navy text-sm">Change</button>
        </div>
        <p className="text-sm font-medium">Rohit Sharma</p>
        <p className="text-sm text-gray-600">Sector 63, Noida, Uttar Pradesh - 201301</p>
        <p className="text-sm text-gray-600">+91 98765 43210</p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-4 bg-white mb-3">
        <p className="font-semibold text-sm mb-2">Payment Method</p>
        <div className="flex gap-2">
          {['UPI', 'Card', 'COD'].map((m) => (
            <button
              key={m}
              onClick={() => setPayment(m)}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                payment === m ? 'bg-navy text-white border-navy' : 'border-gray-300 text-gray-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl p-4 bg-white">
        <p className="font-semibold text-sm mb-2">Bill Details</p>
        <Row label="Item Total" value={cart.itemTotal} />
        <Row label="Delivery Fee" value={cart.DELIVERY_FEE} />
        <Row label="Packaging Fee" value={cart.PACKAGING_FEE} />
        <hr className="my-2" />
        <Row label="Total Amount" value={cart.total} bold />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto">
        <button
          disabled={placing || cart.items.length === 0}
          onClick={placeOrder}
          className="w-full bg-navy text-white rounded-xl py-3 font-semibold text-sm disabled:opacity-50"
        >
          {placing ? 'Placing Order…' : 'Place Order'}
        </button>
      </div>
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

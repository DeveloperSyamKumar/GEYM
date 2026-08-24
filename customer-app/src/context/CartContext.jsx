import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

const DELIVERY_FEE = 40;
const PACKAGING_FEE = 20;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { product, qty }

  const add = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const increment = (id) =>
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const decrement = (id) =>
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );

  const clear = () => setItems([]);

  const itemTotal = useMemo(() => items.reduce((s, i) => s + i.product.price * i.qty, 0), [items]);
  const itemCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const total = itemTotal + (items.length ? DELIVERY_FEE + PACKAGING_FEE : 0);

  return (
    <CartContext.Provider
      value={{ items, add, increment, decrement, clear, itemTotal, itemCount, total, DELIVERY_FEE, PACKAGING_FEE }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

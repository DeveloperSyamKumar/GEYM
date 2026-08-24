import { NavLink } from 'react-router-dom';
import { Home, Grid2x2, ReceiptText, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const tabs = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/categories', icon: Grid2x2, label: 'Categories' },
  { to: '/orders', icon: ReceiptText, label: 'Orders' },
  { to: '/cart', icon: ShoppingCart, label: 'Cart' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const { itemCount } = useCart();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 max-w-md mx-auto">
      {tabs.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs gap-1 px-2 relative ${isActive ? 'text-navy font-semibold' : 'text-gray-400'}`
          }
        >
          <Icon size={20} />
          {label === 'Cart' && itemCount > 0 && (
            <span className="absolute -top-1 right-0 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </span>
          )}
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

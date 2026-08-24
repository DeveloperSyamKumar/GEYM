import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Users } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/customers', icon: Users, label: 'Customers' },
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-screen p-4 shrink-0">
      <p className="font-extrabold text-navy px-2 mb-6">GEYM · Admin</p>
      <nav className="space-y-1">
        {links.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                isActive ? 'bg-navy text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Icon size={16} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

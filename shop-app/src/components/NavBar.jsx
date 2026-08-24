import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package } from 'lucide-react';

export default function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-3">
        <p className="font-extrabold text-navy">GEYM · Shop Partner</p>
        <nav className="flex gap-4 text-sm">
          <NavLink to="/" end className={({ isActive }) => `flex items-center gap-1 ${isActive ? 'text-navy font-semibold' : 'text-gray-500'}`}>
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `flex items-center gap-1 ${isActive ? 'text-navy font-semibold' : 'text-gray-500'}`}>
            <Package size={16} /> Products
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

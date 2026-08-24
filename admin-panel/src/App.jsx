import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import AppLinks from './components/AppLinks.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Orders from './pages/Orders.jsx';
import Products from './pages/Products.jsx';
import Customers from './pages/Customers.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F6FA] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </div>
        <AppLinks />
      </div>
    </div>
  );
}

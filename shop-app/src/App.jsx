import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import AppLinks from './components/AppLinks.jsx';
import Dashboard from './pages/Dashboard.jsx';
import OrderDetail from './pages/OrderDetail.jsx';
import Products from './pages/Products.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col">
      <NavBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
      <AppLinks />
    </div>
  );
}

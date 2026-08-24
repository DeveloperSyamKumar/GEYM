import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import BottomNav from './components/BottomNav.jsx';
import Home from './pages/Home.jsx';
import Categories from './pages/Categories.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import Orders from './pages/Orders.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <CartProvider>
      <div className="max-w-md mx-auto bg-[#F5F6FA] min-h-screen relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking/:orderId" element={<OrderTracking />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <div className="h-16" />
        <BottomNav />
      </div>
    </CartProvider>
  );
}

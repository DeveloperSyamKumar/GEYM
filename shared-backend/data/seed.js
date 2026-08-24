export const categories = [
  { id: 'electrical', name: 'Electrical', icon: 'Zap', productCount: 5000 },
  { id: 'mechanical', name: 'Mechanical', icon: 'Settings', productCount: 3500 },
  { id: 'engineering', name: 'Engineering Materials', icon: 'Factory', productCount: 4500 },
  { id: 'tools', name: 'Tools & Hardware', icon: 'Hammer', productCount: 3000 },
  { id: 'pipes', name: 'Pipes & Fittings', icon: 'Waves', productCount: 2000 },
  { id: 'safety', name: 'Safety Products', icon: 'HardHat', productCount: 1500 },
  { id: 'fasteners', name: 'Fasteners', icon: 'CircleDot', productCount: 2500 },
];

export const products = [
  {
    id: 'p1', name: 'Finolex PVC Insulated Copper Wire 1.5 Sq mm', brand: 'Finolex',
    categoryId: 'electrical', price: 22.5, unit: 'meter', rating: 4.6, ratingCount: 124,
    soldCount: 100, material: 'Copper', size: '1.5 Sq mm', length: '90 Meter (1 Coil)',
    features: ['High conductivity', 'Flame retardant', 'Long life', 'ISI Certified'], color: '#dc2626',
  },
  {
    id: 'p2', name: 'Havells MCB Single Pole 32A', brand: 'Havells',
    categoryId: 'electrical', price: 256, unit: 'piece', rating: 4.5, ratingCount: 89,
    soldCount: 60, material: 'Thermoplastic',
    features: ['Overload protection', 'Short circuit protection', 'ISI Certified'], color: '#374151',
  },
  {
    id: 'p3', name: 'Anchor Roma Switch 1 Module', brand: 'Anchor',
    categoryId: 'electrical', price: 36, unit: 'piece', rating: 4.4, ratingCount: 210,
    soldCount: 340, features: ['Fire retardant polycarbonate', 'Smooth switching action'], color: '#9ca3af',
  },
  {
    id: 'p4', name: 'Polycab 3 Core Cable 1.5 Sq mm', brand: 'Polycab',
    categoryId: 'electrical', price: 78, unit: 'meter', rating: 4.7, ratingCount: 156,
    soldCount: 220, material: 'Copper', size: '1.5 Sq mm',
    features: ['Fire resistant', 'High tensile strength'], color: '#991b1b',
  },
];

export const shops = [
  { id: 'shop1', name: 'Sharma Electricals', rating: 4.6, deliveryTime: '25-30 mins', minOrder: 500, isOpen: true },
  { id: 'shop2', name: 'Kumar Traders', rating: 4.3, deliveryTime: '30-40 mins', minOrder: 300, isOpen: true },
  { id: 'shop3', name: 'Gupta Hardware', rating: 4.5, deliveryTime: '20-25 mins', minOrder: 400, isOpen: false },
];

export const deliveryPartners = [
  { id: 'dp1', name: 'Amit Kumar', rating: 4.8, vehicleNumber: 'DL-05-AB-1234' },
];

export const STATUS_FLOW = ['confirmed', 'packed', 'pickedUp', 'outForDelivery', 'delivered'];

export const STATUS_LABELS = {
  confirmed: 'Order Confirmed',
  packed: 'Packed by Store',
  pickedUp: 'Picked Up by Delivery Partner',
  outForDelivery: 'Out for Delivery',
  delivered: 'Delivered',
};

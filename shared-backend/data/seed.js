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
  {
    id: 'p5', name: 'SKF Deep Groove Ball Bearing 6204', brand: 'SKF',
    categoryId: 'mechanical', price: 185, unit: 'piece', rating: 4.6, ratingCount: 74,
    soldCount: 92, material: 'Chrome steel', size: '20 x 47 x 14 mm',
    features: ['Low friction', 'Dust protected', 'High load capacity'], color: '#2563eb',
  },
  {
    id: 'p6', name: 'Bosch Flexible Coupling 25 mm', brand: 'Bosch',
    categoryId: 'mechanical', price: 420, unit: 'piece', rating: 4.4, ratingCount: 38,
    soldCount: 51, material: 'Steel and rubber',
    features: ['Vibration damping', 'Easy installation'], color: '#1d4ed8',
  },
  {
    id: 'p7', name: 'Tata MS Square Tube 25 x 25 mm', brand: 'Tata Steel',
    categoryId: 'engineering', price: 1850, unit: 'length', rating: 4.5, ratingCount: 61,
    soldCount: 48, material: 'Mild steel', size: '25 x 25 x 2 mm', length: '6 Meter',
    features: ['Uniform finish', 'Structural grade', 'Weldable'], color: '#64748b',
  },
  {
    id: 'p8', name: 'Jindal Stainless Steel Sheet 304', brand: 'Jindal',
    categoryId: 'engineering', price: 3250, unit: 'sheet', rating: 4.7, ratingCount: 45,
    soldCount: 33, material: 'Stainless steel 304', size: '4 x 8 ft',
    features: ['Corrosion resistant', 'Mirror-ready finish'], color: '#94a3b8',
  },
  {
    id: 'p9', name: 'Stanley Claw Hammer 500 g', brand: 'Stanley',
    categoryId: 'tools', price: 675, unit: 'piece', rating: 4.8, ratingCount: 112,
    soldCount: 180, material: 'Forged steel',
    features: ['Fiberglass grip', 'Balanced head', 'Rust resistant'], color: '#eab308',
  },
  {
    id: 'p10', name: 'Taparia Combination Spanner Set 12 Pcs', brand: 'Taparia',
    categoryId: 'tools', price: 890, unit: 'set', rating: 4.6, ratingCount: 96,
    soldCount: 124, material: 'Chrome vanadium steel',
    features: ['12 metric sizes', 'Mirror polished', 'Roll pouch included'], color: '#ca8a04',
  },
  {
    id: 'p11', name: 'Astral PVC Pressure Pipe 25 mm', brand: 'Astral',
    categoryId: 'pipes', price: 145, unit: 'meter', rating: 4.5, ratingCount: 83,
    soldCount: 205, material: 'uPVC', size: '25 mm', length: '3 Meter',
    features: ['Lead free', 'Leak proof joints', 'UV stabilized'], color: '#0ea5e9',
  },
  {
    id: 'p12', name: 'Supreme PVC Elbow 25 mm 90 Degree', brand: 'Supreme',
    categoryId: 'pipes', price: 28, unit: 'piece', rating: 4.4, ratingCount: 67,
    soldCount: 310, material: 'PVC', size: '25 mm',
    features: ['Precision molded', 'Corrosion resistant'], color: '#0284c7',
  },
  {
    id: 'p13', name: '3M Safety Helmet with Ratchet Harness', brand: '3M',
    categoryId: 'safety', price: 520, unit: 'piece', rating: 4.7, ratingCount: 88,
    soldCount: 140, material: 'HDPE',
    features: ['Impact resistant', 'Adjustable fit', 'Ventilated shell'], color: '#f97316',
  },
  {
    id: 'p14', name: 'Karam Reflective Safety Jacket', brand: 'Karam',
    categoryId: 'safety', price: 285, unit: 'piece', rating: 4.5, ratingCount: 53,
    soldCount: 76, material: 'Polyester', size: 'Free size',
    features: ['High visibility', 'Reflective strips', 'Front zipper'], color: '#ea580c',
  },
  {
    id: 'p15', name: 'TVS Hex Bolt and Nut M8 x 40 mm', brand: 'TVS',
    categoryId: 'fasteners', price: 6.5, unit: 'piece', rating: 4.6, ratingCount: 71,
    soldCount: 580, material: 'Galvanized steel', size: 'M8 x 40 mm',
    features: ['Zinc plated', 'Metric thread', 'Corrosion resistant'], color: '#475569',
  },
  {
    id: 'p16', name: 'Unbrako Stainless Steel Allen Screws M6', brand: 'Unbrako',
    categoryId: 'fasteners', price: 4.25, unit: 'piece', rating: 4.7, ratingCount: 59,
    soldCount: 420, material: 'Stainless steel 304', size: 'M6 x 25 mm',
    features: ['Allen head', 'High tensile strength', 'Rust proof'], color: '#334155',
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

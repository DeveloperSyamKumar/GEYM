const APPS = [
  { label: 'Customer App', url: import.meta.env.VITE_CUSTOMER_APP_URL || 'http://localhost:5173' },
  { label: 'Shop Partner', url: import.meta.env.VITE_SHOP_APP_URL || 'http://localhost:5174' },
  { label: 'Delivery Partner', url: import.meta.env.VITE_DELIVERY_APP_URL || 'http://localhost:5175' },
  { label: 'Admin Panel', url: import.meta.env.VITE_ADMIN_APP_URL || 'http://localhost:5176' },
];

export default function AppLinks() {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-gray-500 px-6 py-4 border-t border-gray-200 max-w-3xl mx-auto">
      <span className="mr-1">Other GEYM apps:</span>
      {APPS.filter((a) => a.label !== 'Shop Partner').map((a) => (
        <a key={a.url} href={a.url} className="underline hover:text-navy">
          {a.label}
        </a>
      ))}
    </div>
  );
}

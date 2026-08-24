// Cross-app navigation — these four apps share one backend and are meant
// to be run side by side during dev (see root README for ports).
const APPS = [
  { label: 'Customer App', url: import.meta.env.VITE_CUSTOMER_APP_URL || (import.meta.env.DEV ? 'http://localhost:5173' : '/') },
  { label: 'Shop Partner', url: import.meta.env.VITE_SHOP_APP_URL || (import.meta.env.DEV ? 'http://localhost:5174' : '/shop/') },
  { label: 'Delivery Partner', url: import.meta.env.VITE_DELIVERY_APP_URL || (import.meta.env.DEV ? 'http://localhost:5175' : '/delivery/') },
  { label: 'Admin Panel', url: import.meta.env.VITE_ADMIN_APP_URL || (import.meta.env.DEV ? 'http://localhost:5176' : '/admin/') },
];

export default function AppLinks({ current }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs text-gray-500 px-4 py-3 border-t border-gray-100">
      <span className="mr-1">Other GEYM apps:</span>
      {APPS.filter((a) => a.label !== current).map((a) => (
        <a key={a.url} href={a.url} className="underline hover:text-navy">
          {a.label}
        </a>
      ))}
    </div>
  );
}

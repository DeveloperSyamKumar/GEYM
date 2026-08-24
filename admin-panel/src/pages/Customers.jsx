export default function Customers() {
  // Static placeholder — wire up a real /api/customers endpoint on the
  // shared backend once you have customer accounts/auth in place.
  const customers = [
    { id: 'c1', name: 'Rohit Sharma', phone: '+91 98765 43210', orders: 4 },
    { id: 'c2', name: 'Vikas Yadav', phone: '+91 91234 56780', orders: 2 },
    { id: 'c3', name: 'Ankit Singh', phone: '+91 90000 11122', orders: 7 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

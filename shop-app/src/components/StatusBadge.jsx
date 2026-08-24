const COLORS = {
  confirmed: 'bg-blue-100 text-blue-700',
  packed: 'bg-amber-100 text-amber-700',
  pickedUp: 'bg-purple-100 text-purple-700',
  outForDelivery: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
};

const LABELS = {
  confirmed: 'Order Confirmed',
  packed: 'Packed by Store',
  pickedUp: 'Picked Up',
  outForDelivery: 'Out for Delivery',
  delivered: 'Delivered',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${COLORS[status] || 'bg-gray-100 text-gray-600'}`}>
      {LABELS[status] || status}
    </span>
  );
}

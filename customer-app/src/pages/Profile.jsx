import AppLinks from '../components/AppLinks.jsx';

export default function Profile() {
  return (
    <div>
      <div className="p-4">
        <h1 className="text-lg font-bold mb-4">Profile</h1>
        <div className="border border-gray-200 rounded-2xl p-4 bg-white">
          <p className="font-semibold text-sm">Rohit Sharma</p>
          <p className="text-sm text-gray-500">+91 98765 43210</p>
        </div>
      </div>
      <AppLinks current="Customer App" />
    </div>
  );
}

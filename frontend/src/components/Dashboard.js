import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ crops: 0, soil: 0, irrigation: 0, equipment: 0, fertilizer: 0, yield: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload.user);
      fetchStats(token);
    }
  }, []);

  const fetchStats = async (token) => {
    try {
      const [cropsRes, soilRes, irrRes, equipRes, fertRes, yieldRes] = await Promise.all([
        axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/crops', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/soil', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/irrigation', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/equipment', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/fertilizer', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/yield', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setStats({
        crops: cropsRes.data.length,
        soil: soilRes.data.length,
        irrigation: irrRes.data.length,
        equipment: equipRes.data.length,
        fertilizer: fertRes.data.length,
        yield: yieldRes.data.length
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Smart Agriculture</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {user.role}</span>
              <button onClick={handleLogout} className="bg-indigo-600 text-white px-4 py-2 rounded">Logout</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Total Crops</h3>
              <p className="text-2xl font-bold text-green-600">{stats.crops}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Soil Tests</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.soil}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Irrigation Schedules</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.irrigation}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Equipment</h3>
              <p className="text-2xl font-bold text-orange-600">{stats.equipment}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Fertilizer Applications</h3>
              <p className="text-2xl font-bold text-red-600">{stats.fertilizer}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Yield Records</h3>
              <p className="text-2xl font-bold text-yellow-600">{stats.yield}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/crops" className="bg-white p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">Crop Management</h3>
            </Link>
            <Link to="/soil" className="bg-white p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">Soil & Fertility</h3>
            </Link>
            <Link to="/irrigation" className="bg-white p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">Irrigation</h3>
            </Link>
            <Link to="/equipment" className="bg-white p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">Equipment</h3>
            </Link>
            <Link to="/fertilizer" className="bg-white p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">Fertilizer & Pesticide</h3>
            </Link>
            <Link to="/yield" className="bg-white p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">Yield Analytics</h3>
            </Link>
            <Link to="/suppliers" className="bg-white p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">Supplier Marketplace</h3>
            </Link>
            <Link to="/recommendations" className="bg-white p-4 rounded shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">Smart Recommendations</h3>
            </Link>
              <h3 className="text-lg font-semibold">Supplier Marketplace</h3>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

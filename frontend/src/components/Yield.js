import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Yield = () => {
  const [yields, setYields] = useState([]);
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({ crop: '', quantity: '', quality: 'medium', harvestDate: '' });

  useEffect(() => {
    fetchYields();
    fetchCrops();
  }, []);

  const fetchYields = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/yield', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setYields(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCrops = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/crops', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCrops(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/yield', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchYields();
      setFormData({ crop: '', quantity: '', quality: 'medium', harvestDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteYield = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/yield/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchYields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Yield Analytics</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="crop" value={formData.crop} onChange={handleChange} className="border p-2" required>
              <option value="">Select Crop</option>
              {crops.map(crop => <option key={crop._id} value={crop._id}>{crop.name}</option>)}
            </select>
            <input name="quantity" type="number" placeholder="Quantity (kg)" value={formData.quantity} onChange={handleChange} className="border p-2" required />
            <select name="quality" value={formData.quality} onChange={handleChange} className="border p-2">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input name="harvestDate" type="date" value={formData.harvestDate} onChange={handleChange} className="border p-2" required />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Yield</button>
        </form>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {yields.map(yieldData => (
              <li key={yieldData._id} className="border-b py-2 flex justify-between">
                <span>Crop: {crops.find(c => c._id === yieldData.crop)?.name} - Qty: {yieldData.quantity}kg - Quality: {yieldData.quality}</span>
                <button onClick={() => deleteYield(yieldData._id)} className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Yield;

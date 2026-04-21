import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fertilizer = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({ name: '', type: '', quantity: '', applicationDate: '', crop: '' });

  useEffect(() => {
    fetchFertilizers();
    fetchCrops();
  }, []);

  const fetchFertilizers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/fertilizer', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFertilizers(res.data);
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
      await axios.post('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/fertilizer', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFertilizers();
      setFormData({ name: '', type: '', quantity: '', applicationDate: '', crop: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFertilizer = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/fertilizer/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFertilizers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Fertilizer & Pesticide Tracking</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Fertilizer Name" value={formData.name} onChange={handleChange} className="border p-2" required />
            <input name="type" type="text" placeholder="Type" value={formData.type} onChange={handleChange} className="border p-2" required />
            <input name="quantity" type="number" placeholder="Quantity (kg)" value={formData.quantity} onChange={handleChange} className="border p-2" required />
            <input name="applicationDate" type="date" value={formData.applicationDate} onChange={handleChange} className="border p-2" required />
            <select name="crop" value={formData.crop} onChange={handleChange} className="border p-2" required>
              <option value="">Select Crop</option>
              {crops.map(crop => <option key={crop._id} value={crop._id}>{crop.name}</option>)}
            </select>
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Fertilizer</button>
        </form>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {fertilizers.map(fertilizer => (
              <li key={fertilizer._id} className="border-b py-2 flex justify-between">
                <span>{fertilizer.name} - {fertilizer.type} - Qty: {fertilizer.quantity}kg - Crop: {crops.find(c => c._id === fertilizer.crop)?.name}</span>
                <button onClick={() => deleteFertilizer(fertilizer._id)} className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Fertilizer;

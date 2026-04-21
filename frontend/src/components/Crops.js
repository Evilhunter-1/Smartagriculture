import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({ name: '', type: '', plantingDate: '', harvestDate: '' });

  useEffect(() => {
    fetchCrops();
  }, []);

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
      await axios.post('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/crops', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCrops();
      setFormData({ name: '', type: '', plantingDate: '', harvestDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCrop = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/crops/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCrops();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Crop Management</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Crop Name" value={formData.name} onChange={handleChange} className="border p-2" required />
            <input name="type" type="text" placeholder="Crop Type" value={formData.type} onChange={handleChange} className="border p-2" required />
            <input name="plantingDate" type="date" value={formData.plantingDate} onChange={handleChange} className="border p-2" required />
            <input name="harvestDate" type="date" value={formData.harvestDate} onChange={handleChange} className="border p-2" />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Crop</button>
        </form>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {crops.map(crop => (
              <li key={crop._id} className="border-b py-2 flex justify-between">
                <span>{crop.name} - {crop.type} - Status: {crop.status}</span>
                <button onClick={() => deleteCrop(crop._id)} className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Crops;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Irrigation = () => {
  const [irrigations, setIrrigations] = useState([]);
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({ crop: '', schedule: '', waterAmount: '', nextIrrigation: '' });

  useEffect(() => {
    fetchIrrigations();
    fetchCrops();
  }, []);

  const fetchIrrigations = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/irrigation', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIrrigations(res.data);
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
      await axios.post('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/irrigation', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchIrrigations();
      setFormData({ crop: '', schedule: '', waterAmount: '', nextIrrigation: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteIrrigation = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/irrigation/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchIrrigations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Irrigation Management</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="crop" value={formData.crop} onChange={handleChange} className="border p-2" required>
              <option value="">Select Crop</option>
              {crops.map(crop => <option key={crop._id} value={crop._id}>{crop.name}</option>)}
            </select>
            <input name="schedule" type="text" placeholder="Schedule" value={formData.schedule} onChange={handleChange} className="border p-2" required />
            <input name="waterAmount" type="number" placeholder="Water Amount (L)" value={formData.waterAmount} onChange={handleChange} className="border p-2" required />
            <input name="nextIrrigation" type="datetime-local" value={formData.nextIrrigation} onChange={handleChange} className="border p-2" />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Irrigation</button>
        </form>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {irrigations.map(irrigation => (
              <li key={irrigation._id} className="border-b py-2 flex justify-between">
                <span>Crop: {crops.find(c => c._id === irrigation.crop)?.name} - Schedule: {irrigation.schedule} - Water: {irrigation.waterAmount}L</span>
                <button onClick={() => deleteIrrigation(irrigation._id)} className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Irrigation;

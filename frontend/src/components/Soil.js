import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Soil = () => {
  const [soils, setSoils] = useState([]);
  const [formData, setFormData] = useState({ location: '', phLevel: '', nutrients: { nitrogen: 0, phosphorus: 0, potassium: 0 } });

  useEffect(() => {
    fetchSoils();
  }, []);

  const fetchSoils = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/soil', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSoils(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.nutrients) {
      setFormData({ ...formData, nutrients: { ...formData.nutrients, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/soil', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSoils();
      setFormData({ location: '', phLevel: '', nutrients: { nitrogen: 0, phosphorus: 0, potassium: 0 } });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSoil = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/soil/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSoils();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Soil & Fertility Management</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="location" type="text" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2" required />
            <input name="phLevel" type="number" step="0.1" placeholder="pH Level" value={formData.phLevel} onChange={handleChange} className="border p-2" required />
            <input name="nitrogen" type="number" placeholder="Nitrogen" value={formData.nutrients.nitrogen} onChange={handleChange} className="border p-2" />
            <input name="phosphorus" type="number" placeholder="Phosphorus" value={formData.nutrients.phosphorus} onChange={handleChange} className="border p-2" />
            <input name="potassium" type="number" placeholder="Potassium" value={formData.nutrients.potassium} onChange={handleChange} className="border p-2" />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Soil Data</button>
        </form>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {soils.map(soil => (
              <li key={soil._id} className="border-b py-2 flex justify-between">
                <span>{soil.location} - pH: {soil.phLevel} - N:{soil.nutrients.nitrogen} P:{soil.nutrients.phosphorus} K:{soil.nutrients.potassium}</span>
                <button onClick={() => deleteSoil(soil._id)} className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Soil;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Equipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [formData, setFormData] = useState({ name: '', type: '', status: 'available' });

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/equipment', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEquipments(res.data);
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
      await axios.post('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/equipment', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEquipments();
      setFormData({ name: '', type: '', status: 'available' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEquipment = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/equipment/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEquipments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Equipment Management</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Equipment Name" value={formData.name} onChange={handleChange} className="border p-2" required />
            <input name="type" type="text" placeholder="Equipment Type" value={formData.type} onChange={handleChange} className="border p-2" required />
            <select name="status" value={formData.status} onChange={handleChange} className="border p-2">
              <option value="available">Available</option>
              <option value="in-use">In Use</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Equipment</button>
        </form>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {equipments.map(equipment => (
              <li key={equipment._id} className="border-b py-2 flex justify-between">
                <span>{equipment.name} - {equipment.type} - Status: {equipment.status}</span>
                <button onClick={() => deleteEquipment(equipment._id)} className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Equipment;

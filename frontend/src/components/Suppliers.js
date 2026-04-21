import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({ name: '', contact: '', products: '' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/suppliers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuppliers(res.data);
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
    const data = { ...formData, products: formData.products.split(',').map(p => p.trim()) };
    try {
      await axios.post('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/suppliers', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSuppliers();
      setFormData({ name: '', contact: '', products: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSupplier = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSuppliers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Supplier Marketplace</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Supplier Name" value={formData.name} onChange={handleChange} className="border p-2" required />
            <input name="contact" type="text" placeholder="Contact Info" value={formData.contact} onChange={handleChange} className="border p-2" required />
            <input name="products" type="text" placeholder="Products (comma separated)" value={formData.products} onChange={handleChange} className="border p-2" required />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Supplier</button>
        </form>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {suppliers.map(supplier => (
              <li key={supplier._id} className="border-b py-2 flex justify-between">
                <span>{supplier.name} - {supplier.contact} - Products: {supplier.products.join(', ')}</span>
                <button onClick={() => deleteSupplier(supplier._id)} className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;

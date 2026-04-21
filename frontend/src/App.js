import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Crops from './components/Crops';
import Soil from './components/Soil';
import Irrigation from './components/Irrigation';
import Equipment from './components/Equipment';
import Fertilizer from './components/Fertilizer';
import Yield from './components/Yield';
import Suppliers from './components/Suppliers';
import Recommendations from './components/Recommendations';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/soil" element={<Soil />} />
          <Route path="/irrigation" element={<Irrigation />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/yield" element={<Yield />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

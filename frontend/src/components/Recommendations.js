import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/recommendations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Smart Recommendations</h2>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index} className="border-b py-2 text-green-700">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000';

function History({ userId, token }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/user/${userId}/history`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTrips(res.data.trips || []))
      .catch(() => setTrips([]))
      .finally(() => setLoading(false));
  }, [userId, token]);

  if (loading) return <div className="loading">Loading trips...</div>;
  if (!trips.length) return <div className="empty">No trips yet. Plan your first trip!</div>;

  return (
    <div className="history">
      <h2>My Past Trips</h2>
      {trips.map(trip => (
        <div className="trip-card" key={trip.trip_id}>
          <h3>📍 {trip.destination}</h3>
          <div className="trip-meta">
            <span>📅 {trip.days} days</span>
            <span>💰 ${trip.budget}</span>
            {trip.plan_score && <span>⭐ {trip.plan_score}/10</span>}
            <span>🕐 {new Date(trip.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
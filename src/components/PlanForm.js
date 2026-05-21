import React, { useState } from 'react';
import axios from 'axios';

const API = 'https://trip-planner-production-4086.up.railway.app';

function PlanForm({ userId, onResult }) {
  const [query, setQuery] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [preference, setPreference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!query.trim()) { setError('Please enter a destination or query.'); return; }
    setLoading(true);
    setError('');
    try {
      const body = { query, user_id: userId };
      if (days) body.days = parseInt(days);
      if (budget) body.budget = parseFloat(budget);
      if (preference) body.preferences = [preference];
      const res = await axios.post(`${API}/plan`, body);
      onResult(res.data);
    } catch (e) {
      setError(e.response?.data?.detail || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plan-form">
      <h2>Plan Your Trip</h2>
      <div className="form-group">
        <label>What's your trip? *</label>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Skardu 5 days budget 800, I love adventure"
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Days (optional)</label>
          <input type="number" value={days} onChange={e => setDays(e.target.value)} placeholder="e.g. 5" />
        </div>
        <div className="form-group">
          <label>Budget USD (optional)</label>
          <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 800" />
        </div>
      </div>
      <div className="form-group">
        <label>Preference (optional)</label>
        <select value={preference} onChange={e => setPreference(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="adventure">Adventure</option>
          <option value="culture">Culture</option>
          <option value="nature">Nature</option>
          <option value="relaxation">Relaxation</option>
        </select>
      </div>
      <button className="btn" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Planning...' : 'Generate Itinerary'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PlanForm;
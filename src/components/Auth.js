import React, { useState } from 'react';
import axios from 'axios';

const API = 'https://trip-planner-production-4086.up.railway.app';

function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const url = mode === 'login' ? `${API}/auth/login` : `${API}/auth/register`;
      const body = mode === 'login'
        ? { email, password }
        : { email, username, password };
      const res = await axios.post(url, body);
      onLogin(res.data);
    } catch (e) {
      setError(e.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🧳 Trip Planner</h1>
        <p className="auth-subtitle">AI-powered travel planning</p>

        <div className="auth-tabs">
          <button
            className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => setMode('login')}
          >Login</button>
          <button
            className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => setMode('register')}
          >Register</button>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        {mode === 'register' && (
          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="yourname"
            />
          </div>
        )}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Auth;
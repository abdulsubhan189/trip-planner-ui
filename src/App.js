import React, { useState } from 'react';
import Auth from './components/Auth';
import PlanForm from './components/PlanForm';
import Itinerary from './components/Itinerary';
import History from './components/History';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('plan');
  const [result, setResult] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setResult(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🧳 Trip Planner</h1>
        <div className="header-user">
          <span>👤 {user.username || user.email}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'plan' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('plan')}
        >Plan a Trip</button>
        <button
          className={activeTab === 'history' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('history')}
        >My Trips</button>
      </nav>

      <main className="main">
        {activeTab === 'plan' && (
          <>
            <PlanForm userId={user.user_id} token={user.token} onResult={setResult} />
            {result && <Itinerary result={result} userId={user.user_id} token={user.token} />}
          </>
        )}
        {activeTab === 'history' && (
          <History userId={user.user_id} token={user.token} />
        )}
      </main>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import PlanForm from './components/PlanForm';
import Itinerary from './components/Itinerary';
import History from './components/History';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('plan');
  const [result, setResult] = useState(null);
  const [userId] = useState('user_001');

  return (
    <div className="app">
      <header className="header">
        <h1>🧳 Trip Planner</h1>
        <p>AI-powered travel planning</p>
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
            <PlanForm userId={userId} onResult={setResult} />
            {result && <Itinerary result={result} userId={userId} />}
          </>
        )}
        {activeTab === 'history' && (
          <History userId={userId} />
        )}
      </main>
    </div>
  );
}

export default App;
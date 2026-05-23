import React from 'react';

const TYPE_EMOJI = {
  adventure: '🏔️',
  nature: '🌿',
  culture: '🏛️',
  shopping: '🛍️',
  food: '🍽️',
  relaxation: '😌',
  sightseeing: '📸',
};

function Itinerary({ result, userId, token }) {
  if (!result || !result.daily_plans) return null;

  const totalActivities = result.daily_plans.reduce((s, d) => s + d.total_cost, 0);
  const weather = result.weather || {};

  return (
    <div className="itinerary">

      {/* Header */}
      <div className="itin-header">
        <div>
          <h2>📍 {result.destination} — {result.days} days</h2>
          <p className="itin-weather">
            🌤️ {weather.condition} · {weather.temp_c}°C
          </p>
        </div>
        {result.plan_score && (
          <span className="score">⭐ {result.plan_score}/10</span>
        )}
      </div>

      {/* Budget Overview */}
      <div className="budget-section">
        <h3>💰 Budget Breakdown</h3>
        <div className="budget-grid">
          <div className="budget-item">
            <div className="label">Total Budget</div>
            <div className="value">${result.budget}</div>
          </div>
          <div className="budget-item">
            <div className="label">Activities</div>
            <div className="value">${totalActivities.toFixed(0)}</div>
          </div>
          <div className="budget-item">
            <div className="label">Status</div>
            <div className="value">{result.budget_status}</div>
          </div>
        </div>

        {/* Estimated Hotel & Flight */}
        <div className="est-costs">
          <div className="est-item">🏨 Hotel (est.) <span>${(result.budget * 0.25).toFixed(0)}</span></div>
          <div className="est-item">✈️ Flights (est.) <span>${(result.budget * 0.15).toFixed(0)}</span></div>
          <div className="est-item">🍜 Food (est.) <span>${(result.budget * 0.20).toFixed(0)}</span></div>
          <div className="est-item">🚗 Transport (est.) <span>${(result.budget * 0.10).toFixed(0)}</span></div>
          <div className="est-item">🆘 Emergency <span>${(result.budget * 0.10).toFixed(0)}</span></div>
        </div>
      </div>

      {/* Daily Plans */}
      <h3>📅 Daily Itinerary</h3>
      {result.daily_plans.map(day => (
        <div className="day-card" key={day.day_number}>
          <div className="day-header">
            <span>{day.title}</span>
            <span className="day-cost">
              {day.total_cost > 0 ? `$${day.total_cost}` : 'Free day'}
            </span>
          </div>
          {day.activities.map((act, i) => (
            <div className="activity" key={i}>
              <div className="act-left">
                <span className="act-emoji">
                  {TYPE_EMOJI[act.activity_type] || '📌'}
                </span>
                <div>
                  <div className="activity-name">{act.name}</div>
                  <div className="activity-type">
                    {act.activity_type} · {act.duration_hours}h
                  </div>
                </div>
              </div>
              <div className={`activity-cost ${act.estimated_cost === 0 ? 'free' : ''}`}>
                {act.estimated_cost === 0 ? 'Free' : `$${act.estimated_cost}`}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Summary */}
      <div className="itin-summary">
        <div className="summary-row">
          <span>Activities total</span>
          <span>${totalActivities.toFixed(0)}</span>
        </div>
        <div className="summary-row">
          <span>Estimated full trip cost</span>
          <span>${result.budget}</span>
        </div>
        {result.overall_notes && result.overall_notes.map((note, i) => (
          <p key={i} className="summary-note">• {note}</p>
        ))}
      </div>

    </div>
  );
}

export default Itinerary;
import React from 'react';

function Itinerary({ result }) {
  if (!result || !result.daily_plans) return null;
  const alloc = result.budget_allocation || {};

  return (
    <div className="itinerary">
      <div className="itinerary-header">
        <h2>📍 {result.destination} — {result.days} days</h2>
        {result.plan_score && (
          <span className="score">⭐ {result.plan_score}/10</span>
        )}
      </div>

      {Object.keys(alloc).length > 0 && (
        <div className="budget-grid">
          {Object.entries(alloc).map(([key, val]) => (
            <div className="budget-item" key={key}>
              <div className="label">{key}</div>
              <div className="value">${val}</div>
            </div>
          ))}
        </div>
      )}

      {result.daily_plans.map(day => (
        <div className="day-card" key={day.day_number}>
          <div className="day-header">{day.title} — ${day.total_cost}</div>
          {day.activities.map((act, i) => (
            <div className="activity" key={i}>
              <div>
                <div className="activity-name">{act.name}</div>
                <div className="activity-type">{act.activity_type} · {act.duration_hours}h</div>
              </div>
              <div className="activity-cost">
                {act.estimated_cost === 0 ? 'Free' : `$${act.estimated_cost}`}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Itinerary;
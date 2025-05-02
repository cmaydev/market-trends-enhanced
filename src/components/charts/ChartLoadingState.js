// src/components/charts/ChartLoadingState.js
import React from 'react';

const ChartLoadingState = () => (
  <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <div className="spinner-border text-primary mb-3" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="text-muted">Loading chart data...</p>
  </div>
);

export default ChartLoadingState;
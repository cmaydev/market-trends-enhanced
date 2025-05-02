// src/components/charts/EnhancedChart.js
import React from 'react';

const EnhancedChart = ({ data }) => {
  if (!data || !data.prices || data.prices.length === 0) {
    return <div className="text-center">No data available</div>;
  }

  const max = Math.max(...data.prices);
  const min = Math.min(...data.prices);
  const range = max - min;
  
  // Add padding to min and max for better visualization
  const paddedMin = min - (range * 0.05);
  const paddedMax = max + (range * 0.05);
  const paddedRange = paddedMax - paddedMin;
  
  // Calculate price ticks for y-axis
  const calculatePriceTicks = () => {
    const ticks = [];
    const numberOfTicks = 5;
    const tickInterval = paddedRange / (numberOfTicks - 1);
    
    for (let i = 0; i < numberOfTicks; i++) {
      ticks.push(Math.round((paddedMin + (tickInterval * i)) * 100) / 100);
    }
    
    return ticks;
  };
  
  const priceTicks = calculatePriceTicks();

  return (
    <div className="chart-container" style={{ position: 'relative', height: '250px' }}>
      {/* Y-axis labels */}
      <div className="y-axis" style={{ 
        position: 'absolute', 
        left: 0, 
        top: 0, 
        bottom: 0, 
        width: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid #eee',
        paddingRight: '5px'
      }}>
        {priceTicks.reverse().map((tick, i) => (
          <div key={i} style={{ 
            textAlign: 'right', 
            fontSize: '10px', 
            color: '#666',
            paddingRight: '5px'
          }}>
            ${tick}
          </div>
        ))}
      </div>
      
      {/* Chart area */}
      <div style={{ 
        marginLeft: '50px', 
        height: '250px', 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between'
      }}>
        {data.prices.map((price, index) => {
          const height = ((price - paddedMin) / paddedRange) * 220;
          const isPositiveChange = parseFloat(data.change) >= 0;
          const color = isPositiveChange ? '#28a745' : '#dc3545';
          const barWidth = data.prices.length > 100 ? '1px' : data.prices.length > 30 ? '2px' : '4px';
          const marginRight = data.prices.length > 100 ? '0px' : '1px';
          
          // Determine which indices to show on the x-axis based on time frame
          const showLabel = 
            (data.timeFrame === '1D' && index % 4 === 0) ||
            (data.timeFrame === '1W' && index % 1 === 0) || 
            (data.timeFrame === '1M' && index % 5 === 0) ||
            (data.timeFrame === '3M' && index % 15 === 0) ||
            (data.timeFrame === '1Y' && index % 40 === 0);
            
          // For the first and last point, always show label
          const isFirstOrLast = index === 0 || index === data.prices.length - 1;
          
          return (
            <div 
              key={index} 
              style={{ 
                height: `${height}px`, 
                width: barWidth,
                backgroundColor: color,
                opacity: 0.8,
                marginRight: marginRight,
                borderRadius: '0',
                position: 'relative'
              }}
              title={`${data.dates[index]}: $${price}`}
            >
              {/* Add a visible dot for the current price (last price) */}
              {index === data.prices.length - 1 && (
                <div style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  top: '-3px',
                  left: '-1px',
                  border: '1px solid white',
                  zIndex: 2
                }} />
              )}
              
              {/* X-axis labels */}
              {(showLabel || isFirstOrLast) && (
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-15px',
                  fontSize: '10px',
                  width: '30px',
                  textAlign: 'center',
                  color: '#666'
                }}>
                  {data.timeFrame === '1D' 
                    ? data.dates[index] 
                    : data.dates[index].split(' ')[0]
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current price indicator */}
      <div style={{
        position: 'absolute',
        right: '10px',
        top: '10px',
        backgroundColor: parseFloat(data.change) >= 0 ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: parseFloat(data.change) >= 0 ? '#28a745' : '#dc3545'
      }}>
        ${data.prices[data.prices.length - 1]}
      </div>
      
      {/* Grid lines */}
      {priceTicks.map((tick, index) => {
        const yPosition = 250 - ((tick - paddedMin) / paddedRange * 220);
        return (
          <div key={index} style={{
            position: 'absolute',
            left: '50px',
            right: '0',
            top: `${yPosition}px`,
            borderTop: '1px dashed #eee',
            zIndex: -1
          }} />
        );
      })}
    </div>
  );
};

export default EnhancedChart;
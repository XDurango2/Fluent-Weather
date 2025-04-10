import React, { forwardRef } from 'react';
import { Stack, Text, Icon } from '@fluentui/react';
import { Card } from '@fluentui/react-card';
import { weatherIconMap } from './utils';

const HourlyForecast = forwardRef(({ hourlyData = [], convertTemp, temperatureUnit, darkMode }, ref) => {
  return (
    <div 
      ref={ref}
      style={{ 
        overflowX: 'hidden',
        width: '100%',
        whiteSpace: 'nowrap',
        scrollBehavior: 'smooth',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        '::-webkit-scrollbar': { display: 'none' }
      }}
    >
      <Stack 
        horizontal 
        tokens={{ childrenGap: 10 }}
        style={{
          display: 'inline-flex',
          padding: '10px 0'
        }}
      >
        {hourlyData.map((hour, index) => (
          <Card 
            key={index} 
            className="card-animation" 
            style={{ 
              width: 120,
              flex: '0 0 auto',
              padding: '10px',
              margin: '0 5px'
            }}
          >
            <Text variant="medium" style={{ fontWeight: 'bold' }}>
              {new Date(hour.dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Icon 
              iconName={weatherIconMap[hour.weather[0].description] || 'Weather'} // Cambiado aquí
              style={{ 
                fontSize: 32,
                color: darkMode ? '#00b7ff' : '#0078d4',
                margin: '8px 0'
              }} 
            />
            <Text>
              {Math.round(convertTemp(hour.temp))}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
            </Text>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
              <Icon 
                iconName="Drop" 
                style={{ 
                  fontSize: 16,
                  color: darkMode ? '#00b7ff' : '#0078d4'
                }}
              />
              <Text>{Math.round(hour.humidity)}%</Text>
            </Stack>
          </Card>
        ))}
      </Stack>
    </div>
  );
});

HourlyForecast.displayName = 'HourlyForecast';

export default HourlyForecast;
import React from 'react';
import { Stack, Text, Icon } from '@fluentui/react';
import { weatherIconMap, getWindDirectionAngle } from './utils.js';
import { Card } from '@fluentui/react-card';

const HourlyForecast = ({ hourlyData = [] }) => {
  return (
    <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
      {hourlyData.map((hour, index) => (
        <Card key={index} className="card-animation" style={{ width: 120, margin: 10 }}>
          <Text variant="medium" style={{ fontWeight: 'bold' }}>
            {new Date(hour.dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Icon
            iconName={weatherIconMap[hour.weather?.[0]?.icon] || 'Unknown'}
            style={{ fontSize: 32, color: '#0078d4' }}
          />
          <Text>{Math.round(hour.temp)}°C</Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
            <Icon
              iconName="Up"
              className="wind-icon"
              style={{
                fontSize: 16,
                transform: `rotate(${getWindDirectionAngle(hour.wind_deg)}deg)`,
                color: '#0078d4',
              }}
            />
            <Text>{Math.round(hour.wind_speed)} km/h</Text>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

export default HourlyForecast;

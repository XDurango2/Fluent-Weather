import React from 'react';
import { Stack, Text, Icon } from '@fluentui/react';
import { weatherIconMap, getWindDirectionAngle } from './utils.js';
import { Card } from '@fluentui/react-card';

const HourlyForecast = ({ hourlyData }) => {
  return (
    <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
      {hourlyData.map(hour => (
        <Card key={hour.key} className="card-animation" style={{ width: 120, margin: 10 }}>
          <Text variant="medium" style={{ fontWeight: 'bold' }}>{hour.time}</Text>
          <Icon iconName={weatherIconMap[hour.condition]} style={{ fontSize: 32, color: '#0078d4' }} />
          <Text>{hour.temperature}°C</Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
            <Icon
              iconName="Up"
              className='wind-icon'
              style={{
                fontSize: 16,
                transform: `rotate(${getWindDirectionAngle(hour.windDirection)}deg)`,
                color: '#0078d4',
              }}
            />
            <Text>{hour.windSpeed} km/h</Text>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

export default HourlyForecast;

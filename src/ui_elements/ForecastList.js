import React from 'react';
import { Stack, Text, Icon } from '@fluentui/react';
import { weatherIconMap } from './utils';
import { Card } from '@fluentui/react-card';

const ForecastList = ({ forecast, handleForecastClick }) => {
  return (
    <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
      {forecast.map(day => (
        <Card
          key={day.key}
          className="card-animation"
          style={{ width: 150, margin: 10 }}
          onClick={() => handleForecastClick(day)}
        >
          <Text variant="medium" style={{ fontWeight: 'bold' }}>{day.date}</Text>
          <Icon iconName={weatherIconMap[day.condition]} style={{ fontSize: 32, color: '#0078d4' }} />
          <Text>{day.condition.charAt(0).toUpperCase() + day.condition.slice(1)}</Text>
          <Text>Máx: {day.high}°C</Text>
          <Text>Mín: {day.low}°C</Text>
        </Card>
      ))}
    </Stack>
  );
};

export default ForecastList;

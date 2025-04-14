import React from 'react';
import { Stack, Text, Icon } from '@fluentui/react';
import { weatherIconMap } from './utils';
import { Card } from '@fluentui/react-card';

const getWindDirectionAngle = (direction) => {
  const directions = {
    'Norte': 0,
    'Noreste': 45,
    'Este': 90,
    'Sureste': 135,
    'Sur': 180,
    'Suroeste': 225,
    'Oeste': 270,
    'Noroeste': 315,
  };
  return directions[direction] || 0; // Devuelve 0 si la dirección no coincide
};

const ForecastList = ({ forecast = [], handleForecastClick,  temperatureField, // Añadir estas props
  temperatureUnit,
  windUnit }) => {
  return (
    <Stack horizontal tokens={{ childrenGap: 20 }} wrap>
      {forecast.map((day, index) => (
        <Card
          key={index}
          className="card-animation"
          style={{ width: 150, margin: 10 }}
          onClick={() => handleForecastClick(day)}
        >
          <Text variant="medium" style={{ fontWeight: 'bold' }}>{new Date(day.dt).toLocaleDateString()}</Text>
          <Icon iconName={weatherIconMap[day.weather[0]?.icon] || 'Unknown'} style={{ fontSize: 32, color: '#0078d4' }} />
          <Text>{day.weather[0]?.description.charAt(0).toUpperCase() + day.weather[0]?.description.slice(1)}</Text>
          <Text>
            Máx: {Math.round(day[temperatureField].max)}°
            {temperatureUnit === 'celsius' ? 'C' : 'F'}
          </Text>
          <Text>
            Mín: {Math.round(day[temperatureField].min)}°
            {temperatureUnit === 'celsius' ? 'C' : 'F'}
          </Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }} style={{ marginTop: 10 }}>
            <Icon
              iconName="Up"
              style={{
                fontSize: 16,
                transform: `rotate(${getWindDirectionAngle(day.wind_deg)}deg)`,
                color: '#0078d4',
              }}
              aria-label={`Dirección del viento: ${day.wind_deg}`}
            />
            <Text>{Math.round(day.wind_speed)} km/h</Text>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

export default ForecastList;
import React from 'react';
import { Stack, Text, Icon } from '@fluentui/react';
import { airQualityIconMap, weatherIconMap, getWindDirectionAngle } from './utils';

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) {
    return <Text>No weather data available</Text>;
  }

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };

  return (
    <Stack style={{ padding: 20, backgroundColor: '#F3F2F1', borderRadius: 4 }}>
      <Text variant="xLarge">{weatherData.location || 'Unknown Location'}</Text>
      <Stack horizontal style={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <Stack>
          <Text style={{ fontSize: 48, fontWeight: 'bold', marginRight: 20 }}>
            {weatherData.temperature ?? 'N/A'}°C
          </Text>
          <Text variant="large">{capitalizeFirstLetter(weatherData.condition)}</Text>
          <Text variant="medium">Viento: {weatherData.windSpeed ?? 'N/A'} km/h</Text>
          <Text variant="medium">Dirección: {weatherData.windDirection || 'N/A'}</Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Icon 
              iconName={airQualityIconMap[weatherData.airQuality] || 'Unknown'} 
              style={{ fontSize: 20, color: '#0078d4' }} 
              aria-label={weatherData.airQuality || 'Unknown'} 
            />
            <Text variant="medium">Calidad del aire: {weatherData.airQuality || 'N/A'}</Text>
          </Stack>
        </Stack>
        <Icon 
          iconName={weatherIconMap[weatherData.condition] || 'Weather'} 
          style={{ fontSize: 64, color: '#0078d4' }} 
          aria-label={weatherData.condition || 'Unknown weather condition'} 
        />
      </Stack>
    </Stack>
  );
};

export default WeatherInfo;
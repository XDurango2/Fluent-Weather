import React from 'react';
import { Stack, Text, Icon } from '@fluentui/react';
import { airQualityIconMap, weatherIconMap, getWindDirectionAngle } from './utils';

const WeatherInfo = ({ weatherData }) => {
  return (
    <Stack style={{ padding: 20, backgroundColor: '#F3F2F1', borderRadius: 4 }}>
      <Text variant="xLarge">{weatherData.location}</Text>
      <Stack horizontal style={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <Stack>
          <Text style={{ fontSize: 48, fontWeight: 'bold', marginRight: 20 }}>
            {weatherData.temperature}°C
          </Text>
          <Text variant="large">{weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1)}</Text>
          <Text variant="medium">Viento: {weatherData.windSpeed} km/h</Text>
          <Text variant="medium">Dirección: {weatherData.windDirection}</Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Icon 
              iconName={airQualityIconMap[weatherData.airQuality]} 
              style={{ fontSize: 20, color: '#0078d4' }} 
              aria-label={weatherData.airQuality} 
            />
            <Text variant="medium">Calidad del aire: {weatherData.airQuality}</Text>
          </Stack>
        </Stack>
        <Icon 
          iconName={weatherIconMap[weatherData.condition]} 
          style={{ fontSize: 64, color: '#0078d4' }} 
          aria-label={weatherData.condition} 
        />
      </Stack>
    </Stack>
  );
};

export default WeatherInfo;

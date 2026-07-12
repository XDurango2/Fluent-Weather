import React, {useState} from 'react';
import { Stack, Text, Icon, Panel, PanelType } from '@fluentui/react';
import {
  weatherIconMap,
  getWindDirectionAngle,
} from './utils';
import CityBackground from '../components/cityBackground';

const WeatherInfo = ({
  weatherData,
  darkMode,
  temperatureUnit,
  windUnit,
}) => {
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  if (!weatherData) {
    return <Text>No weather data available</Text>;
  }
  
  const getWeatherIcon = (condition) => {
    const iconName = weatherIconMap[condition] || 'ErrorBadge';
    return iconName;
  };
  
  const renderWeatherDetails = () => {
    const current = weatherData.current;
    return (
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Sensación térmica:</Text>
          <Text>
            {temperatureUnit === 'celsius' ? 
              `${Math.round(current.feelslike_c)}°C` : 
              `${Math.round(current.feelslike_f)}°F`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Humedad:</Text>
          <Text>{current.humidity}%</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Presión:</Text>
          <Text>{current.pressure_mb} mb</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Visibilidad:</Text>
          <Text>
            {windUnit === 'kmh' ? `${current.vis_km} km` : `${current.vis_miles} mi`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Índice UV:</Text>
          <Text>{current.uv}</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Precipitación:</Text>
          <Text>
            {windUnit === 'kmh' ? `${current.precip_mm} mm` : `${current.precip_in} in`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Nubosidad:</Text>
          <Text>{current.cloud}%</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Ráfagas de viento:</Text>
          <Text>
            {windUnit === 'kmh' ? 
              `${current.gust_kph} km/h` : 
              `${current.gust_mph} mph`}
          </Text>
        </Stack>
      </Stack>
    );
  };
  
  return (
    <CityBackground
      cityName={[weatherData.location.name, weatherData.location.region, weatherData.location.country]
        .filter(Boolean)
        .join(', ')}
      darkMode={darkMode}
      CurrentCondition={weatherData.current.condition.text}
    >
      <Stack
        style={{
          padding: 'clamp(12px, 4vw, 24px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 4,
          color: darkMode ? '#ffffff' : '#000000',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Icon 
            iconName="Location" 
            style={{ fontSize: 24, color: darkMode ? '#00b7ff' : '#0078d4' }} 
          />
          <Text variant="xLarge">
            {weatherData.location.name}, {weatherData.location.country}
          </Text>
          <Text variant="mediumPlus"> (Pronóstico Actual) </Text>
        </Stack>

        <Stack horizontal style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <Text style={{ fontSize: 'clamp(40px, 12vw, 72px)', fontWeight: 'bold' }}>
                {temperatureUnit === 'celsius' ?
                  `${weatherData.current.temp_c}°C` :
                  `${weatherData.current.temp_f}°F`}
              </Text>
              <Icon
                iconName={getWeatherIcon(weatherData.current.condition.text)}
                style={{
                  fontSize: 'clamp(28px, 8vw, 48px)',
                  color: darkMode ? '#00b7ff' : '#0078d4',
                  marginLeft: 10
                }}
              />
            </Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} style={{ marginTop: 10 }}>
              <Icon 
                iconName="MoreVertical"
                style={{ 
                  fontSize: 20, 
                  color: darkMode ? '#00b7ff' : '#0078d4',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: 20,
                  right: 10
                }}
                onClick={() => setIsDetailsPanelOpen(true)}
              />
            </Stack>
                
            <Text variant="large" style={{ marginTop: 10 }}>
              {weatherData.current.condition.text}
            </Text>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} style={{ marginTop: 10 }}>
              <Icon 
                iconName="Up"
                style={{ 
                  fontSize: 20, 
                  color: darkMode ? '#00b7ff' : '#0078d4',
                  transform: `rotate(${getWindDirectionAngle(weatherData.current.wind_dir)}deg)`,
                  transition: 'transform 0.3s ease'
                }} 
              />
              <Text>
                {windUnit === 'kmh' ? 
                  `${weatherData.current.wind_kph} km/h` : 
                  `${weatherData.current.wind_mph} mph`}
              </Text>
            </Stack>

            <Panel
              isOpen={isDetailsPanelOpen}
              onDismiss={() => setIsDetailsPanelOpen(false)}
              headerText="Detalles del Pronóstico"
              type={PanelType.Small}
              closeButtonAriaLabel="Cerrar"
              styles={{
                main: {
                  backgroundColor: darkMode ? '#202020' : '#F3F2F1',
                  color: darkMode ? '#ffffff' : '#000000'
                }
              }}
            >
              {renderWeatherDetails()}
            </Panel>
          </Stack>
        </Stack>
      </Stack>
    </CityBackground>
  );
};

export default WeatherInfo;
import React, {useState} from 'react';
import { Stack, Text, Icon, Panel, PanelType } from '@fluentui/react';
import { 
  airQualityIconMap, 
  weatherIconMap, 
  getWindDirectionAngle, 
  getAirQualityLabel 
} from './utils';

const WeatherInfo = ({ weatherData, darkMode }) => {
  const [isAirQualityPanelOpen, setIsAirQualityPanelOpen] = useState(false);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  if (!weatherData) {
    return <Text>No weather data available</Text>;
  }

  const getWeatherIcon = (condition) => {
    //console.log('Weather condition:', condition); // Para depuración
    const iconName = weatherIconMap[condition] || 'ErrorBadge'; // Usa un ícono claro si no se encuentra
    //console.log('Icon name:', iconName); // Para depuración
    return iconName;
  };
  const renderWeatherDetails = () => {
    const current = weatherData.current;
    return (
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Sensación térmica:</Text>
          <Text>{current.feelslike_c}°C</Text>
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
          <Text>{current.vis_km} km</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Índice UV:</Text>
          <Text>{current.uv}</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Precipitación:</Text>
          <Text>{current.precip_mm} mm</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Nubosidad:</Text>
          <Text>{current.cloud}%</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Ráfagas de viento:</Text>
          <Text>{current.gust_kph} km/h</Text>
        </Stack>
      </Stack>
    );
  };
  const renderAirQualityDetails = () => {
    const airQuality = weatherData.current.air_quality;
    return (
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text>CO:</Text>
          <Text>{airQuality.co.toFixed(1)} μg/m³</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>NO₂:</Text>
          <Text>{airQuality.no2.toFixed(1)} μg/m³</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>O₃:</Text>
          <Text>{airQuality.o3.toFixed(1)} μg/m³</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>SO₂:</Text>
          <Text>{airQuality.so2.toFixed(1)} μg/m³</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>PM2.5:</Text>
          <Text>{airQuality.pm2_5.toFixed(1)} μg/m³</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>PM10:</Text>
          <Text>{airQuality.pm10.toFixed(1)} μg/m³</Text>
        </Stack>
      </Stack>
    );
  };
  return (
    <Stack style={{ 
      padding: 20, 
      backgroundColor: darkMode ? '#202020' : '#F3F2F1', 
      borderRadius: 4,
      color: darkMode ? '#ffffff' : '#000000',
      position: 'relative'
    }}>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <Icon 
          iconName="Location" 
          style={{ fontSize: 20, color: darkMode ? '#00b7ff' : '#0078d4' }} 
        />
        <Text variant="xLarge">
          {weatherData.location.name}, {weatherData.location.country}
        </Text>
      </Stack>

      <Stack horizontal style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
        <Stack>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text style={{ fontSize: 48, fontWeight: 'bold' }}>
              {weatherData.current.temp_c}°C
            </Text>
            <Icon 
              iconName={getWeatherIcon(weatherData.current.condition.text)} 
              style={{ 
                fontSize: 48, 
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
                right: 10,
              ':hover': { opacity: 0.8 } // Cambiado aquí
              }}
              onClick={() => setIsDetailsPanelOpen(true)}
            />
            
          </Stack>
              
          <Text variant="large" style={{ marginTop: 10 }}>
            {weatherData.current.condition.text}
          </Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} style={{ marginTop: 10 }}>
            <Icon 
              iconName="Up"  // Siempre usamos el icono Up
              style={{ 
                fontSize: 20, 
                color: darkMode ? '#00b7ff' : '#0078d4',
                transform: `rotate(${getWindDirectionAngle(weatherData.current.wind_dir)}deg)`,
                transition: 'transform 0.3s ease' // Añade una transición suave
              }} 
            />
            <Text>
              {weatherData.current.wind_kph} km/h
            </Text>
          </Stack>
{weatherData.current.air_quality && (
  <>
    <Stack 
      horizontal 
      verticalAlign="center" 
      tokens={{ childrenGap: 10 }} 
      style={{ 
        marginTop: 10,
        cursor: 'pointer',
        ':hover': { opacity: 0.8 }
      }}
      onClick={() => setIsAirQualityPanelOpen(true)}
    >
      <Icon 
        iconName={airQualityIconMap[weatherData.current.air_quality['us-epa-index']]} 
        style={{ fontSize: 20, color: darkMode ? '#00b7ff' : '#0078d4' }} 
      />
      <Text variant="medium">
        Calidad del aire: {getAirQualityLabel(weatherData.current.air_quality['us-epa-index'])}
      </Text>
    </Stack>

        <Panel
          isOpen={isAirQualityPanelOpen}
          onDismiss={() => setIsAirQualityPanelOpen(false)}
          headerText="Detalles de Calidad del Aire"
          type={PanelType.medium}
          closeButtonAriaLabel="Cerrar"
          styles={{
            main: {
              backgroundColor: darkMode ? '#202020' : '#F3F2F1',
              color: darkMode ? '#ffffff' : '#000000'
            }
          }}
        >
          {renderAirQualityDetails()}
        </Panel>
      </>
    )}

      <Panel
            isOpen={isDetailsPanelOpen}
            onDismiss={() => setIsDetailsPanelOpen(false)}
            headerText="Detalles del Pronóstico"
            type={PanelType.medium}
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
  );
};

export default WeatherInfo;
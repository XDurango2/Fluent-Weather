import React, { forwardRef, useState } from 'react';
import { Stack, Text, Icon, Panel, PanelType } from '@fluentui/react';
import { Card } from '@fluentui/react-card';
import { getNormalizedWeatherIcon, weatherIconMap } from './utils';

const HourlyForecast = forwardRef(({ 
  hourlyData = [], 
  temperatureUnit, 
  windUnit, 
  darkMode 
}, ref) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  // Definir función de conversión localmente para evitar dependencias externas
  const convertTemp = (temp) => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    // Create a new Date object directly from the ISO string
    // The API format "2025-04-13 00:00" needs to be converted to "2025-04-13T00:00"
    const dateTime = new Date(timeString.replace(' ', 'T'));
    
    // Check if the date is valid
    if (isNaN(dateTime.getTime())) {
      console.error('Invalid date format:', timeString);
      return '';
    }
    
    return dateTime;
  };

  const renderHourDetails = () => {
    if (!selectedHour) return null;

    return (
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Temperatura:</Text>
          <Text>
            {temperatureUnit === 'celsius' ? 
              `${Math.round(selectedHour.temp)}°C` : 
              `${Math.round(selectedHour.temp_f || convertTemp(selectedHour.temp))}°F`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Sensación térmica:</Text>
          <Text>
            {temperatureUnit === 'celsius' ? 
              `${Math.round(selectedHour.feelslike_c)}°C` : 
              `${Math.round(selectedHour.feelslike_f || convertTemp(selectedHour.feelslike_c))}°F`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Humedad:</Text>
          <Text>{selectedHour.humidity}%</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Viento:</Text>
          <Text>
            {windUnit === 'kmh' ? 
              `${selectedHour.wind_kph} km/h` : 
              `${selectedHour.wind_mph} mph`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Dirección del viento:</Text>
          <Text>{selectedHour.wind_dir}</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Presión:</Text>
          <Text>{selectedHour.pressure_mb} mb</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Precipitación:</Text>
          <Text>
            {windUnit === 'kmh' ? 
              `${selectedHour.precip_mm} mm` : 
              `${selectedHour.precip_in} in`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Probabilidad de lluvia:</Text>
          <Text>{selectedHour.chance_of_rain}%</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Nubosidad:</Text>
          <Text>{selectedHour.cloud}%</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Visibilidad:</Text>
          <Text>
            {windUnit === 'kmh' ? 
              `${selectedHour.vis_km} km` : 
              `${selectedHour.vis_miles} mi`}
          </Text>
        </Stack>
      </Stack>
    );
  };

  return (
    <div ref={ref} style={{ 
      overflowX: 'auto',
      width: '100%',
      whiteSpace: 'nowrap',
      scrollBehavior: 'smooth',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      <Stack horizontal tokens={{ childrenGap: 10 }} style={{
        display: 'inline-flex',
        padding: '10px 0'
      }}>
        {hourlyData.map((hour, index) => {
          // Comprobación de seguridad para acceder a los datos
          const temperature = hour.temp;
          const description = hour.weather && hour.weather[0] ? hour.weather[0].description : '';
          const humidity = hour.humidity;
          const time = hour.time;

          return (
            <Card 
              key={index} 
              className="card-animation" 
              style={{ 
                width: 120,
                flex: '0 0 auto',
                padding: '10px',
                margin: '0 5px',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedHour(hour);
                setIsDetailsPanelOpen(true);
              }}
            >
              <Text variant="medium" style={{ fontWeight: 'bold' }}>
                {time ? formatTime(time).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                }) : 'N/A'}
              </Text>
              <Icon 
                iconName={getNormalizedWeatherIcon(description)}
                style={{ 
                  fontSize: 32,
                  color: darkMode ? '#00b7ff' : '#0078d4',
                  margin: '8px 0'
                }} 
              />
              <Text>
                {temperature !== undefined ? 
                  `${convertTemp(temperature)}°${temperatureUnit === 'celsius' ? 'C' : 'F'}` : 
                  'N/A'}
              </Text>
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
                <Icon 
                  iconName="Drop" 
                  style={{ 
                    fontSize: 16,
                    color: darkMode ? '#00b7ff' : '#0078d4'
                  }}
                />
                <Text>{humidity !== undefined ? `${Math.round(humidity)}%` : 'N/A'}</Text>
              </Stack>
            </Card>
          );
        })}
      </Stack>

      <Panel
        isOpen={isDetailsPanelOpen}
        onDismiss={() => setIsDetailsPanelOpen(false)}
        headerText={selectedHour && selectedHour.time ? 
          `Pronóstico para las ${formatTime(selectedHour.time).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
          })}` : 
          'Detalles del pronóstico'
        }
        type={PanelType.medium}
        closeButtonAriaLabel="Cerrar"
        styles={{
          main: {
            backgroundColor: darkMode ? '#202020' : '#F3F2F1',
            color: darkMode ? '#ffffff' : '#000000'
          }
        }}
      >
        {renderHourDetails()}
      </Panel>
    </div>
  );
});

HourlyForecast.displayName = 'HourlyForecast';

export default HourlyForecast;
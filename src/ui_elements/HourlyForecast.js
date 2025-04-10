import React, { forwardRef,useState } from 'react';
import { Stack, Text, Icon,Panel,PanelType } from '@fluentui/react';
import { Card } from '@fluentui/react-card';
import { weatherIconMap } from './utils';

const HourlyForecast = forwardRef(({ hourlyData = [], convertTemp, temperatureUnit, windUnit, darkMode }, ref) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const renderHourDetails = () => {
    if (!selectedHour) return null;

    return (
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Temperatura:</Text>
          <Text>
            {Math.round(convertTemp(selectedHour.temp))}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Sensación térmica:</Text>
          <Text>
            {Math.round(convertTemp(selectedHour.feelslike_c))}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
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
      overflowX: 'hidden',
      width: '100%',
      whiteSpace: 'nowrap',
      scrollBehavior: 'smooth',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
      '::-webkit-scrollbar': { display: 'none' }
    }}>
      <Stack horizontal tokens={{ childrenGap: 10 }} style={{
        display: 'inline-flex',
        padding: '10px 0'
      }}>
        {hourlyData.map((hour, index) => (
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
              {new Date(hour.dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Icon 
              iconName={weatherIconMap[hour.weather[0].description] || 'Weather'}
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

      <Panel
        isOpen={isDetailsPanelOpen}
        onDismiss={() => setIsDetailsPanelOpen(false)}
        headerText={selectedHour ? 
          `Pronóstico para las ${new Date(selectedHour.dt).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
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
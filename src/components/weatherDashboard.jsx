// src/components/WeatherDashboard.jsx
import React, { useRef, useState } from 'react';
import { Stack, Text, IconButton } from '@fluentui/react';
import WeatherInfo from '../ui_elements/weather_info.js';
import HourlyForecast from '../ui_elements/HourlyForecast';
import ForecastList from '../ui_elements/ForecastList';
import ForecastDetailPanel from '../ui_elements/ForecastDetailPanel';
import UVScale from '../ui_elements/UV_scale.js';
import UVHourly from '../ui_elements/UV_hourly.js';

const WeatherDashboard = ({
  weatherData,
  darkMode,
  temperatureUnit,
  windUnit,
  showUVPanel
}) => {
  const [selectedForecast, setSelectedForecast] = useState(null);
  const hourlyForecastRef = useRef(null);
  
  const scrollLeft = () => {
    if (hourlyForecastRef.current) {
      const clientWidth = hourlyForecastRef.current.clientWidth;
      const scrollAmount = Math.min(clientWidth, 300);
      hourlyForecastRef.current.scrollLeft -= scrollAmount;
    }
  };
  
  const scrollRight = () => {
    if (hourlyForecastRef.current) {
      const clientWidth = hourlyForecastRef.current.clientWidth;
      const scrollAmount = Math.min(clientWidth, 300);
      hourlyForecastRef.current.scrollLeft += scrollAmount;
    }
  };

  // Función local para convertir temperatura
  const convertTemp = (temp, unit) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  // Función local para convertir viento
  const convertWind = (speed, unit) => {
    if (unit === 'mph') {
      return Math.round(speed / 1.60934);
    }
    return Math.round(speed);
  };

  if (!weatherData) return null;

  return (
    <>
      <div style={{ transition: 'all 0.5s ease' }}>
        <WeatherInfo 
          weatherData={weatherData} 
          darkMode={darkMode} 
          temperatureUnit={temperatureUnit}
          windUnit={windUnit}
        />
      </div>

      <Stack style={{ marginTop: 20, transition: 'all 0.5s ease' }}>
        <Text variant="large">Pronóstico por Hora</Text>
        <Stack horizontal>
          <IconButton 
            iconProps={{ iconName: 'ChevronLeft' }} 
            onClick={scrollLeft}
            styles={{
              root: {
                height: 'fit-content',
                alignSelf: 'center',
                transition: 'background-color 0.3s ease',
              }
            }}
          />
          <HourlyForecast 
            ref={hourlyForecastRef}
            hourlyData={weatherData?.hourly || []} 
            temperatureUnit={temperatureUnit}
            windUnit={windUnit}
            darkMode={darkMode}
            // Ya no pasamos convertTemp ni temperatureField
          />
          <IconButton 
            iconProps={{ iconName: 'ChevronRight' }} 
            onClick={scrollRight}
            styles={{
              root: {
                height: 'fit-content',
                alignSelf: 'center',
                transition: 'background-color 0.3s ease',
              }
            }}
          />
        </Stack>
      </Stack>

      <Stack style={{ marginTop: 20, transition: 'all 0.5s ease' }}>
        <Text variant="large">Pronóstico a 5 días</Text>
        <ForecastList 
            forecast={weatherData?.daily?.slice(0, 5) || []} 
            handleForecastClick={setSelectedForecast} 
            temperatureField={temperatureUnit === 'celsius' ? 'temp' : 'temp_f'}
            temperatureUnit={temperatureUnit}
        />
      </Stack>

      <ForecastDetailPanel 
        forecast={selectedForecast} 
        isOpen={!!selectedForecast} 
        onDismiss={() => setSelectedForecast(null)} 
        convertTemp={convertTemp} 
        temperatureUnit={temperatureUnit} 
        convertWind={convertWind} 
        windUnit={windUnit}
      />

      <div style={{ transition: 'all 0.5s ease' }}>
        {weatherData?.current?.uv !== undefined && <UVScale uvIndex={weatherData.current.uv} />}
      </div>
      
      {showUVPanel && weatherData?.hourly && (
        <div style={{ transition: 'all 0.5s ease' }}>
          <UVHourly 
            data={weatherData.hourly} 
            title="Índice UV por hora" 
          />
        </div>
      )}
    </>
  );
};

export default WeatherDashboard;
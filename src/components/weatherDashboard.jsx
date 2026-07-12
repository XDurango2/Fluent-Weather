// src/components/WeatherDashboard.jsx
import React, { useRef, useState } from 'react';
import { DefaultButton, Stack, Text, IconButton, Spinner, SpinnerSize } from '@fluentui/react';
import WeatherInfo from '../ui_elements/weather_info';
import WeatherAlerts from '../ui_elements/WeatherAlerts';
import HourlyForecast from '../ui_elements/HourlyForecast';
import ForecastList from '../ui_elements/ForecastList_5Days';
import ForecastDetailPanel from '../ui_elements/ForecastDetailPanel';
import UVScale from '../ui_elements/UV_scale';
import UVHourly from '../ui_elements/UV_hourly';

const WeatherDashboard = ({
  weatherData,
  extendedForecast,
  extendedForecastLoading,
  extendedForecastError,
  onRetryExtendedForecast,
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
      <WeatherAlerts alerts={weatherData?.alerts} darkMode={darkMode} />

       <div style={{ transition: 'all 0.5s ease' }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <WeatherInfo
            weatherData={weatherData} 
            darkMode={darkMode} 
            temperatureUnit={temperatureUnit}
            windUnit={windUnit}
          />
         
        </Stack>
      </div>

      <Stack style={{ marginTop: 20, transition: 'all 0.5s ease' }}>
        <Text variant="large">Pronóstico por Hora</Text>
        <Stack horizontal>
          <IconButton
            iconProps={{ iconName: 'ChevronLeft' }}
            onClick={scrollLeft}
            title="Desplazar hacia la izquierda"
            ariaLabel="Desplazar hacia la izquierda"
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
            title="Desplazar hacia la derecha"
            ariaLabel="Desplazar hacia la derecha"
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
        {extendedForecastLoading ? (
          <Spinner size={SpinnerSize.large} label="Cargando pronóstico..." />
        ) : extendedForecastError ? (
          <Stack tokens={{ childrenGap: 10 }} horizontalAlign="start">
            <Text style={{ color: 'red' }}>{extendedForecastError}</Text>
            <DefaultButton text="Reintentar" onClick={onRetryExtendedForecast} />
          </Stack>
        ) : extendedForecast?.forecast ? (
          <ForecastList
            forecast={extendedForecast.forecast}
            temperatureUnit={temperatureUnit}
            windUnit={windUnit}
            darkMode={darkMode}
            onForecastSelect={setSelectedForecast}
          />
        ) : null}
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
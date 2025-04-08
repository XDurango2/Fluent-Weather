import React, { useState, useEffect } from 'react';
import { Text,Stack, Spinner, SpinnerSize, ThemeProvider, createTheme, initializeIcons } from '@fluentui/react';
import WeatherInfo from './ui_elements/weather_info.js';
import HourlyForecast from './ui_elements/HourlyForecast';
import ForecastList from './ui_elements/ForecastList';
import ForecastDetailPanel from './ui_elements/ForecastDetailPanel';
import { airQualityIconMap, weatherIconMap, getWindDirectionAngle } from './ui_elements/utils';

// Inicializa los íconos de Fluent UI
initializeIcons();

// Tema personalizado inspirado en Fluent Design
const lightTheme = createTheme({
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#f3f9fd',
    themeLighter: '#d0e7f8',
    themeLight: '#a9d3f2',
    themeTertiary: '#5ca9e5',
    themeSecondary: '#187fd9',
    themeDarkAlt: '#006cbe',
    themeDark: '#005ba1',
    themeDarker: '#004377',
  },
});

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Madrid');
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [selectedForecast, setSelectedForecast] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = {
          location: city,
          temperature: 23,
          condition: 'clear',
          humidity: 45,
          windSpeed: 10,
          windDirection: 'Noroeste',
          airQuality: 'Buena',
          hourly: [
            { key: 1, time: '08:00', temperature: 20, condition: 'clear', windDirection: 'Noroeste', windSpeed: 10 },
            { key: 2, time: '12:00', temperature: 23, condition: 'clear', windDirection: 'Noreste', windSpeed: 12 },
            { key: 3, time: '16:00', temperature: 25, condition: 'cloudy', windDirection: 'Este', windSpeed: 15 },
            { key: 4, time: '20:00', temperature: 22, condition: 'rain', windDirection: 'Sur', windSpeed: 9 },
          ],
          forecast: [
            { key: 1, date: 'Lunes', high: 24, low: 18, condition: 'clear', windSpeed: 10, humidity: 40, pressure: 1015, airQuality: 'Buena' },
            { key: 2, date: 'Martes', high: 22, low: 17, condition: 'cloudy', windSpeed: 12, humidity: 50, pressure: 1018, airQuality: 'Moderada' },
            { key: 3, date: 'Miércoles', high: 20, low: 15, condition: 'rain', windSpeed: 8, humidity: 70, pressure: 1020, airQuality: 'Mala' },
            { key: 4, date: 'Jueves', high: 19, low: 14, condition: 'rain', windSpeed: 6, humidity: 65, pressure: 1021, airQuality: 'Muy mala' },
            { key: 5, date: 'Viernes', high: 21, low: 16, condition: 'cloudy', windSpeed: 9, humidity: 55, pressure: 1017, airQuality: 'Peligrosa' },
          ]
        };
        setWeatherData(mockData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del clima');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity);
    }
  };

  const handleForecastClick = (forecast) => {
    setSelectedForecast(forecast);
  };

  const handleClosePanel = () => {
    setSelectedForecast(null);
  };

  return (
    <ThemeProvider theme={lightTheme}>
    <Stack className="weather-app-container">
      {/* Aquí agregarías tu SearchForm */}

      {loading ? (
        <Stack horizontalAlign="center" className="loading-container">
          <Spinner size={SpinnerSize.large} label="Cargando datos del clima..." />
        </Stack>
      ) : error ? (
        <Stack className="error-container">
          <Text>{error}</Text>
        </Stack>
      ) : (
        <>
          <Text className="section-title">Pronóstico Actual</Text>
          <WeatherInfo weatherData={weatherData} />

          <Text className="section-title">Pronóstico por Hora</Text>
          <HourlyForecast hourlyData={weatherData.hourly} />

          <Text className="section-title">Pronóstico de los Próximos 5 Días</Text>
          <div className="fade-in">
            <ForecastList forecast={weatherData.forecast} handleForecastClick={handleForecastClick} />
          </div>
        </>
      )}

      {selectedForecast && (
        <div className="panel-fade-in">
          <ForecastDetailPanel selectedForecast={selectedForecast} handleClosePanel={handleClosePanel} />
        </div>
      )}
    </Stack>
  </ThemeProvider>
);
};
export default WeatherApp;
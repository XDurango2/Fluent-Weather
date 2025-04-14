import React, { useState, useEffect, useMemo } from 'react';
import { 
  IconButton, 
  Spinner, 
  SpinnerSize, 
  Stack, 
  Text, 
  ThemeProvider, 
  initializeIcons
} from '@fluentui/react';
import SearchForm from './ui_elements/search_form.js';
import Header from './components/Header.jsx';
import SettingsPanel from './components/SettingsPanel';
import CityComparison from './components/CityComparison';
import WeatherDashboard from './components/weatherDashboard';
import { lightTheme, darkTheme } from './themes.js';
import { getWeatherDataWithFallback } from './services/WeatherService.js';
import { 
  selectTemperature,
  selectWindSpeed,
  getGlobalStyles
} from './utils/weatherUtils';

initializeIcons();

const WeatherApp = () => {
  // State management
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('London');
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [windUnit, setWindUnit] = useState('kmh');
  const [showUVPanel, setShowUVPanel] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonCity, setComparisonCity] = useState('Barcelona');
  const [comparisonData, setComparisonData] = useState(null);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [comparisonError, setComparisonError] = useState(null);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  
  // And replace them with simple field selectors if needed
const temperatureField = temperatureUnit === 'celsius' ? 'temp_c' : 'temp_f';
const windField = windUnit === 'kmh' ? 'wind_kph' : 'wind_mph';
  // Get animated styles
  const globalStyles = getGlobalStyles(darkMode);

  // Fetch primary weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const data = await getWeatherDataWithFallback(city);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del clima: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [city]);

  // Fetch comparison data if needed
  useEffect(() => {
    if (!showComparison || !comparisonCity?.trim()) return;
    
    const fetchComparisonData = async () => {
      setComparisonLoading(true);
      setComparisonError(null);
      try {
        const data = await getWeatherDataWithFallback(comparisonCity);
        setComparisonData(data);
      } catch (err) {
        setComparisonError('Error al obtener datos de comparación: ' + err.message);
        console.error('Error al obtener datos de comparación:', err.message);
        setComparisonData(null);
      } finally {
        setComparisonLoading(false);
      }
    };
    fetchComparisonData();
  }, [showComparison, comparisonCity]);

  // Event handlers
  const handleSearch = () => {
    const trimmedCity = searchCity?.trim();
    if (!trimmedCity) return;
    
    // Improved validation for city names
    if (/^[\p{L}\s\-'.,()]+$/u.test(trimmedCity)) {
      setCity(trimmedCity);
      setSearchCity('');
    } else {
      setError('Formato de nombre de ciudad no válido');
    }
  };
  const handleComparisonCityChange = async (newCity) => {
    if (!newCity?.trim()) return;
    
    setComparisonLoading(true);
    setComparisonError(null);
    
    try {
      const data = await getWeatherDataWithFallback(newCity);
      setComparisonData(data);
      setComparisonCity(newCity);
    } catch (err) {
      setComparisonError('Error al obtener datos de comparación: ' + err.message);
      console.error('Error al obtener datos de comparación:', err);
      setComparisonData(null);
    } finally {
      setComparisonLoading(false);
    }
  };


  const handleToggleDarkMode = (_, checked) => setDarkMode(checked);
  const handleTemperatureUnitChange = (_, option) => setTemperatureUnit(option.key);
  const handleWindUnitChange = (_, option) => setWindUnit(option.key);
  const toggleComparison = (_, checked) => {
    setShowComparison(checked);
    if (!checked) {
      setComparisonData(null);
      setComparisonError(null);
    }
  };
  const toggleUVPanel = (_, checked) => setShowUVPanel(checked);

  // Display helper functions
  const displayTemperature = (data) => selectTemperature(data, temperatureUnit);
  const displayWindSpeed = (data) => selectWindSpeed(data, windUnit);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div style={globalStyles.rootStyle}>
        <Stack tokens={{ padding: 20 }} style={globalStyles.contentStyle}>
          <Header darkMode={darkMode} />

          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <SearchForm 
              searchCity={searchCity}
              setSearchCity={setSearchCity}
              handleSearch={handleSearch}
              getCurrentLocationWeather={() => {
                alert('En una implementación real, esto obtendría tu ubicación actual.');
                setCity('Your Location');
              }}
            />
            <IconButton
              iconProps={{ iconName: 'GlobalNavButton' }}
              onClick={() => setIsSettingsPanelOpen(true)}
              styles={{
                root: {
                  margin: '0 10px',
                  transition: 'background-color 0.3s ease',
                }
              }}
            />
          </Stack>

          <SettingsPanel 
            isOpen={isSettingsPanelOpen}
            onDismiss={() => setIsSettingsPanelOpen(false)}
            darkMode={darkMode}
            handleToggleDarkMode={handleToggleDarkMode}
            temperatureUnit={temperatureUnit}
            handleTemperatureUnitChange={handleTemperatureUnitChange}
            windUnit={windUnit}
            handleWindUnitChange={handleWindUnitChange}
            showComparison={showComparison}
            toggleComparison={toggleComparison}
            comparisonCity={comparisonCity}
            showUVPanel={showUVPanel}
            toggleUVPanel={toggleUVPanel}
            hasUVData={weatherData?.current?.uv !== undefined}
          />
          
          <CityComparison 
                  showComparison={showComparison}
                  comparisonCity={comparisonCity}
                  comparisonLoading={comparisonLoading}
                  comparisonError={comparisonError}
                  comparisonData={comparisonData}
                  weatherData={weatherData}
                  displayTemperature={displayTemperature}
                  displayWindSpeed={displayWindSpeed}
                  city={city}
                  onComparisonCityChange={handleComparisonCityChange}
                  darkMode={darkMode}
                  temperatureUnit={temperatureUnit}
                  windUnit={windUnit}
                />

          {loading ? (
            <Spinner size={SpinnerSize.large} label="Cargando datos del clima..." />
          ) : error ? (
            <Text variant="large" style={{ color: 'red' }}>{error}</Text>
          ) : weatherData && (
            <WeatherDashboard 
              weatherData={weatherData}
              darkMode={darkMode}
              temperatureUnit={temperatureUnit}
              windUnit={windUnit}
              temperatureField={temperatureField}
              windField={windField}
              showUVPanel={showUVPanel}
            />
          )}
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default WeatherApp;
import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { 
  IconButton, 
  Text, 
  Stack, 
  Spinner, 
  SpinnerSize, 
  ThemeProvider, 
  initializeIcons,
  Toggle,
  ChoiceGroup,
  Panel,
  PanelType
} from '@fluentui/react';
import WeatherInfo from './ui_elements/weather_info.js';
import HourlyForecast from './ui_elements/HourlyForecast';
import ForecastList from './ui_elements/ForecastList';
import ForecastDetailPanel from './ui_elements/ForecastDetailPanel';
import SearchForm from './ui_elements/search_form.js';
import UVHourly from './ui_elements/UV_hourly.js';
import UVScale from './ui_elements/UV_scale.js';
import Header from './components/Header.jsx';
import { lightTheme, darkTheme } from './themes.js';
// Import the JSON data directly
import mockWeatherDataLondon from './components/mockData.json';

initializeIcons();


// CSS for theme transition animations
const getGlobalStyles = (darkMode) => {
  return {
    rootStyle: {
      transition: 'background-color 0.5s ease, color 0.5s ease',
      backgroundColor: darkMode ? darkTheme.palette.neutralLighterAlt : lightTheme.palette.neutralLighterAlt,
      color: darkMode ? darkTheme.palette.neutralPrimary : lightTheme.palette.neutralPrimary,
      minHeight: '100vh',
    },
    contentStyle: {
      transition: 'all 0.5s ease',
    }
  };
};

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('London'); // Changed to match default JSON data
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [selectedForecast, setSelectedForecast] = useState(null);
  const hourlyForecastRef = useRef(null);
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
  
  const getWeatherData = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/weather`, {
        params: { city }
      });
      
      if (response.data && response.status === 200) {
        const enrichedData = generateForecastData(response.data);
        setWeatherData(enrichedData);
        setError(null);
      } else {
        throw new Error('Invalid response from weather API');
      }
    }catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(error.response?.data?.error || 'Error fetching weather data');
  }
};

const generateForecastData = (baseData) => {
  if (!baseData || !baseData.forecast || !baseData.forecast.forecastday) {
    throw new Error('Invalid data structure');
  }

  // Generate hourly forecast data from the API response
  const hourly = baseData.forecast.forecastday[0].hour.map(hour => ({
    dt: new Date(hour.time).getTime(),
    temp: hour.temp_c,
    temp_c: hour.temp_c,
    temp_f: hour.temp_f,
    weather: [{ 
      description: hour.condition.text,
      icon: hour.condition.icon.replace("//cdn", "https://cdn")
    }],
    humidity: hour.humidity,
    wind_kph: hour.wind_kph,
    wind_mph: hour.wind_mph,
    wind_degree: hour.wind_degree,
    wind_dir: hour.wind_dir,
    pressure_mb: hour.pressure_mb,
    precip_mm: hour.precip_mm,
    cloud: hour.cloud,
    feelslike_c: hour.feelslike_c,
    feelslike_f: hour.feelslike_f,
    chance_of_rain: hour.chance_of_rain,
    uv: hour.uv
  }));

  // Filter to show only future hours
  const now = new Date().getTime();
  const filteredHourly = hourly.filter(hour => hour.dt >= now);

  return {
    ...baseData,
    hourly: filteredHourly.slice(0, 24), // Limit to next 24 hours
    daily: baseData.forecast.forecastday.map(day => ({
      dt: new Date(day.date).getTime(),
      temp: {
        min: day.day.mintemp_c,
        max: day.day.maxtemp_c
      },
      temp_f: {
        min: day.day.mintemp_f,
        max: day.day.maxtemp_f
      },
      weather: [{ 
        description: day.day.condition.text,
        icon: day.day.condition.icon.replace("//cdn", "https://cdn")
      }],
      humidity: day.day.avghumidity,
      wind_speed: day.day.maxwind_kph,
      wind_mph: day.day.maxwind_mph,
      precipitation: day.day.totalprecip_mm,
      uv: day.day.uv
    }))
  };
};


  // Get animated styles
  const globalStyles = getGlobalStyles(darkMode);
  
  const scrollLeft = () => {
    if (hourlyForecastRef.current) {
      const scrollWidth = hourlyForecastRef.current.scrollWidth;
      const clientWidth = hourlyForecastRef.current.clientWidth;
      const scrollAmount = Math.min(clientWidth, 300);
      hourlyForecastRef.current.scrollLeft -= scrollAmount;
    }
  };
  
  const scrollRight = () => {
    if (hourlyForecastRef.current) {
      const scrollWidth = hourlyForecastRef.current.scrollWidth;
      const clientWidth = hourlyForecastRef.current.clientWidth;
      const scrollAmount = Math.min(clientWidth, 300);
      hourlyForecastRef.current.scrollLeft += scrollAmount;
    }
  };
  // Memoized conversion functions to avoid unnecessary recalculations
  const convertTemp = useMemo(() => {
    return (temp) => {
      if (temperatureUnit === 'fahrenheit') {
        // If we're dealing with our generated data (which is in Celsius)
        if (typeof temp === 'number') {
          return Math.round((temp * 9/5) + 32);
        }
        // If we're dealing with the temp object from daily forecast
        if (temp && typeof temp.min === 'number' && typeof temp.max === 'number') {
          return {
            min: Math.round((temp.min * 9/5) + 32),
            max: Math.round((temp.max * 9/5) + 32)
          };
        }
      }
      return temp;
    };
  }, [temperatureUnit]);

  const convertWind = useMemo(() => {
    return (speed) => {
      if (windUnit === 'mph' && typeof speed === 'number') {
        return Math.round(speed * 0.621371);
      }
      return speed;
    };
  }, [windUnit]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // Simulate API loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get the base weather data from our JSON
        const baseData = getWeatherData(city);
        
        // Add forecast data since it's not in the original JSON
        const enrichedData = generateForecastData(baseData);
        
        setWeatherData(enrichedData);
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

  useEffect(() => {
    if (!showComparison || !comparisonCity?.trim()) return;
    
    const fetchComparisonData = async () => {
      setComparisonLoading(true);
      setComparisonError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For comparison, we'll use the same data but modify some values
        const baseData = getWeatherData(comparisonCity);
        
        // Modify some values to simulate different weather
        const modifiedData = {
          ...baseData,
          current: {
            ...baseData.current,
            temp_c: baseData.current.temp_c + (Math.random() * 6 - 3),
            temp_f: baseData.current.temp_f + (Math.random() * 10 - 5),
            humidity: Math.min(100, Math.max(30, baseData.current.humidity + (Math.random() * 20 - 10)))
          }
        };
        
        // Add forecast data
        const enrichedData = generateForecastData(modifiedData);
        
        setComparisonData(enrichedData);
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

  const handleSearch = () => {
    const trimmedCity = searchCity?.trim();
    if (!trimmedCity) return;
    
    // Validación mejorada para nombres de ciudades
    // Permite letras, espacios, guiones, apóstrofes y algunos caracteres especiales comunes en nombres de ciudades
    if (/^[\p{L}\s\-'.,()]+$/u.test(trimmedCity)) {
      setCity(trimmedCity);
      setSearchCity('');
    } else {
      setError('Formato de nombre de ciudad no válido');
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

  const toggleUVPanel = (_, checked) => {
    setShowUVPanel(checked);
  };

  // Opciones para unidades de temperatura
  const temperatureOptions = [
    { key: 'celsius', text: '°C' },
    { key: 'fahrenheit', text: '°F' }
  ];

  // Opciones para unidades de viento
  const windOptions = [
    { key: 'kmh', text: 'km/h' },
    { key: 'mph', text: 'mph' }
  ];

  // Helper function to display temperature based on user preference
  const displayTemperature = (data) => {
    if (temperatureUnit === 'celsius') {
      return `${data?.current?.temp_c}°C`;
    } else {
      return `${data?.current?.temp_f}°F`;
    }
  };

  // Helper function to display wind speed based on user preference
  const displayWindSpeed = (data) => {
    if (windUnit === 'kmh') {
      return `${data?.current?.wind_kph} km/h`;
    } else {
      return `${data?.current?.wind_mph} mph`;
    }
  };

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

          <Panel
            isOpen={isSettingsPanelOpen}
            onDismiss={() => setIsSettingsPanelOpen(false)}
            headerText="Configuración"
            type={PanelType.medium}
            closeButtonAriaLabel="Cerrar"
            styles={{
              main: {
                transition: 'background-color 0.5s ease',
              },
              content: {
                transition: 'color 0.5s ease',
              }
            }}
          >
            <Stack tokens={{ childrenGap: 20, padding: 10 }}>
              <Stack>
                <Text variant="large">Tema</Text>
                <Toggle 
                  label={darkMode ? "Modo oscuro" : "Modo claro"}
                  checked={darkMode} 
                  onChange={handleToggleDarkMode}
                  styles={{
                    root: {
                      marginTop: 10,
                    },
                    pill: {
                      transition: 'background-color 0.3s ease',
                    }
                  }}
                  onText="Activado"
                  offText="Desactivado"
                />
              </Stack>
              
              <Stack>
                <Text variant="large">Unidad de temperatura</Text>
                <ChoiceGroup 
                  selectedKey={temperatureUnit} 
                  options={temperatureOptions} 
                  onChange={handleTemperatureUnitChange} 
                />
              </Stack>
              <Stack>
                <Text variant="large">Unidad de viento</Text>
                <ChoiceGroup 
                  selectedKey={windUnit} 
                  options={windOptions} 
                  onChange={handleWindUnitChange} 
                />
              </Stack>
              <Stack>
                <Text variant="large">Opciones adicionales</Text>
                <Toggle 
                  label={`Comparar con ${comparisonCity}`}
                  checked={showComparison} 
                  onChange={toggleComparison}
                  styles={{
                    pill: {
                      transition: 'background-color 0.3s ease',
                    }
                  }}
                />
                {weatherData?.current?.uv !== undefined && (
                  <Toggle 
                    label="Mostrar índice UV por hora"
                    checked={showUVPanel} 
                    onChange={toggleUVPanel}
                    styles={{
                      pill: {
                        transition: 'background-color 0.3s ease',
                      }
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Panel>
          
          {/* Comparación con otra ciudad */}
          {showComparison && (
            <Stack style={{ marginTop: 10, marginBottom: 20, transition: 'all 0.5s ease' }}>
              <Text variant="large">Comparación con {comparisonCity}</Text>
              {comparisonLoading ? (
                <Spinner size={SpinnerSize.medium} label="Cargando datos de comparación..." />
              ) : comparisonError ? (
                <Text style={{ color: 'red' }}>{comparisonError}</Text>
              ) : comparisonData ? (
                <Stack horizontal tokens={{ childrenGap: 20 }}>
                  {/* Datos de comparación básicos */}
                  <Stack>
                    <Text variant="medium">{city}</Text>
                    <Text>Temperatura: {displayTemperature(weatherData)}</Text>
                    <Text>Viento: {displayWindSpeed(weatherData)}</Text>
                    <Text>Humedad: {weatherData?.current?.humidity}%</Text>
                  </Stack>
                  <Stack>
                    <Text variant="medium">{comparisonCity}</Text>
                    <Text>Temperatura: {displayTemperature(comparisonData)}</Text>
                    <Text>Viento: {displayWindSpeed(comparisonData)}</Text>
                    <Text>Humedad: {comparisonData?.current?.humidity}%</Text>
                  </Stack>
                </Stack>
              ) : null}
            </Stack>
          )}

          {loading ? (
            <Spinner size={SpinnerSize.large} label="Cargando datos del clima..." />
          ) : error ? (
            <Text variant="large" style={{ color: 'red' }}>{error}</Text>
          ) : weatherData && (
            <>
              <div style={{ transition: 'all 0.5s ease' }}>
                <WeatherInfo 
                  weatherData={weatherData} 
                  darkMode={darkMode} 
                  temperatureUnit={temperatureUnit}
                  windUnit={windUnit}
                  convertTemp={convertTemp}
                  convertWind={convertWind}
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
                    convertTemp={convertTemp}
                    temperatureUnit={temperatureUnit}
                    windUnit={windUnit}
                    darkMode={darkMode}
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
                  forecast={weatherData?.daily.slice(0, 5) || []} 
                  handleForecastClick={setSelectedForecast} 
                  convertTemp={convertTemp}
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
          )}
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default WeatherApp;
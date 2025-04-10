import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  IconButton, 
  Text, 
  Stack, 
  Spinner, 
  SpinnerSize, 
  ThemeProvider, 
  initializeIcons,
  Toggle,
  ChoiceGroup
} from '@fluentui/react';
import { getMockWeatherData, getMockComparisonData } from './ui_elements/mockData.js';
import WeatherInfo from './ui_elements/weather_info.js';
import HourlyForecast from './ui_elements/HourlyForecast';
import ForecastList from './ui_elements/ForecastList';
import ForecastDetailPanel from './ui_elements/ForecastDetailPanel';
import SearchForm from './ui_elements/search_form.js';
import UVHourly from './ui_elements/UV_hourly.js';
import UVScale from './ui_elements/UV_scale.js';
import Header from './components/Header.jsx';
import { lightTheme, darkTheme } from './themes.js';

initializeIcons();

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Madrid');
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

  const scrollLeft = () => {
    if (hourlyForecastRef.current) {
      hourlyForecastRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (hourlyForecastRef.current) {
      hourlyForecastRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Memoized conversion functions to avoid unnecessary recalculations
  const convertTemp = useMemo(() => {
    return (temp) => temperatureUnit === 'fahrenheit' ? Math.round((temp * 9/5) + 32) : temp;
  }, [temperatureUnit]);

  const convertWind = useMemo(() => {
    return (speed) => windUnit === 'mph' ? Math.round(speed * 0.621371) : speed;
  }, [windUnit]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = getMockWeatherData(city);
        if (!mockData) throw new Error('No se encontraron datos para esta ciudad');
        setWeatherData(mockData);
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
        const mockComparisonData = getMockComparisonData(comparisonCity);
        if (!mockComparisonData) throw new Error('No hay datos disponibles para esta ciudad');
        setComparisonData(mockComparisonData);
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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Stack tokens={{ padding: 20 }}>
        <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

        <SearchForm 
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          handleSearch={handleSearch}
          getCurrentLocationWeather={() => {
            alert('En una implementación real, esto obtendría tu ubicación actual.');
            setCity('Tu ubicación');
          }}
        />

        {/* Controles de unidades */}
        <Stack horizontal tokens={{ childrenGap: 20, padding: 10 }}>
          <Stack>
            <Text>Unidad de temperatura</Text>
            <ChoiceGroup 
              selectedKey={temperatureUnit} 
              options={temperatureOptions} 
              onChange={handleTemperatureUnitChange} 
            />
          </Stack>
          <Stack>
            <Text>Unidad de viento</Text>
            <ChoiceGroup 
              selectedKey={windUnit} 
              options={windOptions} 
              onChange={handleWindUnitChange} 
            />
          </Stack>
          <Stack>
            <Text>Opciones</Text>
            <Toggle 
              label={`Comparar con ${comparisonCity}`}
              checked={showComparison} 
              onChange={toggleComparison}
            />
            {weatherData?.hourly?.some(h => h.uvi !== undefined) && (
              <Toggle 
                label="Mostrar índice UV por hora"
                checked={showUVPanel} 
                onChange={toggleUVPanel}
              />
            )}
          </Stack>
        </Stack>

        {/* Comparación con otra ciudad */}
        {showComparison && (
          <Stack style={{ marginTop: 10, marginBottom: 20 }}>
            <Text variant="large">Comparación con {comparisonCity}</Text>
            {comparisonLoading ? (
              <Spinner size={SpinnerSize.medium} label="Cargando datos de comparación..." />
            ) : comparisonError ? (
              <Text style={{ color: 'red' }}>{comparisonError}</Text>
            ) : comparisonData ? (
              <Stack horizontal tokens={{ childrenGap: 20 }}>
                {/* Aquí iría el componente de comparación - ejemplo simple */}
                <Stack>
                  <Text variant="medium">{city}</Text>
                  <Text>Temperatura: {convertTemp(weatherData?.current?.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}</Text>
                </Stack>
                <Stack>
                  <Text variant="medium">{comparisonCity}</Text>
                  <Text>Temperatura: {convertTemp(comparisonData?.current?.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}</Text>
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
            <WeatherInfo 
              weatherData={weatherData} 
              temperatureUnit={temperatureUnit} 
              windUnit={windUnit} 
              convertTemp={convertTemp} 
              convertWind={convertWind} 
            />

            <Stack style={{ marginTop: 20 }}>
              <Text variant="large">Pronóstico por Hora</Text>
              <Stack horizontal>
                <IconButton iconProps={{ iconName: 'ChevronLeft' }} onClick={scrollLeft} />
                <div ref={hourlyForecastRef} style={{ overflowX: 'auto', display: 'flex' }}>
                  <HourlyForecast 
                    hourlyData={weatherData?.hourly || []} 
                    convertTemp={convertTemp}
                    temperatureUnit={temperatureUnit}
                  />
                </div>
                <IconButton iconProps={{ iconName: 'ChevronRight' }} onClick={scrollRight} />
              </Stack>
            </Stack>

            <Stack style={{ marginTop: 20 }}>
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

            {weatherData?.current?.uvi !== undefined && <UVScale uvIndex={weatherData.current.uvi} />}
            
            {showUVPanel && weatherData?.hourly && (
              <UVHourly 
                data={weatherData.hourly} 
                title="Índice UV por hora" 
              />
            )}
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default WeatherApp;
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, Text, Spinner, SpinnerSize, TextField, PrimaryButton, Panel, PanelType } from '@fluentui/react';
import WeatherInfo from '../ui_elements/weather_info';

const CityComparison = ({
  showComparison,
  comparisonCity,
  comparisonLoading,
  comparisonError,
  comparisonData,
  weatherData,
  displayTemperature,
  onDismiss,
  city,
  onComparisonCityChange,
  darkMode,
  temperatureUnit,
  windUnit
}) => {
  const [inputCity, setInputCity] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim() && typeof onComparisonCityChange === 'function') {
      onComparisonCityChange(inputCity.trim());
      setInputCity('');
    }
  };

  return (
    <Panel
      isOpen={showComparison}
      onDismiss={onDismiss}
      type={PanelType.largeFixed}
      headerText="Comparación del Clima"
      closeButtonAriaLabel="Cerrar"
      styles={{
        main: {
          backgroundColor: darkMode ? '#202020' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000'
        },
        headerText: {
          fontSize: '24px',
          fontWeight: 'bold'
        },
        contentInner: {
          padding: '20px'
        }
      }}
    >
      <Stack tokens={{ childrenGap: 20 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <TextField
            placeholder="Ingrese ciudad para comparar"
            value={inputCity}
            onChange={(_, newValue) => setInputCity(newValue || '')}
            styles={{ 
              root: { 
                width: '100%',
                '.ms-TextField-fieldGroup': {
                  borderRadius: '4px'
                }
              } 
            }}
          />
          <PrimaryButton 
            type="submit"
            styles={{
              root: {
                borderRadius: '4px',
                height: '32px'
              }
            }}
          >
            Comparar
          </PrimaryButton>
        </form>

        {comparisonLoading ? (
          <Spinner size={SpinnerSize.medium} label="Cargando datos de comparación..." />
        ) : comparisonError ? (
          <Text style={{ color: 'red' }}>{comparisonError}</Text>
        ) : comparisonData ? (
          <Stack tokens={{ childrenGap: 20 }} style={{ height: '100%', overflow: 'auto' }}>
            <Stack style={{ flex: 1 }}>
              <Text variant="large" style={{ marginBottom: 10 }}>
                {city}
              </Text>
              <WeatherInfo 
                weatherData={weatherData}
                darkMode={darkMode}
                temperatureUnit={temperatureUnit}
                windUnit={windUnit}
              />
            </Stack>
            <Stack style={{ flex: 1 }}>
              <Text variant="large" style={{ marginBottom: 10 }}>
                {comparisonCity}
              </Text>
              <WeatherInfo 
                weatherData={comparisonData}
                darkMode={darkMode}
                temperatureUnit={temperatureUnit}
                windUnit={windUnit}
              />
            </Stack>
          </Stack>
        ) : (
          <Text>Ingrese una ciudad para comparar el clima</Text>
        )}
      </Stack>
    </Panel>
  );
};
CityComparison.propTypes = {
  showComparison: PropTypes.bool.isRequired,
  comparisonCity: PropTypes.string,
  comparisonLoading: PropTypes.bool,
  comparisonError: PropTypes.string,
  comparisonData: PropTypes.object,
  weatherData: PropTypes.object,
  displayTemperature: PropTypes.func.isRequired,
  displayWindSpeed: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  onComparisonCityChange: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
  temperatureUnit: PropTypes.string.isRequired,
  windUnit: PropTypes.string.isRequired
};

export default CityComparison;
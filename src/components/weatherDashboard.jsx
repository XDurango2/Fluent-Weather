// src/components/WeatherDashboard.jsx
import React, { useRef } from 'react';
import { DefaultButton, Stack, Text, IconButton, Spinner, SpinnerSize } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import WeatherInfo from '../ui_elements/weather_info';
import WeatherAlerts from '../ui_elements/WeatherAlerts';
import HourlyForecast from '../ui_elements/HourlyForecast';
import ForecastList from '../ui_elements/ForecastList_5Days';
import UVScale from '../ui_elements/UV_scale';
import UVHourly from '../ui_elements/UV_hourly';
import AirQuality from '../ui_elements/AirQuality';
import SunriseSunset from '../ui_elements/SunriseSunset';

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
  const { t } = useTranslation();
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

      <div style={{ transition: 'all 0.5s ease' }}>
        {weatherData?.current?.uv !== undefined && <UVScale uvIndex={weatherData.current.uv} />}
      </div>

      <div style={{ transition: 'all 0.5s ease' }}>
        <AirQuality airQuality={weatherData?.current?.air_quality} darkMode={darkMode} />
      </div>

      <div style={{ transition: 'all 0.5s ease' }}>
        <SunriseSunset astro={weatherData?.forecast?.forecastday?.[0]?.astro} />
      </div>

      {showUVPanel && weatherData?.hourly && (
        <div style={{ transition: 'all 0.5s ease' }}>
          <UVHourly
            data={weatherData.hourly}
            title={t('uv.hourlyTitle')}
          />
        </div>
      )}

      <Stack style={{ marginTop: 20, transition: 'all 0.5s ease' }}>
        <Text variant="large">{t('hourlyForecast.sectionTitle')}</Text>
        <Stack horizontal>
          <IconButton
            iconProps={{ iconName: 'ChevronLeft' }}
            onClick={scrollLeft}
            title={t('hourlyForecast.scrollLeft')}
            ariaLabel={t('hourlyForecast.scrollLeft')}
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
            title={t('hourlyForecast.scrollRight')}
            ariaLabel={t('hourlyForecast.scrollRight')}
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
        <Text variant="large">{t('fiveDayForecast.sectionTitle')}</Text>
        {extendedForecastLoading ? (
          <Spinner size={SpinnerSize.large} label={t('fiveDayForecast.loading')} />
        ) : extendedForecastError ? (
          <Stack tokens={{ childrenGap: 10 }} horizontalAlign="start">
            <Text style={{ color: 'red' }}>{extendedForecastError}</Text>
            <DefaultButton text={t('errors.retry')} onClick={onRetryExtendedForecast} />
          </Stack>
        ) : extendedForecast?.forecast ? (
          <ForecastList
            forecast={extendedForecast.forecast}
            temperatureUnit={temperatureUnit}
            windUnit={windUnit}
            darkMode={darkMode}
          />
        ) : null}
      </Stack>
    </>
  );
};

export default WeatherDashboard;
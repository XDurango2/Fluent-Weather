// src/utils/weatherUtils.js (simplified)

// Helper function to select temperature value based on user preference
const selectTemperature = (data, temperatureUnit) => {
    if (!data?.current) return null;
    if (temperatureUnit === 'celsius') {
      return `${data.current.temp_c}°C`;
    } else {
      return `${data.current.temp_f}°F`;
    }
  };
  
  // Helper function to select wind speed based on user preference
  const selectWindSpeed = (data, windUnit) => {
    if (!data?.current) return null;
    if (windUnit === 'kmh') {
      return `${data.current.wind_kph} km/h`;
    } else {
      return `${data.current.wind_mph} mph`;
    }
  };
  
  // Get styling based on theme
  const getGlobalStyles = (darkMode) => {
    return {
      rootStyle: {
        transition: 'background-color 0.5s ease, color 0.5s ease',
        backgroundColor: darkMode ? '#1f1f1f' : '#f3f2f1',
        color: darkMode ? '#ffffff' : '#323130',
        minHeight: '100vh',
      },
      contentStyle: {
        transition: 'all 0.5s ease',
      }
    };
  };
  
  export {
    selectTemperature,
    selectWindSpeed,
    getGlobalStyles
  };
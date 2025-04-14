export const getWindDirectionAngle = (direction) => {
  const directions = {
    'N': 0,
    'NE': 45,
    'E': 90,
    'SE': 135,
    'S': 180,
    'SW': 225,
    'W': 270,
    'NW': 315,
  };
  return directions[direction] || 0;
};

export const airQualityIconMap = {
  1: 'Emoji2',          // Buena
  2: 'Info',           // Moderada
  3: 'Warning',        // Mala
  4: 'Error',          // Muy mala
  5: 'Blocked2',       // Peligrosa
  6: 'AlertSolid'      // Extremadamente peligrosa
};

export const weatherIconMap = {
  'Sunny': 'Sunny',
  'Partly Cloudy': 'PartlyCloudyDay',
  'Cloudy': 'CloudWeather',
  'Overcast': 'Cloudy',
  'Mist': 'Fog',
  'Patchy rain possible' : 'RainShowersDay',
  'Light rain': 'Precipitation',
  'Moderate rain': 'WeatherRain',
  'Heavy rain': 'WeatherRainShowersDay',
  'Thunder': 'Thunderstorms',
  'Snow': 'Snow',
  'Light snow': 'WeatherFlurries',
  'Heavy snow': 'WeatherSnow',
  'Clear': 'ClearNight',
  'Fog': 'Fog',
  'Windy': 'Squalls',
  'Blowing snow': 'BlowingSnow',
};


export const getAirQualityLabel = (index) => {
  const labels = {
    1: 'Buena',
    2: 'Moderada',
    3: 'Mala',
    4: 'Muy mala',
    5: 'Peligrosa',
    6: 'Extremadamente peligrosa'
  };
  return labels[index] || 'Desconocida';
};
// Agregar esta nueva función de ayuda
// Función mejorada para obtener el icono normalizado
export const getNormalizedWeatherIcon = (condition) => {
  if (!condition) return 'Weather'; // icono por defecto
  
  // Normalizar el texto: convertir a minúsculas y eliminar espacios extra
  const normalizedCondition = condition.trim();
  
  // Buscar el icono en el mapa
  const iconName = weatherIconMap[normalizedCondition];
  
  // Si no se encuentra una coincidencia exacta, buscar coincidencias parciales
  if (!iconName) {
    if (normalizedCondition.includes('rain')) {
      if (normalizedCondition.includes('patchy') || normalizedCondition.includes('possible')) {
        return 'RainShowersDay';
      }
      return 'Rain';
    }
    if (normalizedCondition.includes('cloud')) {
      return 'CloudyWeather';
    }
    if (normalizedCondition.includes('drizzle')) {
      return 'Precipitation';
    }
    // ... más casos según necesites
  }
  
  return iconName || 'SunQuestionMark'; // retorna el icono encontrado o el icono por defecto
};
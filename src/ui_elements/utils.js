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
  'sunny': 'Sunny',
  'partly cloudy': 'PartlyCloudyDay',
  'cloudy': 'CloudWeather',
  'overcast': 'Cloudy',
  'mist': 'Fog',
  'patchy rain possible': 'RainShowersDay',
  'light rain': 'Precipitation',
  'moderate rain': 'WeatherRain',
  'heavy rain': 'WeatherRainShowersDay',
  'thunder': 'Thunderstorms',
  'snow': 'Snow',
  'light snow': 'WeatherFlurries',
  'heavy snow': 'WeatherSnow',
  'clear': 'ClearNight',
  'fog': 'Fog',
  'windy': 'Squalls',
  'blowing snow': 'BlowingSnow',
};

// Algunas condiciones de WeatherAPI usan el mismo texto de día y de noche
// (a diferencia de "Sunny"/"Clear", que ya vienen diferenciados). Para esos
// casos usamos un ícono nocturno alternativo cuando is_day === 0.
const weatherIconMapNight = {
  'sunny': 'ClearNight',
  'partly cloudy': 'PartlyCloudyNight',
  'patchy rain possible': 'RainShowersNight',
  'light snow': 'SnowShowerNight',
};

export const getAirQualityLabel = (index, t) => {
  return t(`airQuality.levels.${index}`, { defaultValue: t('airQuality.levels.unknown') });
};
// Agregar esta nueva función de ayuda
// Función mejorada para obtener el icono normalizado
export const getNormalizedWeatherIcon = (condition, isDay = true) => {
  if (!condition) return 'Weather'; // icono por defecto

  // Normalizar el texto: convertir a minúsculas y eliminar espacios extra
  const normalizedCondition = condition.trim().toLowerCase();

  // Buscar el icono en el mapa, priorizando la variante nocturna si aplica
  const iconName = (!isDay && weatherIconMapNight[normalizedCondition]) ||
    weatherIconMap[normalizedCondition];

  // Si no se encuentra una coincidencia exacta, buscar coincidencias parciales
  if (!iconName) {
    if (normalizedCondition.includes('rain')) {
      if (normalizedCondition.includes('patchy') || normalizedCondition.includes('possible')) {
        return isDay ? 'RainShowersDay' : 'RainShowersNight';
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
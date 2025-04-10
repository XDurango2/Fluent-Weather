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
  'Partly cloudy': 'PartlyCloudyDay',
  'Cloudy': 'CloudyWeather',
  'Overcast': 'Cloudy',
  'Mist': 'Haze',
  'Patchy rain possible': 'WeatherRainShower',
  'Light rain': 'WeatherDrizzle',
  'Moderate rain': 'WeatherRain',
  'Heavy rain': 'WeatherRainShowersDay',
  'Thunder': 'WeatherStormShowers',
  'Snow': 'WeatherSnow',
  'Light snow': 'WeatherFlurries',
  'Heavy snow': 'WeatherSnow',
  'Clear': 'WeatherMoon',
  'Fog': 'FoggyDay',
  'Light drizzle': 'WeatherDrizzle',
  'Light rain shower': 'WeatherRainShower',
  'Moderate or heavy rain shower': 'WeatherRainShowersDay',
  'Thundery outbreaks possible': 'WeatherStormShowers'
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
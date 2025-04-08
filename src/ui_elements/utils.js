export const getWindDirectionAngle = (direction) => {
    const directions = {
      'Norte': 0,
      'Noreste': 45,
      'Este': 90,
      'Sureste': 135,
      'Sur': 180,
      'Suroeste': 225,
      'Oeste': 270,
      'Noroeste': 315,
    };
    return directions[direction] || 0; // Devuelve 0 si la dirección no coincide
  };
  
  export const airQualityIconMap = {
    'Buena': 'Emoji2',
    'Moderada': 'Info',
    'Mala': 'Warning',
    'Muy mala': 'Error',
    'Peligrosa': 'Blocked2',
  };
  
  export const weatherIconMap = {
    'clear': 'Sunny',
    'cloudy': 'PartlyCloudyDay',
    'rain': 'Rain',
    'thunderstorm': 'Thunderstorms',
    'snow': 'Snow',
    'mist': 'Fog',
  };
  
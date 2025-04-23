// src/services/weatherService.js
import axios from 'axios';
import mockWeatherDataLondon from '../components/mockData.json';

// API interaction logic
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/weather`, {
      params: { city }
    });
    
    if (response.data && response.status === 200) {
      return generateForecastData(response.data);
    } else {
      throw new Error('Invalid response from weather API');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
// La función fetchExtendedForecast está definida pero no se usa en este componente
// Si la necesitas para futuras implementaciones, asegúrate de importar o definir generateForecastData
const fetchExtendedForecast = async (city) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/weather/week`, {
      params: { city }
    });
    
    if (response.data && response.status === 200) {
      // Nota: generateForecastData debería estar importado o definido
      // Por ahora devolvemos los datos directamente
      // return generateForecastData(response.data);
      console.log("Extended forecast data:", generateExtendedForecastData(response.data));
      return generateExtendedForecastData(response.data);
    } else {
      throw new Error('Invalid response from weather API');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Data transformation logic
const generateForecastData = (baseData) => {
  if (!baseData || !baseData.forecast || !baseData.forecast.forecastday) {
    throw new Error('Invalid data structure');
  }

  // Generate hourly forecast data from the API response
  const hourly = baseData.forecast.forecastday[0].hour.map(hour => ({
    dt: new Date(hour.time).getTime(),
    time: hour.time,
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
    precip_in: hour.precip_in,
    cloud: hour.cloud,
    feelslike_c: hour.feelslike_c,
    feelslike_f: hour.feelslike_f,
    chance_of_rain: hour.chance_of_rain,
    vis_km: hour.vis_km,
    vis_miles: hour.vis_miles,
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
      wind_dir: day.day.wind_dir || '', // Adding this to handle the expected prop
      uv: day.day.uv
    }))
  };
};
const generateExtendedForecastData = (baseData) => {
  if (!baseData || !baseData.forecast || !baseData.forecast.forecastday) {
    throw new Error('Invalid extended forecast data structure');
  }

  return {
    location: baseData.location,
    current: baseData.current,
    forecast: baseData.forecast.forecastday.map(day => ({
      date: day.date,
      day: {
        maxtemp_c: day.day.maxtemp_c,
        maxtemp_f: day.day.maxtemp_f,
        mintemp_c: day.day.mintemp_c,
        mintemp_f: day.day.mintemp_f,
        avgtemp_c: day.day.avgtemp_c,
        avgtemp_f: day.day.avgtemp_f,
        maxwind_kph: day.day.maxwind_kph,
        maxwind_mph: day.day.maxwind_mph,
        avghumidity: day.day.avghumidity,
        condition: day.day.condition,
        uv: day.day.uv
      },
      hour: day.hour.map(hour => ({
        time: hour.time,
        temp_c: hour.temp_c,
        temp_f: hour.temp_f,
        condition: hour.condition,
        wind_kph: hour.wind_kph,
        wind_mph: hour.wind_mph,
        wind_degree: hour.wind_degree,
        wind_dir: hour.wind_dir,
        humidity: hour.humidity,
        uv: hour.uv
      }))
    }))
  };
};
// Fallback to mock data if API fails
const getWeatherDataWithFallback = async (city) => {
  try {
    return await fetchWeatherData(city);
  } catch (error) {
    console.warn("API error, falling back to mock data:", error);
    return generateForecastData(mockWeatherDataLondon);
  }
};

export { fetchWeatherData, generateForecastData, getWeatherDataWithFallback, fetchExtendedForecast, generateExtendedForecastData };
// mockData.js
export const getMockWeatherData = (city) => {
    return {
      location: city,
      current: {
        temperature: 23,
        condition: 'clear',
        humidity: 45,
        windSpeed: 10,
        windDirection: 'Noroeste',
        wind_deg: 315,
        uvi: 7,
        weather: [{ icon: 'clear' }],
        air_quality_index: 'Buena',
        pressure: 1015,
        visibility: 10,
        dewPoint: 12,
        feelsLike: 24
      },
      hourly: Array(24).fill().map((_, i) => ({
        dt: Date.now() + (i * 3600000),
        temp: 20 + Math.random() * 10,
        weather: [{ 
          description: 'Clear sky',
          icon: '01d' 
        }],
        wind_speed: 10 + Math.random() * 5,
        wind_deg: Math.random() * 360,
        uvi: 5 + Math.random() * 4
      })),
      daily: Array(7).fill().map((_, i) => ({
        dt: Date.now() + (i * 86400000),
        temp: {
          min: 15 + Math.random() * 5,
          max: 25 + Math.random() * 5,
          day: 20 + Math.random() * 8
        },
        weather: [{ 
          description: 'Clear sky',
          icon: '01d' 
        }],
        wind_speed: 10 + Math.random() * 5,
        wind_deg: Math.random() * 360,
        uvi: 5 + Math.random() * 4
      })),
      alerts: [
        { 
          type: 'Calor', 
          severity: 'Moderada', 
          description: 'Ola de calor prevista para los próximos días', 
          startTime: '2025-04-09T00:00:00Z', 
          endTime: '2025-04-11T23:59:59Z' 
        }
      ],
      hourly: [
        { key: 1, time: '08:00', temperature: 20, condition: 'clear', windDirection: 'Noroeste', windSpeed: 10, uvIndex: 4, precipitation: 0 },
        { key: 2, time: '12:00', temperature: 23, condition: 'clear', windDirection: 'Noreste', windSpeed: 12, uvIndex: 7, precipitation: 0 },
        { key: 3, time: '16:00', temperature: 25, condition: 'cloudy', windDirection: 'Este', windSpeed: 15, uvIndex: 5, precipitation: 0 },
        { key: 4, time: '20:00', temperature: 22, condition: 'rain', windDirection: 'Sur', windSpeed: 9, uvIndex: 1, precipitation: 3 },
        { key: 5, time: '00:00', temperature: 19, condition: 'cloudy', windDirection: 'Suroeste', windSpeed: 8, uvIndex: 0, precipitation: 0 },
        { key: 6, time: '04:00', temperature: 17, condition: 'clear', windDirection: 'Oeste', windSpeed: 5, uvIndex: 0, precipitation: 0 },
      ],
      forecast: [
        { key: 1, date: 'Lunes', high: 24, low: 18, condition: 'clear', windSpeed: 10, humidity: 40, pressure: 1015, airQuality: 'Buena', uvIndex: 7, precipitation: 0 },
        { key: 2, date: 'Martes', high: 22, low: 17, condition: 'cloudy', windSpeed: 12, humidity: 50, pressure: 1018, airQuality: 'Moderada', uvIndex: 5, precipitation: 20 },
        { key: 3, date: 'Miércoles', high: 20, low: 15, condition: 'rain', windSpeed: 8, humidity: 70, pressure: 1020, airQuality: 'Mala', uvIndex: 3, precipitation: 80 },
        { key: 4, date: 'Jueves', high: 19, low: 14, condition: 'rain', windSpeed: 6, humidity: 65, pressure: 1021, airQuality: 'Muy mala', uvIndex: 2, precipitation: 65 },
        { key: 5, date: 'Viernes', high: 21, low: 16, condition: 'cloudy', windSpeed: 9, humidity: 55, pressure: 1017, airQuality: 'Moderada', uvIndex: 4, precipitation: 10 },
      ],
      historical: [
        { date: '8 Abril 2024', avgTemp: 22, maxTemp: 26, minTemp: 17 },
        { date: '8 Abril 2023', avgTemp: 19, maxTemp: 23, minTemp: 15 },
        { date: '8 Abril 2022', avgTemp: 20, maxTemp: 24, minTemp: 16 },
      ],
      clothingRecommendation: 'Ropa ligera con protección solar. Se recomienda sombrero y gafas de sol.'
    };
  };
  
  export const getMockComparisonData = (city) => {
    return {
      location: city,
      current: {
        temperature: 20,
        condition: 'cloudy',
        humidity: 60,
        windSpeed: 15,
        air_quality_index: 'Moderada'
      },
      forecast: [
        { key: 1, date: 'Lunes', high: 21, low: 16, condition: 'cloudy' },
        { key: 2, date: 'Martes', high: 23, low: 17, condition: 'clear' },
        { key: 3, date: 'Miércoles', high: 24, low: 18, condition: 'clear' },
        { key: 4, date: 'Jueves', high: 22, low: 17, condition: 'rain' },
        { key: 5, date: 'Viernes', high: 20, low: 15, condition: 'rain' },
      ]
    };
  };
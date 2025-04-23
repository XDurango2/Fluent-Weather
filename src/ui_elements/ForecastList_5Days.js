import React, { useState, useRef } from 'react';
import { Stack, Separator, IconButton, Text, Icon, Panel, PanelType, AnimationStyles, mergeStyles, DefaultButton } from '@fluentui/react';
import { weatherIconMap } from './utils';
import { Card } from '@fluentui/react-card';

const getWindDirectionAngle = (direction) => {
  if (typeof direction === 'number') {
    return direction;
  }
  
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
  return directions[direction] || 0;
};

const ForecastList = ({ 
  forecast = [], 
  handleForecastClick,
  temperatureUnit,
  windUnit 
}) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedHourContent, setSelectedHourContent] = useState(null);
  const fadeIn = mergeStyles(AnimationStyles.fadeIn400);
  const slideUpIn = mergeStyles(AnimationStyles.slideUpIn20);
  const hourlyContainerRef = useRef(null);

  const scrollHourly = (direction) => {
    if (hourlyContainerRef.current) {
      const scrollAmount = 300; // Ajusta este valor según necesites
      const currentScroll = hourlyContainerRef.current.scrollLeft;
      hourlyContainerRef.current.scrollTo({
        left: currentScroll + (direction === 'right' ? scrollAmount : -scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  const cardStyles = mergeStyles({
    width: 150,
    margin: 10,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: '15px',
    selectors: {
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }
    }
  });

  // Estilos para las tarjetas de hora con animación
  const hourCardStyles = mergeStyles({
    width: 120,
    flex: '0 0 auto',
    padding: '10px',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    selectors: {
      ':hover': {
        transform: 'scale(1.05)',
        backgroundColor: 'rgba(0, 120, 212, 0.1)'
      }
    }
  });

  const formatTemperature = (temp) => {
    return temperatureUnit === 'celsius' ? temp : (temp * 9/5) + 32;
  };
  
  const formatWindSpeed = (speed) => {
    return windUnit === 'mph' ? speed * 0.621371 : speed;
  };

  const getWindUnitSymbol = () => windUnit === 'mph' ? 'mph' : 'km/h';
  const getTempUnitSymbol = () => temperatureUnit === 'celsius' ? 'C' : 'F';

  // Función para renderizar los detalles de una hora específica
  const renderHourDetails = () => {
    if (!selectedHourContent) return null;

    return (
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Temperatura:</Text>
          <Text>
            {temperatureUnit === 'celsius' ? 
              `${Math.round(selectedHourContent.temp_c)}°C` : 
              `${Math.round(selectedHourContent.temp_f)}°F`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Sensación térmica:</Text>
          <Text>
            {temperatureUnit === 'celsius' ? 
              `${Math.round(selectedHourContent.feelslike_c)}°C` : 
              `${Math.round(selectedHourContent.feelslike_f)}°F`}
          </Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Humedad:</Text>
          <Text>{selectedHourContent.humidity}%</Text>
        </Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>Viento:</Text>
          <Text>
            {windUnit === 'kmh' ? 
              `${selectedHourContent.wind_kph} km/h` : 
              `${selectedHourContent.wind_mph} mph`}
          </Text>
        </Stack>
        {/* Botón para regresar al pronóstico diario */}
        <DefaultButton 
          text="Volver al pronóstico diario" 
          onClick={() => setSelectedHourContent(null)}
          styles={{ root: { marginTop: 20 } }}
        />
      </Stack>
    );
  };

  const renderPanelContent = () => {
    if (!selectedDay) return null;
  
    const { day } = selectedDay;
    
    return (
      <Stack tokens={{ childrenGap: 20 }}>
        <Text variant="xLarge" block>
          {new Date(selectedDay.date).toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
        
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <Stack>
            <Text variant="large">Temperatura</Text>
            <Text>Promedio: {formatTemperature(day.avgtemp_c)}°{getTempUnitSymbol()}</Text>
            <Text>Máxima: {formatTemperature(day.maxtemp_c)}°{getTempUnitSymbol()}</Text>
            <Text>Mínima: {formatTemperature(day.mintemp_c)}°{getTempUnitSymbol()}</Text>
          </Stack>
          
          <Stack>
            <Text variant="large">Viento</Text>
            <Text>Máximo: {formatWindSpeed(day.maxwind_kph)} {getWindUnitSymbol()}</Text>
          </Stack>
          
          <Stack>
            <Text variant="large">Condiciones</Text>
            <Text>Humedad: {day.avghumidity}%</Text>
            <Text>UV: {day.uv}</Text>
          </Stack>
        </Stack>
  
        <Separator />
        
        <Text variant="large">Pronóstico por hora</Text>
        <Stack horizontal verticalAlign="center">
          <IconButton
            iconProps={{ iconName: 'ChevronLeft' }}
            onClick={() => scrollHourly('left')}
            styles={{
              root: {
                height: '100%',
                margin: '0 10px'
              }
            }}
          />
          <div 
            ref={hourlyContainerRef}
            style={{ 
              overflowX: 'hidden',
              width: '100%',
              whiteSpace: 'nowrap',
              scrollBehavior: 'smooth',
              position: 'relative'
            }}
          >
            <Stack horizontal tokens={{ childrenGap: 10 }} style={{
              display: 'inline-flex',
              padding: '10px 0'
            }}>
              {selectedDay.hour.map((hour, index) => (
                <Card 
                  key={index} 
                  className={`${hourCardStyles} ${fadeIn}`}
                  style={{ 
                    width: 120,
                    flex: '0 0 auto',
                    padding: '10px',
                    margin: '0 5px',
                    cursor: 'pointer',
                    animationDelay: `${index * 50}ms`
                  }}
                  onClick={() => setSelectedHourContent(hour)}
                >
                  <Text variant="medium" style={{ fontWeight: 'bold' }}>
                    {hour.time ? new Date(hour.time.replace(' ', 'T')).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    }) : 'N/A'}
                  </Text>
                  <Icon 
                    iconName={weatherIconMap[hour.condition.text] || 'Weather'}
                    style={{ 
                      fontSize: 32,
                      color: '#0078d4',
                      margin: '8px 0'
                    }} 
                  />
                  <Text>
                    {hour.temp_c !== undefined ? 
                      `${formatTemperature(hour.temp_c)}°${getTempUnitSymbol()}` : 
                      'N/A'}
                  </Text>
                  <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
                    <Icon 
                      iconName="Drop" 
                      style={{ 
                        fontSize: 16,
                        color: '#0078d4'
                      }}
                    />
                    <Text>{hour.humidity !== undefined ? `${Math.round(hour.humidity)}%` : 'N/A'}</Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </div>
          <IconButton
            iconProps={{ iconName: 'ChevronRight' }}
            onClick={() => scrollHourly('right')}
            styles={{
              root: {
                height: '100%',
                margin: '0 10px'
              }
            }}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <Stack horizontal tokens={{ childrenGap: 20 }} wrap className={fadeIn}>
        {forecast.map((day, index) => (
          <Card
            key={index}
            className={`${cardStyles} ${slideUpIn}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => {
              setSelectedDay(day);
              setSelectedHourContent(null);
              setIsPanelOpen(true);
            }}
          >
            <Text variant="medium" style={{ fontWeight: 'bold' }}>
              {new Date(day.date).toLocaleDateString('es-ES', { weekday: 'long' })}
            </Text>
            <Icon 
              iconName={weatherIconMap[day.day.condition.code] || 'Weather'} 
              style={{ fontSize: 32, color: '#0078d4', margin: '8px 0' }} 
            />
            <Text>{day.day.condition.text}</Text>
            <Stack horizontal verticalAlign="space-between" style={{ marginTop: '8px' }}>
            <Text>Máx: {formatTemperature(day.day.maxtemp_c)}°{getTempUnitSymbol()}</Text>
            <Text>Mín: {formatTemperature(day.day.mintemp_c)}°{getTempUnitSymbol()}</Text>
            </Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }} style={{ marginTop: '8px' }}>
              <Icon 
                iconName="Up" 
                style={{ 
                  fontSize: 16, 
                  color: '#0078d4',
                  transform: `rotate(${getWindDirectionAngle(day.day.wind_degree)}deg)`
                }} 
              />
              <Text>{formatWindSpeed(day.day.maxwind_kph)} {getWindUnitSymbol()}</Text>
            </Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
            <Icon 
              iconName="Precipitation" 
              style={{ fontSize: 16, color: '#0078d4' }} 
            />
            <Text>{day.day.avghumidity}%</Text>
          </Stack>
          </Card>
        ))}
      </Stack>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => {
          setIsPanelOpen(false);
          setSelectedHourContent(null);
        }}
        type={PanelType.Small}
        headerText={selectedHourContent ? 
          `Pronóstico para las ${new Date(selectedHourContent.time.replace(' ', 'T')).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 
          "Detalles del pronóstico"
        }
        closeButtonAriaLabel="Cerrar"
        styles={{
          main: {
            animation: AnimationStyles.slideLeftIn400.toString()
          },
          content: {
            padding: 20
          }
        }}
      >
        {selectedHourContent ? (
          <div className={fadeIn}>
            {renderHourDetails()}
          </div>
        ) : (
          <div className={fadeIn}>
            {renderPanelContent()}
          </div>
        )}      
      </Panel>
    </>
  );
};

export default ForecastList;
import React from 'react';
import { Stack, Text, Icon, DefaultButton, mergeStyles, ThemeProvider } from '@fluentui/react';
import { weatherIconMap } from './utils';
import { lightTheme } from '../themes.js'; // Importa el tema desde WeatherApp

const airQualityIconMap = {
  'Buena': 'Emoji2', // Ícono para buena calidad del aire
  'Moderada': 'Info', // Ícono para calidad moderada
  'Mala': 'Warning', // Ícono para mala calidad del aire
  'Muy mala': 'Error', // Ícono para calidad muy mala
  'Peligrosa': 'Blocked2', // Ícono para calidad peligrosa
};

const ForecastDetailPanel = ({ selectedForecast, handleClosePanel }) => {
  const panelStyles = mergeStyles({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  });

  const cardStyles = mergeStyles({
    padding: '30px',
    maxWidth: '800px',
    width: '100%',
    margin: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0, 0, 120, 0.1)',
    position: 'relative',
    animation: 'fadeIn 0.3s ease-out',
  });

  const sectionStyles = mergeStyles({
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
  });

  const closeButtonStyles = mergeStyles({
    position: 'absolute',
    top: '12px',
    right: '12px',
    minWidth: '32px',
    height: '32px',
    padding: '0',
    borderRadius: '50%',
    backgroundColor: '#f3f2f1',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  });

  const getWindDirectionAngle = (direction) => {
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
  if (!selectedForecast) {
    return null; // No renderiza nada hasta que haya datos
  }
  return (
    <ThemeProvider theme={lightTheme}>
      <div className={`forecast-detail-panel ${panelStyles}`}>
        <Stack className={cardStyles}>
          {/* Botón de cerrar */}
          <DefaultButton
            iconProps={{ iconName: 'Cancel' }}
            className={closeButtonStyles}
            onClick={handleClosePanel}
            ariaLabel="Cerrar panel"
          />

          {/* Encabezado */}
          <Stack>
            <Text variant="xxLarge" style={{ fontWeight: 600 }}>{selectedForecast.date}</Text>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
              <Text variant="large">{selectedForecast.condition}</Text>
              <Icon
                iconName={weatherIconMap[selectedForecast.condition]}
                style={{ fontSize: 48, color: '#0078d4' }} // Ícono azul
                aria-label={selectedForecast.condition}
              />
            </Stack>
          </Stack>

          {/* Sección de temperatura */}
          <Stack className={sectionStyles}>
            <Text variant="medium" style={{ marginBottom: '8px' }}>TEMPERATURA</Text>
            <Stack horizontal tokens={{ childrenGap: 24 }}>
              <Stack>
                <Text variant="smallPlus">Máxima</Text>
                <Text variant="xLarge" style={{ fontWeight: 600 }}>{selectedForecast.high}°C</Text>
              </Stack>
              <Stack>
                <Text variant="smallPlus">Mínima</Text>
                <Text variant="xLarge" style={{ fontWeight: 600 }}>{selectedForecast.low}°C</Text>
              </Stack>
            </Stack>
          </Stack>

          {/* Sección de viento */}
          <Stack className={sectionStyles}>
            <Text variant="medium" style={{ marginBottom: '8px' }}>VIENTO</Text>
            <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
              <Icon
                iconName="Up"
                style={{
                  fontSize: 36,
                  transform: `rotate(${getWindDirectionAngle(selectedForecast.windDirection)}deg)`,
                  color: '#0078d4',
                }}
                aria-label={`Dirección del viento: ${selectedForecast.windDirection}`}
              />
              <Stack>
                <Text variant="smallPlus">Velocidad</Text>
                <Text variant="xLarge" style={{ fontWeight: 600 }}>{selectedForecast.windSpeed} km/h</Text>
                <Text variant="smallPlus">Dirección</Text>
                <Text variant="medium">{selectedForecast.windDirection}</Text>
              </Stack>
            </Stack>
          </Stack>

          {/* Sección de calidad del aire */}
          <Stack className={sectionStyles}>
            <Text variant="medium" style={{ marginBottom: '8px' }}>CALIDAD DEL AIRE</Text>
            <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
              <Icon
                iconName={airQualityIconMap[selectedForecast.airQuality]}
                style={{
                  fontSize: 36,
                  color: '#0078d4',
                }}
                aria-label={`Calidad del aire: ${selectedForecast.airQuality}`}
              />
              <Text variant="xLarge" style={{ fontWeight: 600 }}>{selectedForecast.airQuality}</Text>
            </Stack>
          </Stack>

          {/* Botón para cerrar */}
          <DefaultButton
            text="Cerrar"
            onClick={handleClosePanel}
            style={{ marginTop: '20px' }}
          />
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default ForecastDetailPanel;
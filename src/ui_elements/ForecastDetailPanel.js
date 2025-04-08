import React from 'react';
import { Stack, Text, Icon, DefaultButton } from '@fluentui/react';
import { airQualityIconMap, weatherIconMap, getWindDirectionAngle } from './utils';

const ForecastDetailPanel = ({ selectedForecast, handleClosePanel }) => {
  return (
    <div className="forecast-detail-panel" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Stack style={{ padding: 20, maxWidth: 800, margin: 'auto', backgroundColor: '#ffffff', borderRadius: 4 }}>
        <Text variant="xxLarge">{selectedForecast.date}</Text>
        <Text variant="large">Condición: {selectedForecast.condition}</Text>
        <Text variant="medium">Máxima: {selectedForecast.high}°C</Text>
        <Text variant="medium">Mínima: {selectedForecast.low}°C</Text>
        <Text variant="medium">Viento: {selectedForecast.windSpeed} km/h</Text>
        <Text variant="medium">Humedad: {selectedForecast.humidity}%</Text>
        <Text variant="medium">Presión: {selectedForecast.pressure} hPa</Text>

        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Icon 
            iconName={airQualityIconMap[selectedForecast.airQuality]} 
            style={{ fontSize: 20, color: '#0078d4' }} 
            aria-label={selectedForecast.airQuality} 
          />
          <Text variant="medium">Calidad del aire: {selectedForecast.airQuality}</Text>
        </Stack>

        <DefaultButton text="Cerrar" onClick={handleClosePanel} style={{ marginTop: 20 }} />
      </Stack>
    </div>
  );
};

export default ForecastDetailPanel;

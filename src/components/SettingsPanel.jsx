// src/components/SettingsPanel.jsx
import React from 'react';
import { 
  Panel, 
  PanelType, 
  Stack, 
  Text, 
  Toggle, 
  ChoiceGroup 
} from '@fluentui/react';

const SettingsPanel = ({
  isOpen,
  onDismiss,
  darkMode,
  handleToggleDarkMode,
  temperatureUnit,
  handleTemperatureUnitChange,
  windUnit,
  handleWindUnitChange,
  showComparison,
  toggleComparison,
  comparisonCity,
  showUVPanel,
  toggleUVPanel,
  hasUVData
}) => {
  // Options for temperature units
  const temperatureOptions = [
    { key: 'celsius', text: '°C' },
    { key: 'fahrenheit', text: '°F' }
  ];

  // Options for wind units
  const windOptions = [
    { key: 'kmh', text: 'km/h' },
    { key: 'mph', text: 'mph' }
  ];

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Configuración"
      type={PanelType.medium}
      closeButtonAriaLabel="Cerrar"
      styles={{
        main: {
          transition: 'background-color 0.5s ease',
        },
        content: {
          transition: 'color 0.5s ease',
        }
      }}
    >
      <Stack tokens={{ childrenGap: 20, padding: 10 }}>
        <Stack>
          <Text variant="large">Tema</Text>
          <Toggle 
            label={darkMode ? "Modo oscuro" : "Modo claro"}
            checked={darkMode} 
            onChange={handleToggleDarkMode}
            styles={{
              root: {
                marginTop: 10,
              },
              pill: {
                transition: 'background-color 0.3s ease',
              }
            }}
            onText="Activado"
            offText="Desactivado"
          />
        </Stack>
        
        <Stack>
          <Text variant="large">Unidad de temperatura</Text>
          <ChoiceGroup 
            selectedKey={temperatureUnit} 
            options={temperatureOptions} 
            onChange={handleTemperatureUnitChange} 
          />
        </Stack>
        <Stack>
          <Text variant="large">Unidad de viento</Text>
          <ChoiceGroup 
            selectedKey={windUnit} 
            options={windOptions} 
            onChange={handleWindUnitChange} 
          />
        </Stack>
        <Stack>
          <Text variant="large">Opciones adicionales</Text>
          <Toggle 
              label="Comparar con otra ciudad" 
              checked={showComparison} 
              onChange={toggleComparison}
            
            styles={{
              pill: {
                transition: 'background-color 0.3s ease',
              }
            }}
          />
          
        </Stack>
      </Stack>
    </Panel>
  );
};

export default SettingsPanel;
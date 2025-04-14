// src/components/SettingsPanel.jsx
import React from 'react';
import { 
  Panel, 
  PanelType, 
  Stack, 
  Text, 
  Toggle, 
  ChoiceGroup, 
  Separator,
  Link,
  Image
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
          label="Mostrar botón de comparación" 
          checked={showComparison}  // Now we can use checked prop
          onChange={toggleComparison}
          styles={{
            root: {
              marginTop: 10,
            },
            pill: {
              transition: 'background-color 0.3s ease',
            }
          }}
          onText="Visible"
          offText="Oculto"
        />
          
        </Stack>
      </Stack>
      <Separator>
      
      </Separator>
      <Stack 
        horizontal 
        horizontalAlign="center" 
        verticalAlign="center" 
        tokens={{ childrenGap: 20 }}
        styles={{
          root: {
            padding: '16px',
            marginTop: '8px'
          }
        }}
      >
        <Text 
          variant="medium" 
          styles={{
            root: {
              color: darkMode ? '#ffffff' : '#000000'
            }
          }}
        >
          Photos provided by
        </Text>
        <Link 
          href="https://www.pexels.com" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image 
            src={darkMode 
              ? "https://www.pexels.com/assets/static/images/meta/pexels-logo-white.svg" 
              : "https://www.pexels.com/assets/static/images/meta/pexels-logo.svg"
            }
            alt="Pexels Logo"
            width={80}
            height={120}
            styles={{
              root: {
                marginLeft: 4,
                filter: darkMode ? 'brightness(1)' : 'none',
                 display: 'flex',
                alignItems: 'center'
              },
              image: {
                objectFit: 'contain'
              }
            }}
          />
        </Link>
      </Stack>
       {/* Second section - WeatherAPI */}
  <Stack horizontal horizontalAlign="center" 
         verticalAlign="center" tokens={{ childrenGap: 10 }}>
    <Text 
      variant="medium" 
      styles={{
        root: {
          color: darkMode ? '#ffffff' : '#000000'
        }
      }}
    >
      Weather data by
    </Text>
    <Link 
      href="https://www.weatherapi.com/" 
      target="_blank"
      rel="noopener noreferrer"
      title="Free Weather API"
    >
      <Image 
        src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
        alt="Weather data by WeatherAPI.com"
        width={80}
        height={120}
        styles={{
          root: {
            marginLeft: 6,
            backgroundColor: darkMode ? '#ffffff' : 'transparent',
            padding: darkMode ? '4px 8px' : 0,
            borderRadius: darkMode ? '4px' : 0,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          image: {
            objectFit: 'contain'
          }
        }}
      />
    </Link>
  </Stack>
    </Panel>
  );
};

export default SettingsPanel;
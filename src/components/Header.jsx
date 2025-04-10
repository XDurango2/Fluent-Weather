import React from 'react';
import { Stack, Text, Toggle } from '@fluentui/react';

const Header = ({ darkMode, onToggleDarkMode }) => {
  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <Text variant="xxLarge" style={{ color: darkMode ? '#ffffff' : '#000000' }}>FluentWeather</Text>
      <Toggle
        label="Modo oscuro"
        checked={darkMode}
        onChange={onToggleDarkMode}
        onText="On"
        offText="Off"
      />
    </Stack>
  );
};

export default Header;
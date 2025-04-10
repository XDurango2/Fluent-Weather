import React from 'react';
import { Stack, Text, Toggle } from '@fluentui/react';

const Header = ({ darkMode }) => {
  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <Text variant="xxLarge" style={{ color: darkMode ? '#ffffff' : '#000000' }}>FluentWeather</Text>
      
    </Stack>
  );
};

export default Header;
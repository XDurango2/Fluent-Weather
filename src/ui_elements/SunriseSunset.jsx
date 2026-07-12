import React from 'react';
import { Stack, Text, Icon } from '@fluentui/react';

const SunriseSunset = ({ astro }) => {
  if (!astro || (!astro.sunrise && !astro.sunset)) return null;

  return (
    <Stack style={{ marginTop: 20 }}>
      <Text variant="large">Amanecer y Atardecer</Text>

      <Stack horizontal tokens={{ childrenGap: 16 }} style={{ marginTop: 10 }}>
        <Stack
          horizontal
          verticalAlign="center"
          tokens={{ childrenGap: 10 }}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 4,
            backgroundColor: 'rgba(247, 181, 0, 0.15)',
          }}
        >
          <Icon iconName="Sunny" style={{ fontSize: 28, color: '#F7B500' }} />
          <Stack>
            <Text variant="small" style={{ opacity: 0.8 }}>Amanecer</Text>
            <Text variant="large" style={{ fontWeight: 'bold' }}>{astro.sunrise}</Text>
          </Stack>
        </Stack>

        <Stack
          horizontal
          verticalAlign="center"
          tokens={{ childrenGap: 10 }}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 4,
            backgroundColor: 'rgba(210, 105, 30, 0.15)',
          }}
        >
          <Icon iconName="Sunny" style={{ fontSize: 28, color: '#D2691E' }} />
          <Stack>
            <Text variant="small" style={{ opacity: 0.8 }}>Atardecer</Text>
            <Text variant="large" style={{ fontWeight: 'bold' }}>{astro.sunset}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SunriseSunset;

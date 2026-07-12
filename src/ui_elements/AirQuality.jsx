import React, { useState } from 'react';
import { Stack, Text, Icon, Panel, PanelType } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { airQualityIconMap, getAirQualityLabel } from './utils';

const aqiColors = {
  1: { background: '#299501', text: 'black' },
  2: { background: '#F7E401', text: 'black' },
  3: { background: '#F95901', text: 'white' },
  4: { background: '#D90011', text: 'white' },
  5: { background: '#6C49CB', text: 'white' },
  6: { background: '#7E0023', text: 'white' },
};

const pollutants = [
  { key: 'co', label: 'CO' },
  { key: 'no2', label: 'NO₂' },
  { key: 'o3', label: 'O₃' },
  { key: 'so2', label: 'SO₂' },
  { key: 'pm2_5', label: 'PM2.5' },
  { key: 'pm10', label: 'PM10' },
];

const AirQuality = ({ airQuality, darkMode }) => {
  const { t } = useTranslation();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  if (!airQuality) return null;

  const index = airQuality['us-epa-index'];
  const colors = aqiColors[index] || aqiColors[1];

  return (
    <Stack style={{ marginTop: 20 }}>
      <Text variant="large">{t('airQuality.title')}</Text>

      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 12 }}
        style={{
          marginTop: 10,
          padding: '12px 16px',
          borderRadius: 4,
          backgroundColor: colors.background,
          color: colors.text,
          cursor: 'pointer',
        }}
        onClick={() => setIsPanelOpen(true)}
      >
        <Icon iconName={airQualityIconMap[index]} style={{ fontSize: 28 }} />
        <Stack style={{ flex: 1 }}>
          <Text variant="xLarge" style={{ fontWeight: 'bold', color: colors.text }}>
            {getAirQualityLabel(index, t)}
          </Text>
          <Text variant="small" style={{ color: colors.text }}>
            {t('airQuality.epaIndex')}: {index ?? 'N/D'}
          </Text>
        </Stack>
        <Icon iconName="ChevronRight" style={{ fontSize: 14, color: colors.text }} />
      </Stack>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        headerText={t('airQuality.detailsTitle')}
        type={PanelType.Small}
        closeButtonAriaLabel={t('common.close')}
        styles={{
          main: {
            backgroundColor: darkMode ? '#202020' : '#F3F2F1',
            color: darkMode ? '#ffffff' : '#000000',
          },
        }}
      >
        <Stack tokens={{ childrenGap: 15 }}>
          {pollutants.map(({ key, label }) => (
            <Stack key={key} horizontal horizontalAlign="space-between">
              <Text>{label}:</Text>
              <Text>
                {airQuality[key] !== undefined ? `${airQuality[key].toFixed(1)} μg/m³` : 'N/D'}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Panel>
    </Stack>
  );
};

export default AirQuality;

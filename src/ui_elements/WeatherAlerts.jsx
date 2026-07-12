import React from 'react';
import { Stack, Text, Icon, mergeStyles } from '@fluentui/react';

const severityStyles = {
  Extreme: { color: '#ffffff', backgroundColor: '#a80000', icon: 'AlertSolid' },
  Severe: { color: '#ffffff', backgroundColor: '#d13438', icon: 'Warning' },
  Moderate: { color: '#000000', backgroundColor: '#f7e401', icon: 'Warning' },
  Minor: { color: '#000000', backgroundColor: '#c3e4b5', icon: 'Info' },
};

const getSeverityStyle = (severity) => severityStyles[severity] || severityStyles.Minor;

const formatAlertDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const WeatherAlerts = ({ alerts, darkMode }) => {
  const alertList = alerts?.alert || [];

  if (alertList.length === 0) {
    return null;
  }

  return (
    <Stack tokens={{ childrenGap: 10 }} style={{ marginTop: 20 }}>
      {alertList.map((alert, index) => {
        const style = getSeverityStyle(alert.severity);
        const cardClass = mergeStyles({
          backgroundColor: style.backgroundColor,
          color: style.color,
          borderRadius: 4,
          padding: 16,
        });
        const effective = formatAlertDate(alert.effective);
        const expires = formatAlertDate(alert.expires);

        return (
          <Stack key={index} className={cardClass} tokens={{ childrenGap: 8 }}>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
              <Icon iconName={style.icon} style={{ fontSize: 24 }} />
              <Text variant="large" style={{ fontWeight: 'bold', color: style.color }}>
                {alert.headline || alert.event}
              </Text>
            </Stack>

            {(effective || expires) && (
              <Text variant="small" style={{ color: style.color }}>
                {effective && `Desde: ${effective}`}
                {effective && expires && ' — '}
                {expires && `Hasta: ${expires}`}
              </Text>
            )}

            {alert.areas && (
              <Text variant="small" style={{ color: style.color }}>
                Áreas afectadas: {alert.areas}
              </Text>
            )}

            {alert.desc && <Text style={{ color: style.color }}>{alert.desc}</Text>}

            {alert.instruction && (
              <Text style={{ color: style.color, fontStyle: 'italic' }}>
                {alert.instruction}
              </Text>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default WeatherAlerts;

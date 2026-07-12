import React, { useState } from 'react';
import { Stack, Text, Icon, Panel, PanelType, mergeStyles } from '@fluentui/react';

const severityStyles = {
  Extreme: { color: '#ffffff', backgroundColor: '#a80000', icon: 'AlertSolid' },
  Severe: { color: '#ffffff', backgroundColor: '#d13438', icon: 'Warning' },
  Moderate: { color: '#000000', backgroundColor: '#f7e401', icon: 'Warning' },
  Minor: { color: '#000000', backgroundColor: '#c3e4b5', icon: 'Info' },
};

const severityOrder = ['Extreme', 'Severe', 'Moderate', 'Minor'];

const getSeverityStyle = (severity) => severityStyles[severity] || severityStyles.Minor;

const getMostSevere = (alertList) => {
  return alertList.reduce((worst, alert) => {
    const worstRank = severityOrder.indexOf(worst?.severity);
    const rank = severityOrder.indexOf(alert.severity);
    if (worstRank === -1) return alert;
    if (rank !== -1 && rank < worstRank) return alert;
    return worst;
  }, alertList[0]);
};

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

const AlertCard = ({ alert }) => {
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
    <Stack className={cardClass} tokens={{ childrenGap: 8 }}>
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
};

const WeatherAlerts = ({ alerts, darkMode }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const alertList = alerts?.alert || [];

  if (alertList.length === 0) {
    return null;
  }

  if (alertList.length <= 2) {
    return (
      <Stack tokens={{ childrenGap: 10 }} style={{ marginTop: 20 }}>
        {alertList.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
      </Stack>
    );
  }

  const summaryStyle = getSeverityStyle(getMostSevere(alertList).severity);

  return (
    <Stack style={{ marginTop: 20 }}>
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 12 }}
        style={{
          padding: '12px 16px',
          borderRadius: 4,
          backgroundColor: summaryStyle.backgroundColor,
          color: summaryStyle.color,
          cursor: 'pointer',
        }}
        onClick={() => setIsPanelOpen(true)}
      >
        <Icon iconName={summaryStyle.icon} style={{ fontSize: 24 }} />
        <Text variant="large" style={{ fontWeight: 'bold', color: summaryStyle.color, flex: 1 }}>
          Ver alertas meteorológicas ({alertList.length})
        </Text>
        <Icon iconName="ChevronRight" style={{ fontSize: 14, color: summaryStyle.color }} />
      </Stack>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        headerText="Alertas Meteorológicas"
        type={PanelType.medium}
        closeButtonAriaLabel="Cerrar"
        styles={{
          main: {
            backgroundColor: darkMode ? '#202020' : '#F3F2F1',
            color: darkMode ? '#ffffff' : '#000000',
          },
        }}
      >
        <Stack tokens={{ childrenGap: 10 }}>
          {alertList.map((alert, index) => (
            <AlertCard key={index} alert={alert} />
          ))}
        </Stack>
      </Panel>
    </Stack>
  );
};

export default WeatherAlerts;

import React from 'react';
import { Text } from '@fluentui/react';

const UVHourly = ({ hourlyData, darkMode }) => {
  return (
    <>
      <Text variant="mediumPlus">Horario del índice UV para hoy:</Text>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: 10,
        padding: '10px 0'
      }}>
        {hourlyData.map(hour => (
          <div key={hour.key} style={{
            padding: 10,
            backgroundColor: darkMode ? '#3d3d3d' : '#f0f0f0',
            borderRadius: 4,
            minWidth: 100,
            textAlign: 'center'
          }}>
            <Text>{hour.time}</Text>
            <Text variant="large">{hour.uvIndex}</Text>
            <div style={{
              width: '100%',
              height: 5,
              backgroundColor:
                hour.uvIndex <= 2 ? '#299501' :
                hour.uvIndex <= 5 ? '#F7E401' :
                hour.uvIndex <= 7 ? '#F95A01' :
                hour.uvIndex <= 10 ? '#D90011' : '#6C49CB'
            }}></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UVHourly;
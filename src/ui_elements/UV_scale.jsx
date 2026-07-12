import React from 'react';
import { Stack, Text } from '@fluentui/react';
import { useTranslation } from 'react-i18next';

const UVScale = ({ uvIndex }) => {
  const { t } = useTranslation();

  // Asegurarse de que uvIndex es un número
  const numericUvIndex = Number(uvIndex);

  // Redondeamos el índice UV para asegurarnos de que es un número entero
  const roundedUvIndex = Math.round(numericUvIndex);

  // Definimos los rangos de UV y sus colores correspondientes
  const uvRanges = [
    { min: 0, max: 2, label: t('uv.low'), color: '#299501', textColor: 'black' },
    { min: 3, max: 5, label: t('uv.moderate'), color: '#F7E401', textColor: 'black' },
    { min: 6, max: 7, label: t('uv.high'), color: '#F95901', textColor: 'white' },
    { min: 8, max: 10, label: t('uv.veryHigh'), color: '#D90011', textColor: 'white' },
    { min: 11, max: 20, label: t('uv.extreme'), color: '#6C49CB', textColor: 'white' }
  ];

  // Encontramos el rango actual basado en el índice UV
  const currentRange = uvRanges.find(range =>
    roundedUvIndex >= range.min && roundedUvIndex <= range.max
  ) || uvRanges[0]; // Por defecto, usar el primer rango si no coincide

  // Calculamos la posición del indicador en la escala (0-100%)
  const maxUV = 11; // Consideramos 11 como el máximo para el cálculo de la posición
  const position = Math.min((roundedUvIndex / maxUV) * 100, 100);

  return (
    <Stack style={{ marginTop: 20, marginBottom: 20 }}>
      <Text variant="large">{t('uv.index')}: {numericUvIndex} - {currentRange.label}</Text>

      {/* Contenedor de la escala */}
      <Stack style={{ position: 'relative', marginTop: 10, height: 50 }}>
        {/* Escala de colores */}
        <Stack horizontal style={{ height: '30px', width: '100%', borderRadius: '4px', overflow: 'hidden' }}>
          {uvRanges.map((range, index) => {
            // Calculamos el ancho proporcional de cada segmento
            const rangeSpan = range.max - range.min + 1;
            const totalSpan = uvRanges.reduce((acc, r) => acc + (r.max - r.min + 1), 0);
            const width = `${(rangeSpan / totalSpan) * 100}%`;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: range.color,
                  width,
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  padding: '0 2px'
                }}
              >
                <Text
                  style={{
                    color: range.textColor,
                    fontWeight: currentRange === range ? 'bold' : 'normal',
                    fontSize: 'clamp(8px, 2.5vw, 12px)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {range.label}
                </Text>
              </div>
            );
          })}
        </Stack>

        {/* Indicador del valor actual (triángulo/flecha) */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${position}% - 10px)`,
            top: '30px',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid black',
            transition: 'left 0.3s ease-in-out'
          }}
        />

        {/* Valor numérico actual con rectángulo de fondo */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${position}% - 15px)`,
            top: '-20px',
            backgroundColor: currentRange.color,
            color: currentRange.textColor,
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'left 0.3s ease-in-out'
          }}
        >
          {roundedUvIndex}
        </div>
      </Stack>

      {/* Escala numérica */}
      <Stack horizontal style={{ justifyContent: 'space-between', marginTop: '5px' }}>
        {[0, 3, 6, 8, 11].map((value, index) => (
          <Text key={index} style={{ fontSize: '12px' }}>{value}</Text>
        ))}
      </Stack>

      {/* Recomendación basada en el índice UV */}
      <Text style={{ marginTop: 10 }}>
        {numericUvIndex <= 2 && t('uv.adviceLow')}
        {numericUvIndex >= 3 && numericUvIndex <= 5 && t('uv.adviceModerate')}
        {numericUvIndex >= 6 && numericUvIndex <= 7 && t('uv.adviceHigh')}
        {numericUvIndex >= 8 && numericUvIndex <= 10 && t('uv.adviceVeryHigh')}
        {numericUvIndex >= 11 && t('uv.adviceExtreme')}
      </Text>
    </Stack>
  );
};

export default UVScale;

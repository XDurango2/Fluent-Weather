// SearchForm.js
import React from 'react';
import { Stack, TextField, DefaultButton, IconButton, Spinner, SpinnerSize } from '@fluentui/react';

const SearchForm = ({ searchCity, setSearchCity, handleSearch, getCurrentLocationWeather, locating }) => {
  return (
    <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center" style={{ marginBottom: 20 }}>
      <TextField
        placeholder="Buscar ciudad..."
        value={searchCity}
        onChange={(e, newValue) => setSearchCity(newValue || '')}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <DefaultButton text="Buscar" onClick={handleSearch} />
      {locating ? (
        <Spinner size={SpinnerSize.small} />
      ) : (
        <IconButton
          iconProps={{ iconName: 'Location' }}
          title="Usar mi ubicación actual"
          ariaLabel="Usar mi ubicación actual"
          onClick={getCurrentLocationWeather}
        />
      )}
    </Stack>
  );
};

export default SearchForm;

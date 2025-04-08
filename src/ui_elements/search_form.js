// SearchForm.js
import React from 'react';
import { Stack, TextField, DefaultButton } from '@fluentui/react';

const SearchForm = ({ searchCity, setSearchCity, handleSearch }) => {
  return (
    <Stack horizontal tokens={{ childrenGap: 10 }} style={{ marginBottom: 20 }}>
      <TextField 
        placeholder="Buscar ciudad..." 
        value={searchCity} 
        onChange={(e, newValue) => setSearchCity(newValue || '')} 
      />
      <DefaultButton text="Buscar" onClick={handleSearch} />
    </Stack>
  );
};

export default SearchForm;

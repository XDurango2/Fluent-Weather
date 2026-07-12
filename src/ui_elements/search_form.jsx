// SearchForm.js
import React from 'react';
import { Stack, TextField, DefaultButton, IconButton, Spinner, SpinnerSize } from '@fluentui/react';
import { useTranslation } from 'react-i18next';

const SearchForm = ({ searchCity, setSearchCity, handleSearch, getCurrentLocationWeather, locating }) => {
  const { t } = useTranslation();

  return (
    <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center" style={{ marginBottom: 20 }}>
      <TextField
        placeholder={t('search.placeholder')}
        value={searchCity}
        onChange={(e, newValue) => setSearchCity(newValue || '')}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <DefaultButton text={t('search.button')} onClick={handleSearch} />
      {locating ? (
        <Spinner size={SpinnerSize.small} />
      ) : (
        <IconButton
          iconProps={{ iconName: 'Location' }}
          title={t('search.useLocation')}
          ariaLabel={t('search.useLocation')}
          onClick={getCurrentLocationWeather}
        />
      )}
    </Stack>
  );
};

export default SearchForm;

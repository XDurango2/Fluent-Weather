import React from 'react';
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the initial loading state', () => {
  render(<App />);
  const loadingText = screen.getByText(/Cargando datos del clima/i);
  expect(loadingText).toBeInTheDocument();
});
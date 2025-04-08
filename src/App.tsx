// App.tsx - Punto de entrada principal
import React from 'react';
import WeatherApp from './WeatherApp';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <WeatherApp />
    </div>
  );
};

export default App;
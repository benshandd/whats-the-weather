import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || 'Unable to fetch weather data');
      }
    } catch (error) {
      setError('An error occurred while fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <label htmlFor="cityInput">Enter City:</label>
        <input
          type="text"
          id="cityInput"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
    </div>
  );
};

export default WeatherApp;

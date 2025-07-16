import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');
   const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  function handleCity(evt) {
    setCity(evt.target.value);
  }

  function getWeather() {
    const weatherData = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    weatherData.then(function (success) {
      console.log(success.data);
      setWeather(success.data.weather[0].main);
      setTemp(success.data.main.temp);
      setDesc(success.data.weather[0].description);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">🌤️ Weather Report</h1>
        <p className="mb-4 text-gray-600">Get current weather details for your city.</p>

        <div className="flex gap-2 mb-4">
          <input
            onChange={handleCity}
            type="text"
            placeholder="Enter city name"
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={getWeather}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Get Report
          </button>
        </div>

        {weather && (
          <div className="bg-gray-100 p-4 rounded-md mt-4 shadow-inner">
            <h2 className="text-xl font-semibold mb-1">🌍 {city.toUpperCase()}</h2>
            <p className="text-gray-700"><b>Weather:</b> {weather}</p>
            <p className="text-gray-700"><b>Temperature:</b> {temp} °C</p>
            <p className="text-gray-700"><b>Description:</b> {desc}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;

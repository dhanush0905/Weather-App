import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';




const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  const [weatherData, setWeatherData] = useState({
    temp: '24',
    location: 'London',
    humidity: '64%',
    wind: '18 km/h'
  });


  //process.env.api_key;
 
  const search = async () => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    if (city === "") return;

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);
      let data = await response.json();

      setWeatherData({
        temp: `${Math.round(data.main.temp)}°C`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} km/h`
      });

      let condition = data.weather[0].main;

    switch (condition) {
    case "Clouds":
        setWeatherIcon(cloud_icon);
        break;
    case "Clear":
        setWeatherIcon(clear_icon);
        break;
    case "Rain":
        setWeatherIcon(rain_icon);
        break;
    case "Drizzle":
        setWeatherIcon(drizzle_icon);
        break;
    case "Snow":
        setWeatherIcon(snow_icon);
        break;
    default:
        setWeatherIcon(cloud_icon); // fallback
    }

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='container'>
      <div className="top-bar">
        <input
          type='text'
          className='cityInput'
          placeholder='Search'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt='search' />
        </div>
      </div>

      <div className="weather-image">
        <img src={weatherIcon} alt="weather icon" />
      </div>

      <div className="weather-temp">{weatherData.temp}</div>
      <div className="weather-location">{weatherData.location}</div>

      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt='humidity' className='icon' />
          <div className='data'>
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt='wind-rate' className='icon' />
          <div className='data'>
            <div className="humidity-percentage">{weatherData.wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

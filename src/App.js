import React, { useState } from 'react';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        const apiKey = '32da5625d3242c7e9850b59a89bb95de'; // Your API Key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                setWeather(data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo" />
                <h1>Weather App</h1>
                <h2 className="user-name">Welcome, Shruti Shinde</h2>
                <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter City" 
                    className="city-input"
                />
                <button onClick={fetchWeather} className="search-button">Get Weather</button>
            </header>
            
            {weather && (
                <div className="weather-card">
                    <h2>{weather.name}</h2>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                        alt={weather.weather[0].description} 
                        className="weather-icon"
                    />
                    <p className="temperature">{weather.main.temp} °C</p>
                    <p>Humidity: {weather.main.humidity} %</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <p>Description: {weather.weather[0].description}</p>
                    <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
            )}

            <footer className="app-footer">
                <h3>Weather Quote</h3>
                <p>Sunshine is delicious, rain is refreshing, wind braces us up,
                    snow is exhilarating; there is really no such thing as bad weather, 
                    only different kinds of good weather.
                </p>
                <div className="weather-image-container">
                    <div className="weather-image weather-image-1" />
                    <div className="weather-image weather-image-2" />
                    <div className="weather-image weather-image-3" />
                </div>
            </footer>
        </div>
    );
}

export default App;

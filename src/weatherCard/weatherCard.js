import React from "react";
import moment from "moment";

const WeatherCard = ({ weatherData }) => {
  const getCurrentDate = (separator = " ") => {
    let newDate = new Date();

    return moment(newDate).format("MMM Do YYYY");
  };

  const getTempC = (tempK) => {
    return Math.round(tempK);
  };

  if (!weatherData) return <div>Loading...</div>;
  return (
    <div className="weather-info-inner">
      <h2 className="city-name">{weatherData.name}</h2>
      <h3 className="tempe">{getTempC(weatherData.main.temp)} ºC</h3>

      <div className="weather-info-bottom">
        <div className="weather-info-detail">
          <h3 className="humidity">
            Humidity
            <br />
            {weatherData.main.humidity}
          </h3>
          <h3 className="description">
            {weatherData.weather[0].main}
            <img
              className="weather-img"
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            />
          </h3>
        </div>
        <div className="date">{getCurrentDate()}</div>
      </div>
    </div>
  );
};

export default WeatherCard;

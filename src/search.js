import React, { useState } from "react";
import axios from "axios";
import { Blocks } from "react-loader-spinner";

export default function Search() {
  let [city, setCity] = useState();
  let [isLoading, setLoaded] = useState(false);
  let [temperature, setTemperature] = useState();
  let [description, setDescription] = useState();
  let [humidity, setHumidity] = useState();
  let [wind, setWind] = useState();
  let [temperatureIcon, setTemperatureIcon] = useState();
  function updateTemparature(response) {
    setLoaded(true);
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setTemperatureIcon(
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    setLoaded(false);
  }

  function searchCity(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5f472b7acba333cd8a035ea85a0d4d4c`;

    axios.get(url).then(updateTemparature);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={searchCity}>
        <input type="text" onChange={updateCity}></input>
        <button type="submit">search</button>
      </form>
      {isLoading ? (
         <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        /> 
      ) : (
        ""
      )}
      {temperature ? (
        <ul>
          <li>Temperature:{temperature}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity} km/h</li>
          <li>Wind:{wind} km/h</li>
          <img src={temperatureIcon} alt="weather icon" />
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

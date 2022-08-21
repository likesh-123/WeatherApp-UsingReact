import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Pune");

  const [tempInfo, steTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8609b4c6b248fadbf40592006d074809`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + data.name + "')";
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

      steTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input className="searchTerm" type="search" placeholder="search..." autofocus id="search" value={searchValue} onKeyPress={(e) => { if (e.key === "Enter") getWeatherInfo(); }} onChange={(e) => setSearchValue(e.target.value)} />
          <button className="searchButton" type="button" onClick={getWeatherInfo} > Search </button>
        </div>
      </div>

      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;

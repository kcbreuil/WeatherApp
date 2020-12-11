import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import '../styles/style.css';

const SingleCity = (props) => {
  const [singleCity, setSingleCity] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://wyn-weather-api.herokuapp.com/cities/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setSingleCity(data);
      });
  }, [id]);

  return (
    <>
      <h1>{singleCity.name}</h1>
      <div className="forecasts">
        {singleCity.forecasts?.map((forecast, i) => (
          <div className="forecast" key={i}>
            <h1>{forecast.date}</h1>
            <h2>{forecast.weather}</h2>
            <img src={forecast.image} alt={forecast.weather} />
            <h3>Low: {forecast.min_temp.toFixed()}°</h3>
            <h3>High: {forecast.max_temp.toFixed()}°</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleCity;

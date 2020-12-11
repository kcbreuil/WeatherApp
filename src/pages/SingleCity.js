import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import '../styles/style.css';

const SingleCity = (props) => {
  const [singleCity, setSingleCity] = useState([]);
  const [toggleTemp, setToggleTemp] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://wyn-weather-api.herokuapp.com/cities/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setSingleCity(data);
      });
  }, [id]);
  const handleTemp = () => {
    if (toggleTemp === 'Celsius') {
      setToggleTemp('Fahrenheit');
    } else {
      setToggleTemp('Celsius');
    }
  };
  return (
    <>
      <h1>{singleCity.name}</h1>
      <div className="forecasts">
        {singleCity.forecasts?.map((forecast, i) => (
          <div className="forecast" key={i}>
            <h1>{forecast.date}</h1>
            <h2>{forecast.weather}</h2>
            <img src={forecast.image} alt={forecast.weather} />
            <h3>
              Low:{' '}
              {toggleTemp === 'Celsius'
                ? forecast.min_temp.toFixed()
                : (1.8 * forecast.min_temp + 32).toFixed()}
              °
            </h3>
            <h3>
              High:{' '}
              {toggleTemp === 'Celsius'
                ? forecast.max_temp.toFixed()
                : (1.8 * forecast.max_temp + 32).toFixed()}
              °
            </h3>
          </div>
        ))}
      </div>
      <footer>
        <Link to="/">Back to Search</Link>
        <button onClick={handleTemp}>
          {toggleTemp === 'Celsius' ? 'View in Fahrenheit' : 'View in Celsius'}
        </button>
      </footer>
    </>
  );
};

export default SingleCity;

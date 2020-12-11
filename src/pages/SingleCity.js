import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import '../styles/style.css';
import LoadingContent from '../components/Loading';

const SingleCity = (props) => {
  const [singleCity, setSingleCity] = useState([]);
  const [toggleTemp, setToggleTemp] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://wyn-weather-api.herokuapp.com/cities/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setSingleCity(data);
        setLoading(false);
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
      {loading ? (
        <LoadingContent containerProps={props} />
      ) : (
        <div>
          <h1>{singleCity.name}</h1>
          <div className="forecasts">
            {singleCity.forecasts?.map((forecast, i) => (
              <div className="forecast" key={i}>
                <h3>{moment(forecast.date).format('MMM D')}</h3>
                <h2>{forecast.weather}</h2>
                <img src={forecast.image} alt={forecast.weather} />
                <span>
                  <h5>
                    Low:{' '}
                    {toggleTemp === 'Celsius'
                      ? forecast.min_temp.toFixed()
                      : (1.8 * forecast.min_temp + 32).toFixed()}
                    °
                  </h5>
                  <h5>
                    High:{' '}
                    {toggleTemp === 'Celsius'
                      ? forecast.max_temp.toFixed()
                      : (1.8 * forecast.max_temp + 32).toFixed()}
                    °
                  </h5>
                  <h5>Humidity: {forecast.humidity}%</h5>
                </span>
              </div>
            ))}
          </div>
          <footer>
            <Link to="/">Back to Search</Link>
            <button className="fill" onClick={handleTemp}>
              {toggleTemp === 'Celsius'
                ? 'View in Fahrenheit'
                : 'View in Celsius'}
            </button>
          </footer>
        </div>
      )}
    </>
  );
};

export default SingleCity;

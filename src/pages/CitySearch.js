import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import '../styles/style.css';

const CitySearch = () => {
  const [citySearch, setCitySearch] = useState([]);

  const handleSearch = (e) => {
    fetch(
      `https://wyn-weather-api.herokuapp.com/cities?query=${e.target.value}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setCitySearch(data);
      });
  };

  return (
    <>
      <header>
        <h1>WeatherApp</h1>
      </header>
      <div className="center">
        <h1>City Search</h1>
        <input type="text" onChange={handleSearch} />
        {citySearch.map((city) => (
          <div classname="results" key={city.id}>
            <Link to={`/cities/${city.id}`}>{city.name}</Link>
          </div>
        ))}
      </div>
      <footer className="icon">
        <FontAwesomeIcon icon={faCloud} />
      </footer>
    </>
  );
};

export default CitySearch;

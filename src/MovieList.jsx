import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './movielist.css'; 

const MovieList = () => {
  const movies = useSelector((state) => state.movie);
  const navigate = useNavigate();

  const handleBooking = (movieName) => {
    navigate(`/booking/${movieName}`);
  };

  return (
    <div className="container">
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies?.map(val => (
          <div key={val.name} className="movie-item">
            <h2 className="movie-title">{val.name}</h2>
            <p className="movie-description">Available Tickets: {val.availableTickets}</p>
            <button onClick={() => handleBooking(val.name)} className="button">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

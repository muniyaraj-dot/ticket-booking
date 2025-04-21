import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingUser } from './MovieSlice';
import { setCurrentUser } from './userSlice';
import './movielist.css'
const Booking = () => {
  const { movieName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user.currentUser);
  const movie = useSelector(store => store.movie.find(val => val.name === movieName));
  const movieBooked = movie.bookedUsers.find(val => (val.userName === user.name) && (val.userPassword === user.password))?.seats ?? []
  console.log(movieBooked)
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (movie) {
      setBookedSeats(movie.bookedSeats || []);
    }
  }, [movie]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      alert('This seat is already booked.');
      return;
    }

    setSelectedSeats(prevSelectedSeats =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter(seat => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const handleBooking = () => {
    if (!user.name || !user.password || selectedSeats.length === 0) {
      alert('Please log in and select seats');
      return;
    }

    dispatch(setBookingUser({
      movieName,
      seats: selectedSeats.length,
      userName: user.name,
      userPassword: user.password,
      selectedSeats
    }));
    dispatch(setCurrentUser({ name: '', password: '' }));
    alert('Booking successful! Redirecting to Login page...');
    navigate('/');
  };

  return (
    <div>
      <h2>Booking for {movieName}</h2>

      <div className='head'>
        <div className='head_1'>
          {Array.from({ length: 50 }, (_, index) => index + 1).map(seatNumber => (
            <button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              style={{
                margin: '5px',
                padding: '10px',
                width: '50px',
                borderColor: 'black',
                borderRadius: '8px',
                backgroundColor: selectedSeats.includes(seatNumber)
                  ? 'green'
                  : (bookedSeats.includes(seatNumber) ?
                    movieBooked.includes(seatNumber) ? 'blue' : 'red' : 'white'),
                color: 'black',
              }}
              disabled={bookedSeats.includes(seatNumber)}
            >
              {seatNumber}
            </button>
          ))}
        </div>
        <div className='head_2'>
          {Array.from({ length: 50 }, (_, index) => index + 51).map(seatNumber => (
            <button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              style={{
                margin: '5px',
                padding: '10px',
                width: '50px',
                borderColor: 'black',
                borderRadius: '8px',
                backgroundColor: selectedSeats.includes(seatNumber)
                  ? 'green'
                  : (bookedSeats.includes(seatNumber) ?
                    movieBooked.includes(seatNumber) ? 'blue' : 'red' : 'white'),
                color: 'black',
              }}
              disabled={bookedSeats.includes(seatNumber)}
            >
              {seatNumber}
            </button>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button style={{ width: "157px", marginTop: "10px", height: "35px" }} onClick={handleBooking}>Book</button>
      </div>
    </div>
  );
};

export default Booking;

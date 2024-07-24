import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { name: 'puli', availableTickets: 50, bookedSeats: [], bookedUsers: [] },
  { name: 'jilla', availableTickets: 50, bookedSeats: [], bookedUsers: [] },
  { name: 'gethu', availableTickets: 50, bookedSeats: [], bookedUsers: [] }
];
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setBookingUser: (state, action) => {
      const { movieName, seats, userName, userPassword, selectedSeats } = action.payload;
      const movieIndex = state.findIndex(val => val.name === movieName);
      if (movieIndex !== -1) {
        const movie = state[movieIndex];
        movie.availableTickets -= seats;
        movie.bookedSeats = [...new Set([...movie.bookedSeats, ...selectedSeats])]; 

        const userIndex = movie.bookedUsers.findIndex(user => user.userName === userName && user.userPassword === userPassword);
        if (userIndex !== -1) {
          
          movie.bookedUsers[userIndex].seats = [...new Set([...movie.bookedUsers[userIndex].seats, ...selectedSeats])]; // Avoid duplicates
        } else {

          movie.bookedUsers.push({
            userName,
            userPassword,
            seats: selectedSeats
          });
        }
      }
    }
  }
});

export const { setBookingUser } = movieSlice.actions;
export default movieSlice.reducer;

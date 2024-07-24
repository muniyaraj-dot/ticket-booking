import React from 'react';
import { BrowserRouter,Routes as Router  , Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import Login from './Login'
import {store} from './store'
import MovieList from './MovieList';
import Booking from './Booking';
function App() {
    return (

        <Provider store={store}>
            <BrowserRouter>
            <Router>
           <Route path='/' element={ <Login/>}/>
           <Route path='/movieList' element={<MovieList/>}/>
        <Route path="/booking/:movieName" element={<Booking />} />
        </Router>
        </BrowserRouter>
        </Provider>
       
    );
}

export default App;

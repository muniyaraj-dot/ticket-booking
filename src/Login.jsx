import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { setCurrentUser, setUserList } from './userSlice';
import { useNavigate } from 'react-router';
import './login.css';

const Login = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(val => ({ ...val, [name]: value }));
    };

    const handleSet = () => {
        dispatch(setCurrentUser({ name: user.name, password: user.password }));
        dispatch(setUserList(user));
        navigate('/MovieList');
    };

    return (
        <div className="login-container">
            <h1 className="headline">Movie Ticket Booking</h1>
            <div className="login-form">
                <input 
                    type="text" 
                    name='name' 
                    value={user.name} 
                    onChange={handleChange} 
                    placeholder="Username"
                />
                <input 
                    type="password" 
                    name='password' 
                    value={user.password} 
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button onClick={handleSet}>Login</button>
            </div>
        </div>
    );
}

export default Login;

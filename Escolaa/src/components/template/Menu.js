import './Menu.css';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService.js';

export default function Menu(props) {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
        setCurrentUser(user);
        }
    }, []);

    return (
        <nav className='menu'>
            <Link to="/">
                Home
            </Link>

            <Link to="/receitas">
                Receitas
            </Link>

            {currentUser ? (
                <Link to="/logout">
                    Logout
                </Link>
                ) : (
                <Link to="/login">
                    Login
                </Link>
            )}
        </nav>
    )
}
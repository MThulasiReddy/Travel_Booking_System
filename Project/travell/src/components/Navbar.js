import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/005/183/355/original/travel-agency-logo-template-holiday-logo-template-beach-logo-concept-vector.jpg"
                        alt="Travel Logo"
                        className="navbar-logo"
                    />
                </Link>
            </div>

            <ul className="nav-links">
                <li><Link to="/flights">Flights</Link></li>
                <li><Link to="/hotels">Hotels</Link></li>
                <li><Link to="/trains">Trains</Link></li>
                <li><Link to="/cabs">Cabs</Link></li>
                <li><Link to="/bus">Bus</Link></li>
            </ul>

            <div className="user-profile">
                <Link to="/mytrips">My Trips</Link>
            </div>

            <ul className="nav-links2">
                <li><Link to="/login">Logout</Link></li>
                
            </ul>
        </nav>
    );
};

export default Navbar;

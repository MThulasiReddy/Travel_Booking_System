import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Trains from './pages/Trains';
import Cabs from './pages/Cabs';
import Bus from './pages/Bus';
import Hotel from './pages/Hotels';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyTrips from './pages/Mytrips';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/trains" element={<Trains />} />
                <Route path="/cabs" element={<Cabs />} />
                <Route path="/bus" element={<Bus />} />
                <Route path="/hotels" element={<Hotel />} />
                <Route path="/signup" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mytrips" element={<MyTrips />} />



            </Routes>
        </Router>
    );
};

export default App;

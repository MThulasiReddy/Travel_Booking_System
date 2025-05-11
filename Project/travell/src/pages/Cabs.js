import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Cabs.css';

const Cabs = () => {
    const sampleCabs = [
        {
            id: 1,
            name: "Luxury Ride",
            pickup: "Delhi",
            destination: "Mumbai",
            price: 3000,
            seats: 5
        },
        {
            id: 2,
            name: "Budget Express",
            pickup: "Delhi",
            destination: "Jaipur",
            price: 1500,
            seats: 4
        },
        {
            id: 3,
            name: "City Cruiser",
            pickup: "Bangalore",
            destination: "Chennai",
            price: 2000,
            seats: 6
        }
    ];

    const [filteredCabs, setFilteredCabs] = useState([]);
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [selectedCab, setSelectedCab] = useState(null);
    const [passengerName, setPassengerName] = useState("");
    const [seats, setSeats] = useState(1);
    const [bookings, setBookings] = useState([]);

    // Search for cabs based on pickup, destination, and date
    const searchCabs = () => {
        if (!pickup || !destination || !date) {
            alert("Please select Pickup, Destination, and Date.");
            return;
        }

        // Filter sample cabs based on the selected pickup and destination
        const results = sampleCabs.filter(cab => cab.pickup === pickup && cab.destination === destination);
        if (results.length === 0) {
            alert("No cabs available for the selected route.");
        }
        setFilteredCabs(results);
    };

    // Handle cab booking
    const bookCab = () => {
        if (!selectedCab || !passengerName || seats <= 0 || !date) {
            alert("Please enter valid details.");
            return;
        }

        const booking = {
            passengerName,
            seats,
            date,
            cabName: selectedCab.name,
            pickup: selectedCab.pickup,
            destination: selectedCab.destination,
            price: selectedCab.price * seats
        };

        setBookings([...bookings, booking]);
        alert("Cab booking successful!");
        setPassengerName("");
        setSeats(1);
        setSelectedCab(null);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Book a Cab</h1>

                {/* Search Cabs */}
                <div className="search-container">
                    <label>Pickup:</label>
                    <input
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Enter pickup location"
                    />

                    <label>Destination:</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination"
                    />

                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button onClick={searchCabs}>Search Cabs</button>
                </div>

                {/* Hoverable Dropdown for Cab Selection */}
                {filteredCabs.length > 0 && (
                    <div className="cab-dropdown">
                        <label>Available Cabs:</label>
                        <div className="dropdown">
                            <button className="dropdown-button">Select a Cab</button>
                            <div className="dropdown-content">
                                {filteredCabs.map((cab) => (
                                    <div
                                        key={cab.id}
                                        className="dropdown-item"
                                        onClick={() => setSelectedCab(cab)}
                                    >
                                        {cab.name} ({cab.pickup} → {cab.destination}) - ₹{cab.price} ({cab.seats} seats left)
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Booking Form */}
                {selectedCab && (
                    <div className="booking-form">
                        <label>Passenger Name:</label>
                        <input
                            type="text"
                            value={passengerName}
                            onChange={(e) => setPassengerName(e.target.value)}
                            placeholder="Enter your name"
                        />

                        <label>Number of Seats:</label>
                        <input
                            type="number"
                            value={seats}
                            min="1"
                            max={selectedCab.seats}
                            onChange={(e) => setSeats(parseInt(e.target.value))}
                        />

                        <button onClick={bookCab}>Book Now</button>
                    </div>
                )}

                {/* Display Bookings */}
                <h2>My Cab Bookings</h2>
                <ul className="bookings-list">
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            {booking.passengerName} booked {booking.seats} seat(s) in {booking.cabName} from {booking.pickup} to {booking.destination} on {booking.date} - ₹{booking.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Cabs;

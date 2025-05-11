import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Trains.css';

const Trains = () => {
    // Static sample data for trains
    const sampleTrains = [
        {
            id: 1,
            name: "Superfast Express",
            from: "Delhi",
            to: "Mumbai",
            price: 1500,
            seats: 50
        },
        {
            id: 2,
            name: "Express Link",
            from: "Delhi",
            to: "Jaipur",
            price: 800,
            seats: 30
        },
        {
            id: 3,
            name: "Coastal Cruiser",
            from: "Chennai",
            to: "Bangalore",
            price: 1000,
            seats: 45
        }
    ];

    const [filteredTrains, setFilteredTrains] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [passengerName, setPassengerName] = useState("");
    const [seats, setSeats] = useState(1);
    const [bookings, setBookings] = useState([]);

    // Filter trains based on from, to, and date
    const searchTrains = () => {
        if (!from || !to || !date) {
            alert("Please select From, To, and Date.");
            return;
        }

        // Filter trains based on selected 'from' and 'to' stations
        const results = sampleTrains.filter(train => train.from === from && train.to === to);
        if (results.length === 0) {
            alert("No trains available for the selected route.");
        }
        setFilteredTrains(results);
    };

    // Handle train booking
    const bookTrain = () => {
        if (!selectedTrain || !passengerName || seats <= 0 || !date) {
            alert("Please enter valid details.");
            return;
        }

        const booking = {
            passengerName,
            seats,
            date,
            trainName: selectedTrain.name,
            from: selectedTrain.from,
            to: selectedTrain.to,
            price: selectedTrain.price * seats
        };

        setBookings([...bookings, booking]);
        alert("Train booking successful!");
        setPassengerName("");
        setSeats(1);
        setSelectedTrain(null);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Book a Train</h1>

                {/* Search Trains */}
                <div className="search-container">
                    <label>From:</label>
                    <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="Enter departure city"
                    />

                    <label>To:</label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Enter destination city"
                    />

                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button onClick={searchTrains}>Search Trains</button>
                </div>

                {/* Train Selection */}
                {filteredTrains.length > 0 && (
                    <div className="train-dropdown">
                        <label>Select a Train:</label>
                        <div className="dropdown">
                            <button className="dropdown-button">Select a Train</button>
                            <div className="dropdown-content">
                                {filteredTrains.map((train) => (
                                    <div
                                        key={train.id}
                                        className="dropdown-item"
                                        onClick={() => setSelectedTrain(train)}
                                    >
                                        {train.name} ({train.from} → {train.to}) - ₹{train.price} ({train.seats} seats left)
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Booking Form */}
                {selectedTrain && (
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
                            max={selectedTrain.seats}
                            onChange={(e) => setSeats(parseInt(e.target.value))}
                        />

                        <button onClick={bookTrain}>Book Now</button>
                    </div>
                )}

                {/* Display Bookings */}
                <h2>My Train Bookings</h2>
                <ul className="bookings-list">
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            {booking.passengerName} booked {booking.seats} seat(s) on {booking.trainName} from {booking.from} to {booking.to} on {booking.date} - ₹{booking.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Trains;

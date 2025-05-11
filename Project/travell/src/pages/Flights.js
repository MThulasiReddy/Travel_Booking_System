import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Flights.css';

const Flights = () => {
    const sampleFlights = [
        {
            id: 1,
            name: "Flight 101",
            from: "New York",
            to: "London",
            price: 50000,
            seats: 100
        },
        {
            id: 2,
            name: "Flight 202",
            from: "Delhi",
            to: "Paris",
            price: 45000,
            seats: 80
        },
        {
            id: 3,
            name: "Flight 303",
            from: "Mumbai",
            to: "Singapore",
            price: 35000,
            seats: 120
        }
    ];

    const [filteredFlights, setFilteredFlights] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [passengerName, setPassengerName] = useState("");
    const [seats, setSeats] = useState(1);
    const [bookings, setBookings] = useState([]);

    const searchFlights = () => {
        if (!from || !to || !date) {
            alert("Please enter Departure, Destination, and Date.");
            return;
        }

        const results = sampleFlights.filter(flight => flight.from === from && flight.to === to);
        if (results.length === 0) {
            alert("No flights available for the selected route.");
        }
        setFilteredFlights(results);
    };

    const bookFlight = () => {
        if (!selectedFlight || !passengerName || seats <= 0 || !date) {
            alert("Please enter valid details.");
            return;
        }

        const bookingData = {
            flightId: selectedFlight.id,
            passengerName,
            seats: parseInt(seats),
            date,
            from: selectedFlight.from,
            to: selectedFlight.to,
            price: selectedFlight.price * seats
        };

        setBookings([...bookings, bookingData]);
        alert("Flight booking successful!");
        setPassengerName("");
        setSeats(1);
        setSelectedFlight(null);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Book a Flight</h1>

                {/* Search Flights */}
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

                    <button onClick={searchFlights}>Search Flights</button>
                </div>

                {/* Flight Selection */}
                {filteredFlights.length > 0 && (
                    <div className="flight-list">
                        <label>Select a Flight:</label>
                        <select onChange={(e) => setSelectedFlight(JSON.parse(e.target.value))}>
                            <option value="">-- Select Flight --</option>
                            {filteredFlights.map((flight) => (
                                <option key={flight.id} value={JSON.stringify(flight)}>
                                    {flight.name} ({flight.from} → {flight.to}) - ₹{flight.price} ({flight.seats} seats left)
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Booking Form */}
                {selectedFlight && (
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
                            max={selectedFlight.seats}
                            onChange={(e) => setSeats(parseInt(e.target.value))}
                        />

                        <button onClick={bookFlight}>Book Now</button>

                        {/* Razorpay Payment Link */}
                        <div className="qr-code">
                            <p>Proceed to Payment:</p>
                            <a
                                href="https://rzp.io/rzp/l9QD3Eph"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pay-button"
                            >
                                Pay Now
                            </a>
                        </div>
                    </div>
                )}

                {/* Display Bookings */}
                <h2>My Flight Bookings</h2>
                <ul className="bookings-list">
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            {booking.passengerName} booked {booking.seats} seat(s) on {booking.flightId} from {booking.from} to {booking.to} on {booking.date} - ₹{booking.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Flights;

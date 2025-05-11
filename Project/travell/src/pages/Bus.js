import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Bus.css';

const Bus = () => {
    const staticBuses = [
        {
            id: 1,
            name: "Red Express",
            from: "Delhi",
            to: "Mumbai",
            price: 1200,
            seats: 20
        },
        {
            id: 2,
            name: "Green Line",
            from: "Delhi",
            to: "Jaipur",
            price: 500,
            seats: 15
        },
        {
            id: 3,
            name: "Blue Travels",
            from: "Bangalore",
            to: "Chennai",
            price: 700,
            seats: 10
        }
    ];

    const [buses] = useState(staticBuses);
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [selectedBus, setSelectedBus] = useState(null);
    const [passengerName, setPassengerName] = useState("");
    const [seats, setSeats] = useState(1);
    const [bookings, setBookings] = useState([]);

    const searchBuses = () => {
        if (!from || !to || !date) {
            alert("Please select From, To, and Date.");
            return;
        }

        const results = buses.filter(bus => bus.from === from && bus.to === to);
        if (results.length === 0) {
            alert("No buses available for the selected route.");
        }
        setFilteredBuses(results);
    };

    const bookBus = () => {
        if (!selectedBus || !passengerName || seats <= 0 || !date) {
            alert("Please enter valid booking details.");
            return;
        }

        const booking = {
            passengerName,
            seats,
            date,
            busName: selectedBus.name,
            from: selectedBus.from,
            to: selectedBus.to,
            price: selectedBus.price * seats
        };

        setBookings([...bookings, booking]);
        alert("Bus booking successful!");
        setPassengerName("");
        setSeats(1);
        setSelectedBus(null);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Book a Bus</h1>

                {/* Search Buses */}
                <div className="search-container">
                    <label>From:</label>
                    <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Enter departure city" />

                    <label>To:</label>
                    <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter destination city" />

                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                    <button onClick={searchBuses}>Search Buses</button>
                </div>

                {/* Hoverable Dropdown */}
                {filteredBuses.length > 0 && (
                    <div className="bus-dropdown">
                        <label>Available Buses:</label>
                        <div className="dropdown">
                            <button className="dropdown-button">Select a Bus</button>
                            <div className="dropdown-content">
                                {filteredBuses.map((bus) => (
                                    <div
                                        key={bus.id}
                                        className="dropdown-item"
                                        onClick={() => setSelectedBus(bus)}
                                    >
                                        {bus.name} ({bus.from} → {bus.to}) - ₹{bus.price} ({bus.seats} seats left)
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Booking Form */}
                {selectedBus && (
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
                            max={selectedBus.seats}
                            onChange={(e) => setSeats(parseInt(e.target.value))}
                        />

                        <button onClick={bookBus}>Book Now</button>
                    </div>
                )}

                {/* Display Bookings */}
                <h2>My Bus Bookings</h2>
                <ul className="bookings-list">
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            {booking.passengerName} booked {booking.seats} seat(s) on {booking.busName} from {booking.from} to {booking.to} on {booking.date} - ₹{booking.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Bus;

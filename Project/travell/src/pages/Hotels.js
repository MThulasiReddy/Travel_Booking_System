import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Hotels.css';

const Hotels = () => {
    // Static sample data for hotels
    const sampleHotels = [
        {
            id: 1,
            name: "Grand Palace Hotel",
            city: "Mumbai",
            price: 2000,
            rooms: 30
        },
        {
            id: 2,
            name: "Sea View Resort",
            city: "Goa",
            price: 3000,
            rooms: 20
        },
        {
            id: 3,
            name: "Mountain Retreat",
            city: "Manali",
            price: 1500,
            rooms: 15
        }
    ];

    const [filteredHotels, setFilteredHotels] = useState([]);
    const [city, setCity] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [guestName, setGuestName] = useState("");
    const [rooms, setRooms] = useState(1);
    const [bookings, setBookings] = useState([]);

    // Search hotels based on city and dates
    const searchHotels = () => {
        if (!city || !checkInDate || !checkOutDate) {
            alert("Please enter City, Check-in, and Check-out dates.");
            return;
        }

        // Filter hotels based on the city
        const results = sampleHotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase());
        if (results.length === 0) {
            alert("No hotels available in the selected city.");
        }
        setFilteredHotels(results);
    };

    // Handle hotel booking
    const bookHotel = () => {
        if (!selectedHotel || !guestName || rooms <= 0 || !checkInDate || !checkOutDate) {
            alert("Please enter valid details.");
            return;
        }

        const booking = {
            guestName,
            rooms,
            checkInDate,
            checkOutDate,
            hotelName: selectedHotel.name,
            city: selectedHotel.city,
            price: selectedHotel.price * rooms
        };

        setBookings([...bookings, booking]);
        alert("Hotel booking successful!");
        setGuestName("");
        setRooms(1);
        setSelectedHotel(null);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Book a Hotel</h1>

                {/* Search Hotels */}
                <div className="search-container">
                    <label>City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                    />

                    <label>Check-in Date:</label>
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                    />

                    <label>Check-out Date:</label>
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                    />

                    <button onClick={searchHotels}>Search Hotels</button>
                </div>

                {/* Hotel Selection */}
                {filteredHotels.length > 0 && (
                    <div className="hotel-list">
                        <label>Select a Hotel:</label>
                        <select onChange={(e) => setSelectedHotel(JSON.parse(e.target.value))}>
                            <option value="">-- Select Hotel --</option>
                            {filteredHotels.map((hotel) => (
                                <option key={hotel.id} value={JSON.stringify(hotel)}>
                                    {hotel.name} ({hotel.city}) - ₹{hotel.price} per room
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Booking Form */}
                {selectedHotel && (
                    <div className="booking-form">
                        <label>Guest Name:</label>
                        <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Enter your name"
                        />

                        <label>Number of Rooms:</label>
                        <input
                            type="number"
                            value={rooms}
                            min="1"
                            max={selectedHotel.rooms}
                            onChange={(e) => setRooms(parseInt(e.target.value))}
                        />

                        <button onClick={bookHotel}>Book Now</button>
                    </div>
                )}

                {/* Display Bookings */}
                <h2>My Hotel Bookings</h2>
                <ul className="bookings-list">
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            {booking.guestName} booked {booking.rooms} room(s) at {booking.hotelName} in {booking.city} from {booking.checkInDate} to {booking.checkOutDate} - ₹{booking.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Hotels;

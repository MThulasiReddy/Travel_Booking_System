const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');
const Booking = require('../models/Booking');

// Get all buses
router.get('/api/buses', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buses' });
    }
});

// Book a bus
router.post('/api/bookBus', async (req, res) => {
    try {
        const { busId, passengerName, seats, date } = req.body;

        const bus = await Bus.findById(busId);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        if (seats > bus.seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const booking = new Booking({
            passengerName,
            seats,
            date,
            from: bus.from,
            to: bus.to,
            busName: bus.name,
            price: bus.price * seats
        });

        await booking.save();

        // Update remaining seats
        bus.seats -= seats;
        await bus.save();

        res.json({ message: 'Booking successful', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error booking bus' });
    }
});

module.exports = router;

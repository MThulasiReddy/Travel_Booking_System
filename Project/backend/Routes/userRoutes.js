const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error during registration." });
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error." });
    }
});

//Flights route
const Flight = require("../models/Flight");

router.post("/addSampleFlights", async (req, res) => {
    try {
        const sampleFlights = [
            {
                name: "IndiGo 6E-101",
                from: "Delhi",
                to: "Mumbai",
                price: 4500,
                seats: 100
            },
            {
                name: "Air India AI-202",
                from: "Bangalore",
                to: "Chennai",
                price: 3000,
                seats: 50
            },
            {
                name: "SpiceJet SG-404",
                from: "Delhi",
                to: "Bangalore",
                price: 5500,
                seats: 75
            },
            {
                name: "Vistara UK-303",
                from: "Mumbai",
                to: "Delhi",
                price: 5000,
                seats: 80
            }
        ];

        await Flight.insertMany(sampleFlights);
        res.status(201).json({ message: "Sample flights added successfully" });
    } catch (error) {
        console.error("Error adding flights:", error);
        res.status(500).json({ message: "Failed to add sample flights" });
    }
});


module.exports = router;

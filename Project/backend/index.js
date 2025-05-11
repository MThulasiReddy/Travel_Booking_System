const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");

    // Insert sample buses only after DB is connected
    insertSampleBuses();
}).catch((err) => console.log("MongoDB connection error:", err));

// Import Routes
const userRoutes = require("./Routes/userRoutes");
const busRoutes = require("./Routes/busRoutes");

// Use Routes
app.use("/api", userRoutes);
app.use("/api", busRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Insert sample buses ONCE
const Bus = require('./models/Bus');

const insertSampleBuses = async () => {
    const existing = await Bus.find();
    if (existing.length > 0) {
        console.log("Sample buses already exist, skipping insert.");
        return;
    }

    const buses = [
        { name: "Express Line", from: "Delhi", to: "Mumbai", price: 700, seats: 40 },
        { name: "Comfort Travels", from: "Delhi", to: "Chandigarh", price: 500, seats: 30 },
        { name: "Speedy Wheels", from: "Pune", to: "Mumbai", price: 300, seats: 25 },
        { name: "Royal Rider", from: "Delhi", to: "Mumbai", price: 900, seats: 10 },
    ];

    try {
        await Bus.insertMany(buses);
        console.log("Sample buses inserted successfully.");
    } catch (err) {
        console.error("Error inserting sample buses:", err);
    }
};

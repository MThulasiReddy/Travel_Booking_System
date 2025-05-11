import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Registration.module.css';

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registration successful! Please log in.");
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <img 
                    src="https://static.vecteezy.com/system/resources/previews/005/183/355/original/travel-agency-logo-template-holiday-logo-template-beach-logo-concept-vector.jpg" 
                    alt="Travel Booking Logo" 
                    className={styles.logo} 
                />

                <div className={styles.authForm}>
                    <h1>Register</h1>

                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={handleRegister}>Register</button>

                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Registration;

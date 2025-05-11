import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <img 
                    src="https://static.vecteezy.com/system/resources/previews/005/183/355/original/travel-agency-logo-template-holiday-logo-template-beach-logo-concept-vector.jpg" 
                    alt="Travel Logo" 
                    className={styles.logo} 
                />

                <div className={styles.authForm}>
                    <h1>Login</h1>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={handleLogin}>Login</button>

                    <p>Don't have an account? <a href="/signup">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

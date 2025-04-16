import React from 'react'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Login.css"
import Footer from '../components/Footer'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Perform E-Mail Validation through Regular Expression or string matching
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        const userInfo = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post("https://reqres.in/api/login", userInfo);

            // Storing the token in session/local storage
            const token = response.data.token;
            sessionStorage.setItem("token", token);
            navigate("/users")

        } catch (error) {
            console.log("Error: ", error)
            alert("Invalid credentials!")
        }
    }

    return (
        <div className="container">

            <div className="hero-container">
                <div className="login-container">
                    <div className="icon"><i className="bi bi-person-check user"></i></div>

                    <div className="login">
                        <div className="login-header-container">

                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value) }}
                                    required />

                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => { setPassword(event.target.value) }}
                                    required />

                                <button type="submit"><i className="bi bi-box-arrow-in-right login-arrow"></i>Login</button>

                            </form>
                            <div className="terms">For continuing, agree to the <span>Terms of Use </span>
                                and <span>Privacy Policy</span>.</div>

                        </div>
                    </div>

                    <div className="line"></div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;

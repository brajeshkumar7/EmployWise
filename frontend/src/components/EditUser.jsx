import React from 'react'
import { useState, useContext } from "react";
import { UserContext } from "../store/user-store";
import { toast } from 'react-toastify';
import axios from "axios";
import "./EditUser.css";


const EditUser = () => {
    const { users, setUsers, selectedUser, setShowEditForm } = useContext(UserContext);

    const [email, setEmail] = useState(selectedUser.email);
    const [firstName, setFirstName] = useState(selectedUser.firstName);
    const [lastName, setLastName] = useState(selectedUser.lastName);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error("Please enter a valid email address");
                return;
            }
            const updatedUsers = users.map((user) => {
                if (user.id == selectedUser.id) {
                    return {
                        ...user,
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                    };
                }
                return user;
            });
            setUsers([...updatedUsers]);

            const userInfo = {
                email: email,
                first_name: firstName,
                last_name: lastName,
            }

            const response = await axios.put("https://reqres.in/api/users/" + selectedUser.id, userInfo)
            console.log("Update Successful!")
            setShowEditForm(false);
            toast.success("Update Successful!");
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Update Failed!");
        }
    }

    const handleClose = () => {
        setShowEditForm(false);
    }

    return (
        <div className="popup-container">
            <div className="popup-box">
                <h1>Edit User</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="editEmail">Email</label>
                    <input
                        type="text"
                        id="editEmail"
                        name="editEmail"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        required
                    />

                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(event) => { setFirstName(event.target.value) }}
                        required
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(event) => { setLastName(event.target.value) }}
                        required
                    />

                    <div className="edit-buttons">
                        <button className="edit-button-save" type="submit">Save</button>
                        <button className="edit-button-close" onClick={handleClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser
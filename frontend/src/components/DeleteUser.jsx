import React from 'react'
import { useContext } from "react";
import { UserContext } from "../store/user-store";
import axios from 'axios';
import "./EditUser.css";
import "./DeleteUser.css";

const DeleteUser = () => {
    const { users, setUsers, selectedUser, setShowDeleteForm } = useContext(UserContext);

    const handleNo = (event) => {
        setShowDeleteForm(false);
    };

    const handleYes = async (event) => {
        try {
            const usersCopy = users.filter((user) => user.id != selectedUser.id);
            setUsers([...usersCopy]);

            await axios.delete("https://reqres.in/api/users/" + selectedUser.id);
            console.log("Deleted Successfully!")
            setShowDeleteForm(false);
            alert("Deleted Successfully!")

        } catch (error) {
            console.log("Error: ", error);
            alert("Delete Failed!");
        }
    };

    return (
        <div className='popup-container'>
            <div className="popup-box">
                <p className='delete-text'>Do you really want to delete the user?</p>
                <div className="delete-buttons">
                    <button className='delete-button-yes' onClick={handleYes}>Yes</button>
                    <button className='delete-button-no' onClick={handleNo}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser;
import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../store/user-store";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import EditUser from "../components/EditUser";
import DeleteUser from "../components/DeleteUser";
import Footer from "../components/Footer";
import "./Users.css";


const Users = () => {
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const { users, setUsers, showEditForm, showDeleteForm } = useContext(UserContext);
    const navigate = useNavigate();

    // Checking token
    const token = sessionStorage.getItem("token");
    if (!token) {
        navigate("/");
    }

    // Fetching users data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
                setTotalPages(response.data.total_pages);
                setUsers(response.data.data);

            } catch (error) {
                console.log("Error: ", error);
                alert("Cannot Fetch Users!");
            }
        }

        fetchData();
    }, [currentPage]);

    // Filter users on basis of searching for first name 
    const filteredUsers = users.filter((user) =>
        user.first_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <div className="users-hero">
                <div className="search-container">
                    <h1>Users List</h1>
                    <hr />
                    <div className="search-box">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="search by first name.."
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }}
                        />
                        <button><i className="bi bi-search"></i></button>
                    </div>
                </div>
                {/*list of users*/}
                <div className="users-container">
                    <div className="users-box">
                        {filteredUsers.map(user => (
                            <Card
                                key={user.id}
                                id={user.id}
                                email={user.email}
                                firstName={user.first_name}
                                lastName={user.last_name}
                                image={user.avatar}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/*Pop Up */}
            {showEditForm && <EditUser />}
            {showDeleteForm && <DeleteUser />}

            {/*Pagination*/}
            <div className="pagination">
                <p>Pages: </p>
                {
                    Array.from({ length: totalPages }, (_, i) => (
                        <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                        </button>
                    ))
                }
                <p>Showing Page {currentPage} of {totalPages}</p>
            </div>

            {/*Footer Section*/}
            <Footer />
        </div>
    );
};

export default Users;

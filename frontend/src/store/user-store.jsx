import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    return (
        <UserContext.Provider value={{
            showEditForm,
            setShowEditForm,
            selectedUser,
            setSelectedUser,
            showDeleteForm,
            setShowDeleteForm,
            users,
            setUsers
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
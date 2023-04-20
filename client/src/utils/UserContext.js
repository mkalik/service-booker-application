import React, { useState, useContext } from 'react';
import Auth from './auth';

export const UserContext = React.createContext();
export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(false);
    // const [role, setRole] = useState(Auth.getProfile().data.privilege);

    const changeUserState = (user) => {
        setUser(user);
    };

    return (
        <UserContext.Provider value={{ user, changeUserState }}>
            {children}
        </UserContext.Provider>
    );
}

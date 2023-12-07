import React, { createContext, useState } from 'react';
import { AuthModule } from '../../components/Auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openAuth, setOpenAuth] = useState(false)

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, setOpenAuth }}>
            {children}
            {openAuth && <AuthModule />}
        </AuthContext.Provider>
    );
};
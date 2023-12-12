import React, { createContext, useState } from 'react';
import { AuthModule } from '../../components/Auth';
import { checkAuth } from '../services/auth';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openAuth, setOpenAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };
    const checkAuthC = () => {
        setIsLoading(true)
        checkAuth()
            .then(() => {
                setIsLoggedIn(true)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, setOpenAuth, checkAuthC, isLoading }}>
            {children}
            {openAuth && <AuthModule />}
        </AuthContext.Provider>
    );
};
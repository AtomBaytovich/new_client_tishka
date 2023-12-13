import React, { createContext, useEffect, useState } from 'react';
import { AuthModule } from '../../components/Auth';
import { refreshTokens } from '../../store/authorization/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [openAuth, setOpenAuth] = useState(false);
    const stateAuth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const login = () => {
        // setIsLoggedIn(true);
    };

    const logout = () => {
        // setIsLoggedIn(false);
    };

    useEffect(() => {
        dispatch(refreshTokens())
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, stateAuth, openAuth, setOpenAuth }}>
            {children}
            {openAuth && <AuthModule />}
        </AuthContext.Provider>
    );
};
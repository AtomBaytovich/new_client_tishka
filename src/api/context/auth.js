import React, { createContext, useEffect, useState } from 'react';
import { AuthModule } from '../../components/Auth';
import { refreshTokens } from '../../store/authorization/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [openAuth, setOpenAuth] = useState(false);
    const stateAuth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshTokens())/*.then(res => dispatch())*/
        //доделай поулчение пользователю отсюда getMe
    }, [])

    return (
        <AuthContext.Provider value={{ stateAuth, openAuth, setOpenAuth }}>
            {children}
            {openAuth && <AuthModule />}
        </AuthContext.Provider>
    );
};
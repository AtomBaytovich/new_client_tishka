import React, { createContext, useEffect, useState } from 'react';
import { AuthModule } from '../../components/Auth';
import { refreshTokens } from '../../store/authorization/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMe, stopLoading } from '../../store/user/user.slice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [openAuth, setOpenAuth] = useState(false);
    const stateAuth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        // if (stateAuth.isAuthenticated) {
        dispatch(refreshTokens())
            .unwrap()
            .then(res => {
                dispatch(getUserMe())
            }).catch(err => dispatch(stopLoading()))
        // }
    }, [])

    return (
        <AuthContext.Provider value={{ stateAuth, openAuth, setOpenAuth }}>
            {children}
            {openAuth && <AuthModule />}
        </AuthContext.Provider>
    );
};
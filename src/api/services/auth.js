import $api from "../http";
import axios from 'axios';

const hostServer = process.env.REACT_APP_HOST_SERVER || "http://localhost:5000";

export const registration = async ({ login, password, captcha }) => {
    try {
        const res = await $api.post(`/api/v1/auth/reg`, {
            login,
            password,
            captcha
        });
        const data = res.data;
        return { data };
    } catch (error) {
        if (error?.response?.data) throw error?.response?.data;
        throw error;
    }
}

export const login = async ({ login, password, captcha }) => {
    try {
        const res = await $api.post(`/api/v1/auth/login`, {
            login,
            password,
            captcha
        });

        const data = res.data;
        return { data };
    } catch (error) {
        if (error?.response?.data) throw error?.response?.data;
        throw error;
    }
}

export const logout = async () => {
    try {
        const res = await $api.get(`/api/v1/auth/logout`, {
            withCredentials: true
        });
        const data = res.data;
        return { data };
    } catch (error) {
        throw error;
    }
}

export const checkAuth = async () => {
    try {
        const res = await axios.get(`${hostServer}/api/v1/auth/refresh-token`, { withCredentials: true })
        return res;
    } catch (error) {
        // console.log(error)
        throw error;
    }
}
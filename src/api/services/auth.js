import Cookies from 'js-cookie';
import $api from "../http";

export const registration = async ({ login, password, captcha }) => {
    try {
        const req = await $api.post(`/api/v1/auth/reg`, {
            login,
            password,
            captcha
        });
        const data = req.data;
        console.log(data)
        Cookies.set('accessToken', data.accessToken, { expires: (1 / 1440) * 20 });
        Cookies.set('refreshToken', data.refreshToken, { expires: 30 });
        return { data };
    } catch (error) {
        throw error;
    }
}

export const login = async ({ login, password, captcha }) => {
    try {
        const req = await $api.post(`/api/v1/auth/login`, {
            login,
            password,
            captcha
        });

        const data = req.data;
        console.log(data)
        Cookies.set('accessToken', data.accessToken, { expires: (1 / 1440) * 20 });
        Cookies.set('refreshToken', data.refreshToken, { expires: 30 });
        return { data };
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const req = await $api.post(`/api/v1/auth/logout`);

        const data = req.data;
        console.log(data)
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return { data };
    } catch (error) {
        throw error;
    }
}
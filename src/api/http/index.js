import axios from "axios";
import Cookies from "js-cookie";

const hostServer = process.env.REACT_APP_HOST_SERVER || "http://localhost:5000";

const $api = axios.create({
    withCredentials: true,
    baseURL: hostServer
})

$api.interceptors.request.use((config) => {
    config.headers["x-access-token"] = Cookies.get("accessToken");
    return config;
})

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const res = await axios.get(`${hostServer}/api/v1/auth/refresh-token`,
                    { withCredentials: true });
                const data = res.data;
                Cookies.set('accessToken', data.accessToken, { expires: (1 / 1440) * 20 });
                Cookies.set('refreshToken', data.refreshToken, { expires: 30 });
                return $api.request(originalRequest)
            } catch (error) {
                console.log("Не авторизован");
                window.location.reload()
            }
        }
        throw error;
    })

export default $api;
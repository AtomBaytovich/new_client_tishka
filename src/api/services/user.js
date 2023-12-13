import $api from "../http";

export const getMe = async () => {
    try {
        const user = await $api.get(`/api/v1/user/get-me`);

        return user.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}
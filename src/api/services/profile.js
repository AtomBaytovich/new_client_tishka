import $api from "../http";

export const getProfile = async ({ nickname }) => {
    try {
        const user = await $api.get(`/api/v1/user/${nickname}`);

        return user.data;
    } catch (error) {
        // console.log(error)
        throw error
    }
}
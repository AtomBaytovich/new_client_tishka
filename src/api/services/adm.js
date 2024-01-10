import $api from "../http";

export const banUser = async (nickname) => {
    try {
        const user = await $api.post(`/api/v1/adm/ban/${nickname}`);

        return user.data;
    } catch (error) {
        // console.log(error)
        throw error
    }
}

export const banMopiks = async (nickname) => {
    try {
        const user = await $api.post(`/api/v1/adm/ban/mopiks/${nickname}`);

        return user.data;
    } catch (error) {
        // console.log(error)
        throw error
    }
}

export const mootMopik = async (id) => {
    try {
        const user = await $api.post(`/api/v1/adm/moot/mopiks/${id}`);

        return user.data;
    } catch (error) {
        // console.log(error)
        throw error
    }
}
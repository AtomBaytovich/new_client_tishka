import $api from "../http";

export const getMopikS = async ({ start, count }) => {
    try {
        const mopik = await $api.get(`/api/v1/mopiks/`, {
            params: {
                start,
                count
            }
        })
        return mopik.data;
    } catch (error) {
        console.log(error)
        if (error?.response?.data) throw error?.response?.data;
        throw error;
    }
}

export const getMopik = async ({ _id }) => {
    try {
        const data = await $api.get(`/api/v1/mopiks/${_id}`, {

        })
        return data.data;
    } catch (error) {
        console.log(error)
        if (error?.response?.data) throw error?.response?.data;
        throw error;
    }
}
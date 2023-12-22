import $api from "../http";

export const createMopik = async () => {
    try {
        const mopik = await $api.post("/api/v1/notes/", {
        })
        return { mopik: mopik.data.mopik }
    } catch (error) {
        console.log(error)
        if (error?.response?.data) throw error?.response?.data;
        throw error;
    }
}


export const getMopik = async ({ id, }) => {
    try {
        const mopik = await $api.get(`/api/v1/notes/${id}`, {

        })
        return { mopik: mopik.data.mopik }
    } catch (error) {
        console.log(error)
        if (error?.response?.data) throw error?.response?.data;
        throw error;
    }
}

export const putMopik = async ({ id, text }) => {
    try {
        const mopik = await $api.put(`/api/v1/notes/${id}`, {
            text
        })
        return { mopik: mopik.data.mopik };
    } catch (error) {
        console.log(error)
        if (error?.response?.data) throw error?.response?.data;
        throw error;
    }
}

export const getAllMopik = async () => {
    try {
        const mopik = await $api.get(`/api/v1/notes/all`, {
        })

        return mopik.data;
    } catch (error) {
        console.log(error)
        if (error?.response?.data) throw error?.response?.data;
        throw error;
    }
}

export const getNoteS = async ({ start, count }) => {
    try {
        const mopik = await $api.get(`/api/v1/notes/`, {
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
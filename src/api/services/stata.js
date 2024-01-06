import axios from "axios";

const hostServer = process.env.REACT_APP_HOST_SERVER || "http://localhost:5000";

export const getStata = async () => {
    try {
        const res = await axios.get(`${hostServer}/api/v1/stata`)
        return res;
    } catch (error) {
        // console.log(error)
        throw error;
    }
}

export const getStataProfile = async ({ nickname }) => {
    try {
        const res = await axios.get(`${hostServer}/api/v1/stata/${nickname}`)
        return res;
    } catch (error) {
        // console.log(error)
        throw error;
    }
}
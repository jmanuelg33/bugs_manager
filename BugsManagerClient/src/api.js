import axios from 'axios';

export const URL_API = process.env.REACT_APP_BUGS_MANAGER_API || 'http://localhost'

export const GetSummary = async () => {
    try {
        return await axios.get(`${URL_API}/api/v1/summary`);
    } catch (error) {
        return error.response;
    }
}

export const GetAllUsers = async () => {
    try {
        return await axios.get(`${URL_API}/api/v1/users`);
    } catch (error) {
        return error.response;
    }
}

export const GetAllProjects = async () => {
    try {
        return await axios.get(`${URL_API}/api/v1/projects`);
    } catch (error) {
        return error.response;
    }
}

export const Register = async (params) => {
    try {
        return await axios.post(`${URL_API}/api/v1/bug`, params);
    } catch (error) {
        return error.response;
    }
}

export const GetAllBugs = async (params) => {
    try {
        return await axios.get(`${URL_API}/api/v1/bugs${params}`);
    } catch (error) {
        return error.response;
    }
}
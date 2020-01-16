import * as axios from 'axios';

export const authenticateAPI = (email, password) => {

    return axios({
                method: 'post',
                url: 'http://18.228.59.15:3000/auth/login',
                data: {
                    email,
                    password
                }
            });
}

export const getToken = () => {
    return localStorage.getItem("myToken");
}

export const isAuthenticated = () => {
    return !!getToken();
}

export const createProject = (name) => {
    return axios({
        method: 'post',
        url: 'http://18.228.59.15:3000/projects',
        data: {
            name
        },
        headers: {
            authorization: getToken()
        }
    });
}

export const getProjects = () => {
    return axios({
        method: 'get',
        url: 'http://18.228.59.15:3000/projects',
        headers: {
            authorization: getToken()
        }
    });
}

export const deleteProject = (id) => {
    return axios({
        method: 'delete',
        url: `http://18.228.59.15:3000/projects/${id}`,
        headers: {
            authorization: getToken()
        }
    });
}


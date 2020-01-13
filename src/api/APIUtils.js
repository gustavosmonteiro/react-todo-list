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

export const isAuthenticated = () => {
    return !!localStorage.getItem("myToken");
}
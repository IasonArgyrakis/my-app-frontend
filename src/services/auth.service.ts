import jwtDecode from 'jwt-decode';
import {backend} from "./backend.service";


const access_token = 'super-secret';


export const login = async (user:any) => {
    return new Promise(async (resolve, reject) => {


        backend.post({
            url: '/auth/signin',
            payload: user,
        }).then((registered:any) => {
                console.log(registered)
                const token=registered.access_token
                console.log(token)
                localStorage.setItem(access_token,token );
                resolve(registered)
            }
        ).catch(reject)


    });


};

export const register = async (user: any) => {
    return new Promise(async (resolve, reject) => {


        backend.post({
            url: '/auth/signup',
            payload: user,
        }).then((registered:any) => {
            const token=registered.access_token
                localStorage.setItem(access_token,token );
                resolve(registered)
            }
        ).catch(reject)


    });


};

export const logout = () => {
    localStorage.removeItem(access_token);
};

export const isLoggedIn = () => {
    const token = localStorage.getItem(access_token);
    if (!token) {
        return false;
    }

    const decodedToken: { exp: number } = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem(access_token);
        return false;
    }
    return true;
};

export const getToken = () => {
    return localStorage.getItem(access_token);
};

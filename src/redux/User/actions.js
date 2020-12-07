import { STORE_USER, LOGOUT_USER } from './types';

export const storeUser = (user) => {
    return {
        type: STORE_USER,
        payload: user
    }
}

export const logOutUser = () => {
    return {
        type: LOGOUT_USER,
    }
}
import { STORE_USER, LOGOUT_USER } from './types';

const initialState = {
    token: undefined,
    name: undefined,
    email: undefined,
    _id: undefined,
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case STORE_USER: return {
                ...state,
                token: action.payload.token,
                name: action.payload.user.name,
                email: action.payload.user.email,
                _id: action.payload.user._id,
            }
        
        case LOGOUT_USER: return {
            ...state,
            token: undefined,
            name: undefined,
            email: undefined,
            _id: undefined,
        }

        default: return state;
    }
}

export default userReducer; 
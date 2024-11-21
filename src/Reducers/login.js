import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DOCTOR_DETAILS } from '../Actions/type';

const initialState = {
    userLoggedIn: false,
    userID: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                userLoggedIn: false
            };
        case REGISTER_FAIL:
            return {
                ...state,
                userLoggedIn: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                userLoggedIn: true,
                userID: action.payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                userLoggedIn: false,
                userID: null
            }
        case LOGOUT:
            return {
                ...state,
                userLoggedIn: false,
                userID: null
            }
        case DOCTOR_DETAILS:
            return {
                ...state,
                userLoggedIn: true,
                userID: action.payload,
                doctorDetails: action.payload
            }
        default:
            return state;
    }
}

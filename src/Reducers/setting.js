// Reducers/setting.js

import { GET_PROFILE_DETAILS } from "../Actions/type";


const initialState = {
    ProfileDetails: [] // Ensure ProfileDetails is initialized properly
};

export default function setting(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_DETAILS:
            return {
                ...state,
                ProfileDetails: action.payload.ProfileDetails
            };
        default:
            return state;
    }
}

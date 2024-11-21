import { GET_PROFILE_DETAILS } from "./type";
import API from '../Services';
import { getUserIDFromIndexedDB } from './indexedDB';

export const getProfileDetails = () => {
    return async (dispatch) => {
        const userId = await getUserIDFromIndexedDB();

        try {
            const response = await API.post('/user/getDoctorProfileDetails', {
                userID: userId
            });

            dispatch({
                type: GET_PROFILE_DETAILS,
                payload: {
                    ProfileDetails: response.data.data
                }
            });
        } catch (error) {
            console.log("ERROR FETCHING PROFILE DATA:", error);
        }
    };
};

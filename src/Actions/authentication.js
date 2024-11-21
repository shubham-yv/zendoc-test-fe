import axios from 'axios';
import { getUserIDFromIndexedDB, storeDataInIndexedDB, deleteDataFromIndexedDB, initializeIndexedDB } from './indexedDB';
import { toast } from "react-toastify";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    INVALID_CREDS,
    DOCTOR_DETAILS
} from '../Actions/type';
import API from '../Services';


export const login = (userInfo, history, setErrors, completeProfilePercenrtage) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5000/login', userInfo);
            if (response.data.data.message === "Incorrect password") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    loginError: 'Incorrect password'
                }));
            } else {
                await storeDataInIndexedDB('Token', response.data.data.sessionToken);
                await storeDataInIndexedDB('UserId', response.data.data.userId);

                sessionStorage.setItem('isActiveSession', true);

                const UserId = await getUserIDFromIndexedDB();

                const UserDetails = await API.post("user/userDetails", {
                    username: userInfo.username
                });

                if (UserDetails.data) {
                    const doctorDetails = UserDetails.data;
                    await Promise.all([
                        storeDataInIndexedDB('firstName', doctorDetails.firstName),
                        storeDataInIndexedDB('salutation', doctorDetails.salutation),
                        storeDataInIndexedDB('lastName', doctorDetails.lastName),
                        storeDataInIndexedDB('prefferedName', doctorDetails.prefferedName),
                        storeDataInIndexedDB('emailID', doctorDetails.emailID),
                        storeDataInIndexedDB('phoneNumber', doctorDetails.phoneNumber)
                    ]);
                    dispatch({
                        type: DOCTOR_DETAILS,
                        payload: doctorDetails
                    });
                } else {
                    console.log("Data Not Found in userDetails API");
                }

                // Debugging logs
                console.log("Complete Profile Percentage:", completeProfilePercenrtage);

                if (completeProfilePercenrtage === 100.00) {
                    console.log("Redirecting to Dashboard");
                    history.push({
                        pathname: '/dashboard',
                        state: { message: "Login successful!" }
                    });
                } else {
                    console.log("Redirecting to Onboard");
                    history.push({
                        pathname: '/onboard',
                        state: { message: "Login successful!" }
                    });
                }

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: UserId
                });
            }
        } catch (error) {
            console.log(error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                loginError: 'An error occurred'
            }));
            dispatch({
                type: LOGIN_FAIL,
                payload: { message: 'An error occurred' }
            });
        }
    }
};


export const createDoctor = (userInfo, history, setErrors) => {
    return async (dispatch) => {
        try {

            await initializeIndexedDB();
            const response = await API.post('user/createDoctor', userInfo);

            if (response && response.data && response.data.code.toLowerCase() === "success") {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: userInfo
                });
                history.push({
                    pathname: '/',
                    state: { message: "Signup successful!" }
                });
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    signupError: "User Already Exists, Please Login To Continue"
                }));
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setErrors(prevErrors => ({
                ...prevErrors,
                signupError: "User Already Exists, Please Login To Continue"
            }));
        }
    };
};


export const invalidCreds = (msg) => {
    return {
        type: INVALID_CREDS,
        payload: msg
    }
}

export const Logout = async (history) => {
    try {
        await deleteDataFromIndexedDB('Token');
        await deleteDataFromIndexedDB('UserId');
        await deleteDataFromIndexedDB('firstName');
        await deleteDataFromIndexedDB('salutation');
        await deleteDataFromIndexedDB('lastName');
        await deleteDataFromIndexedDB('prefferedName');
        await deleteDataFromIndexedDB('emailID');
        await deleteDataFromIndexedDB('phoneNumber')

        sessionStorage.removeItem('isActiveSession');

        console.log("Session ended, Token & UserId removed from localStorage");

    } catch (error) {
        console.error("Error removing data from IndexedDB:", error);
    }
    history.push('/');
    console.log("Token & UserId Removed")
}

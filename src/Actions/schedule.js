import { ADD_NEW_SCHEDULE, GET_SCHEDULES, MODIFY_SCHEDULE, SAVE_SCHEDULE, GET_SCHEDULES_BY_ID } from "./type"
import API from '../Services/index';

export const addNewScheduleFlag = (toggle) => {
    return {
        type: ADD_NEW_SCHEDULE,
        payload: toggle
    }
}

export const addNewScheduleMeeting = (meetingDetails) => {
    return async (dispatch, getState) => {
        const response = await API.post('/schedule/createSchedule', meetingDetails);

        if (response)
            meetingDetails.scheduleID = response.data.scheduleId
        dispatch({
            type: SAVE_SCHEDULE,
            payload: [meetingDetails]
        })
    }
}

export const getScheduleDetail = (userID) => {
    return async (dispatch, getState) => {
        const response = await API.post('/schedule/getScheduleDetail', {
            userID: userID
        })

        if (response) {
            dispatch({
                type: GET_SCHEDULES,
                payload: response.data.data
            })
        }
    }
}


export const ModifySchedule = async (editedObject, dispatch) => {
    try {
        const response = await API.post(`/schedule/modifyScheduleDetail`, editedObject);

        if (response) {
            dispatch({
                type: MODIFY_SCHEDULE,
                payload: response.data.data
            })
        }

    } catch (error) {
        console.error("Error modifying schedule:", error);
        throw error;
    }
};


export const getScheduleDetailByID = (scheduleID) => {
    return async (dispatch, getState) => {
        const response = await API.post('/schedule/getScheduleDetailById', {
            scheduleID: scheduleID
        })

        if (response) {
            dispatch({
                type: GET_SCHEDULES_BY_ID,
                payload: response.data.data
            })
        }
    }
}
import { GET_MANAGE_PATIENTS, GET_PATIENT_HISTORY, SET_SELECTED_TAB, SET_SELECTED_NOTE, GET_PATIENT_HABIT_DATA, GET_PATIENT_MOOD_DATA, GET_PATIENT_TASK_DATA, GET_PATIENT_PILL_DATA, GET_PATIENT_PILL_CONFIG_DATA, GET_PATIENT_HABIT_CONFIG_DATA, GET_PATIENT_TASK_CONFIG_DATA } from "./type";
import { getUserIDFromIndexedDB } from './indexedDB';
import API from "../Services";

export const getPatientsToManage = (searchString) => {
  return async (dispatch, getState) => {
    const userId = await getUserIDFromIndexedDB();
    const response = await API.post("/user/searchPatient", {
      DoctorId: userId,
      SearchId: searchString,
      NumOfRecords: 6,
    });

    dispatch({
      type: GET_MANAGE_PATIENTS,
      payload: response.data.data
    })
  };
};

export const setSelectedTab = (tabID) => {
  return {
    type: SET_SELECTED_TAB,
    payload: tabID,
  };
};

export const setSelectedNoteID = (noteID) => {
  return {
    type: SET_SELECTED_NOTE,
    payload: noteID,
  };
};

export const getPatientHistory = (info, patientInfo) => {

  return async (dispatch, getState) => {

    const userId = info.userID;

    const response = await API.post('/prescriptionDetails/getPatientHistory', info);

    const patientObj = {
      patientHistory: response.data.data,
      patientInfo: patientInfo,
    };
    dispatch({
      type: GET_PATIENT_HISTORY,
      payload: patientObj,
    });
    return response.data.data;
  }
};

export const getPatientHabitData = (patID) => {
  return async (dispatch) => {
    const response = await API.post("/activityTracker/getPatientHabitData", {
      patientID: patID
    });
    dispatch({
      type: GET_PATIENT_HABIT_DATA,
      payload: response.data.data
    })
  };
}

export const getPatientMoodData = (patID) => {
  return async (dispatch) => {
    const response = await API.post("/activityTracker/getPatientMoodData", {
      patientID: patID
    });
    dispatch({
      type: GET_PATIENT_MOOD_DATA,
      payload: response.data.data
    })
  };
}

export const getPatientTaskData = (patID) => {
  return async (dispatch) => {
    const response = await API.post("/activityTracker/getPatientTaskData", {
      patientID: patID
    });
    dispatch({
      type: GET_PATIENT_TASK_DATA,
      payload: response.data.data
    })
  };
}

export const getPatientPillData = (patID) => {
  return async (dispatch) => {
    const response = await API.post("/activityTracker/getPatientPillData", {
      patientID: patID
    });
    dispatch({
      type: GET_PATIENT_PILL_DATA,
      payload: response.data.data
    })
  };
}

export const getPatientPillConfigData = (patID) => {
  return async (dispatch) => {
    const response = await API.post("/activityTracker/getPatientPillConfig", {
      patientID: patID
    });
    dispatch({
      type: GET_PATIENT_PILL_CONFIG_DATA,
      payload: response.data.data
    })
  };
}

export const getPatientHabitConfigData = (patID) => {
  return async (dispatch) => {
    const response = await API.post("/activityTracker/getPatientHabitConfig", {
      patientID: patID
    });
    dispatch({
      type: GET_PATIENT_HABIT_CONFIG_DATA,
      payload: response.data.data
    })
  };
}

export const getPatientTaskConfigData = (patID) => {
  return async (dispatch) => {
    const response = await API.post("/activityTracker/getPatientTaskConfig", {
      patientID: patID
    });
    dispatch({
      type: GET_PATIENT_TASK_CONFIG_DATA,
      payload: response.data.data
    })
  };
}
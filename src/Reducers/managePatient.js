import { GET_MANAGE_PATIENTS, GET_PATIENT_HISTORY, SET_SELECTED_TAB, SET_SELECTED_NOTE, GET_PATIENT_HABIT_DATA, GET_PATIENT_MOOD_DATA, GET_PATIENT_TASK_DATA, GET_PATIENT_PILL_DATA, GET_PATIENT_PILL_CONFIG_DATA, GET_PATIENT_HABIT_CONFIG_DATA, GET_PATIENT_TASK_CONFIG_DATA } from "../Actions/type";

const initialState = {
  patientsList: null,
  patientHistory: null,
  patientInfo: null,
  selectedTabID: 1,
  selectedNoteID: null,
  getHabitData: null,
  getMoodData: null,
  getTaskData: null,
  getPillData: null,
  getPillConfData: null,
  getHabitConfData: null,
  getTaskConfData: null
};

const managePatient = (state = initialState, action) => {
  switch (action.type) {
    case GET_MANAGE_PATIENTS:
      return { ...state, patientsList: action.payload };
    case GET_PATIENT_HISTORY:
      return {
        ...state,
        patientsList: null,
        patientHistory: action.payload.patientHistory,
        patientInfo: action.payload.patientInfo,
        selectedTabID: 1
      };
    case SET_SELECTED_TAB:
      return { ...state, selectedTabID: action.payload };
    case SET_SELECTED_NOTE:
      return { ...state, selectedNoteID: action.payload };
    case GET_PATIENT_HABIT_DATA:
      return { ...state, getHabitData: action.payload };
    case GET_PATIENT_MOOD_DATA:
      return { ...state, getMoodData: action.payload };
    case GET_PATIENT_TASK_DATA:
      return { ...state, getTaskData: action.payload };
    case GET_PATIENT_PILL_DATA:
      return { ...state, getPillData: action.payload };
    case GET_PATIENT_PILL_CONFIG_DATA:
      return { ...state, getPillConfData: action.payload };
    case GET_PATIENT_HABIT_CONFIG_DATA:
      return { ...state, getHabitConfData: action.payload };
    case GET_PATIENT_TASK_CONFIG_DATA:
      return { ...state, getTaskConfData: action.payload };
    default:
      return state;
  }
}

export default managePatient;

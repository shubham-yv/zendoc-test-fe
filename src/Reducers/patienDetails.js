import {
  ADD_NEW_PATIENT,
  PATIENT_DETAILS,
  WRITE_DOCTOR_NOTE,
  WRITE_PSYCHO_NOTE,
  GET_DOCTOR_NOTES,
  GET_PSYCHO_NOTES,
  GET_PATIENTS_LIST,
  SET_SELECTED_PATIENT,
  PATIENT_CREATED,
  NAVIGATE_BACK,
  GET_PRESCRIPTION_DRUG_DETAILS_LIST,
  SAVE_PRESCRIPTION,
  GET_PRESCRIPTION,
  CST,
  NAVIGATE_BACK_PSYC_NOTE,
  GET_PRESCRIPTION_BRAND_DETAILS_LIST,
  GET_DRUG_COMPOUND_LIST_FOR_PRES,
  GET_DOCTOR_NOTES_FOR_PRES,
  EDIT_DOCTOR_NOTES,
  SEND_PRESCRIPTION_FROM_CST,
  UPDATE_PATIENT_LIST,
  RESET_PATIENT_INFO,
  EDIT_PSYCHO_NOTES,
} from "../Actions/type.js";

const initialState = {
  addNewPatient: false,
  searchText: "",
  patientsList: null,
  psychoNote: false,
  doctorNote: false,
  psychoNoteDetail: null,
  doctorNoteDetail: null,
  patientInfo: null,
  DrugList: [],
  BrandList: [],
  navigateBack: false,
  getPrescription: null,
  ContinueSameTreatment: null,
  DoctorNoteDet: [],
  prescriptionFromCST: null,
  docNoteID: null,
  compoundList: [],
  patientsList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PATIENT_DETAILS:
      return action.payload;
    case ADD_NEW_PATIENT:
      return { ...state, ...action.payload };
    case WRITE_PSYCHO_NOTE:
      return { ...state, psychoNote: action.payload };
    case WRITE_DOCTOR_NOTE:
      return { ...state, doctorNote: action.payload };
    case GET_DOCTOR_NOTES_FOR_PRES:
      return {
        ...state,
        DoctorNoteDet: action.payload.DoctorNoteDet,
      };
    case GET_DOCTOR_NOTES:
      return { ...state, ...action.payload };
    case GET_PSYCHO_NOTES:
      return { ...state, ...action.payload };
    case GET_PATIENTS_LIST:
      return {
        ...state,
        patientsList: action.payload.patientList,
        searchText: action.payload.searchText,
      };
    case EDIT_DOCTOR_NOTES:
      return {
        ...state,
        doctorNoteDetails: action.payload.getdoctorNoteDetail,
      };
    case EDIT_PSYCHO_NOTES:
      return {
        ...state,
        psychoNoteDetails: action.payload.getPsychoNoteDetail,
      };
    case SEND_PRESCRIPTION_FROM_CST:
      return {
        ...state,
        prescriptionFromCST: action.payload,
      };
    case UPDATE_PATIENT_LIST:
      return {
        ...state,
        patientsList: action.payload
      };
    case RESET_PATIENT_INFO:
      return {
        ...state,
        patientInfo: null,
        searchText: ""
      };

    case SET_SELECTED_PATIENT:
      const selectedPatient = Array.isArray(state.patientsList) ?
        state.patientsList.find(
          (patient) => patient.patientid === action.payload
        ) : null;
      return {
        ...state,
        selectedPatientID: action.payload,
        patientInfo: selectedPatient,
        searchText: "",
        patientList: null,
      };

    case PATIENT_CREATED:
      return {
        ...state,
        patientInfo: action.payload,
        addNewPatient: false,
      };
    case GET_PRESCRIPTION_DRUG_DETAILS_LIST:
      return {
        ...state,
        DrugList: action.payload.DrugList,
        searchTexts: action.payload.searchTexts,
      };
    case GET_PRESCRIPTION_BRAND_DETAILS_LIST:
      return {
        ...state,
        BrandList: action.payload.BrandList,
        searchTexts: action.payload.searchTexts,
      };
    case GET_DRUG_COMPOUND_LIST_FOR_PRES:
      return {
        ...state,
        compoundList: action.payload.compoundList,
        searchTexts: action.payload.searchTexts,
      };
    case NAVIGATE_BACK:
      return {
        ...state,
        doctorNoteDetail: false,
        doctorNote: true,
      };
    case NAVIGATE_BACK_PSYC_NOTE:
      return {
        ...state,
        psychoNoteDetail: false,
        psychoNote: true,
      };
    case SAVE_PRESCRIPTION:
      return {
        ...state,
        Prescription: action.payload.Prescription,
      };
    case GET_PRESCRIPTION:
      return {
        ...state,
        getPrescription: action.payload.getPrescription,
      };
    case CST:
      return {
        ...state,
        CST: action.payload.CST,
      };
    default:
      return state;
  }
}

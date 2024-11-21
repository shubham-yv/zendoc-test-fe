import { EDIT_DOCTOR_NOTES, GET_DOCTOR_NOTES_FOR_PRES, GET_DRUG_COMPOUND_LIST_FOR_PRES, GET_PRESCRIPTION, GET_PRESCRIPTION_BRAND_DETAILS_LIST, GET_PRESCRIPTION_DRUG_DETAILS_LIST, NAVIGATE_BACK, NAVIGATE_BACK_PSYC_NOTE, PATIENT_DETAILS, SAVE_PRESCRIPTION, SEND_PRESCRIPTION_FROM_CST, ADD_NEW_PATIENT, WRITE_DOCTOR_NOTE, WRITE_PSYCHO_NOTE, GET_DOCTOR_NOTES, GET_PSYCHO_NOTES, GET_PATIENTS_LIST, SET_SELECTED_PATIENT, SAVE_DOCTOR_NOTE, PATIENT_CREATED, GET_DRUG_DETAILS_LIST, CST, UPDATE_PATIENT_LIST, RESET_PATIENT_INFO, EDIT_PSYCHO_NOTES, RESET_WRITE_DOCTOR_NOTE } from './type';
import API from '../Services';
import { getUserIDFromIndexedDB } from './indexedDB';

// export const addAndLoadPatient = (patientDetail) => {
//     return async (dispatch, getState) => {
//         patientDetail.dob = new Date().toString();
//         const response = await API.post('user/createAndLoadPatient', patientDetail);
//         if (response.data.code.toLowerCase() == "success") {
//             dispatch({
//                 type: PATIENT_CREATED,
//                 payload: { ...patientDetail }
//             })
//         }
//     }
// }

export const resetPatientInfo = () => {
    return {
        type: RESET_PATIENT_INFO
    };
};


export const addAndLoadPatient = (patientDetail) => {
    return async (dispatch, getState) => {

        patientDetail.dob = new Date().toString();
        const userId = await getUserIDFromIndexedDB();

        try {
            const response = await API.post('user/createAndLoadPatient', patientDetail);

            if (response.data.code.toLowerCase() === "success") {
                const newPatient = response.data.data;
                console.log(newPatient)
                dispatch({
                    type: PATIENT_CREATED,
                    payload: newPatient
                });

                const currentPatients = getState().patientDetails.patientsList || [];
                dispatch({
                    type: UPDATE_PATIENT_LIST,
                    payload: [...currentPatients, newPatient]
                });

                // Call getPatientList to refresh the patient list
                dispatch(getPatientList(newPatient.patientID));

                return newPatient;

            } else {
                throw new Error('Failed to create patient');
            }
        } catch (error) {
            console.error('Error creating and loading patient:', error);
            throw error;
        }
    }
}


export const addNewPatientFlag = (addNewPatient) => {
    let returnObj = {}
    returnObj.searchText = '';
    returnObj.patientList = null;
    returnObj.addNewPatient = addNewPatient;

    return {
        type: ADD_NEW_PATIENT,
        payload: returnObj
    }
}

export const writeDoctorNote = (doctorNote) => {
    return {
        type: WRITE_DOCTOR_NOTE,
        payload: doctorNote
    }
}

export const writePsychoNote = (psychoNote) => {
    return {
        type: WRITE_PSYCHO_NOTE,
        payload: psychoNote
    }
}

export const getDoctorNoteDetails = (requestObject) => {
    return async (dispatch, getState) => {

        const response = await API.post('/prescriptionDetails/getDoctorNoteDetail', {
            patID: requestObject.patID,
            userID: requestObject.userID,
            isViewLastNote: 1
        });

        dispatch({
            type: GET_DOCTOR_NOTES,
            payload: {
                doctorNoteDetail: response.data.data,
                doctorNote: false
            }
        })
    }
}

export const getPsychoNoteDetails = (requestObject) => {
    return async (dispatch, getState) => {

        const response = await API.post('/prescriptionDetails/getPsychotherapyNoteDetail', {
            patID: requestObject.patID,
            userID: requestObject.userID,
            isViewLastNote: 1
        });

        dispatch({
            type: GET_PSYCHO_NOTES,
            payload: {
                psychoNoteDetail: response.data.data,
                psychoNote: false
            }
        })
    }
}

export const getPatientList = (searchText) => {
    if (searchText.length == 0)
        return {
            type: GET_PATIENTS_LIST,
            payload: {
                patientList: null,
                searchText
            }
        }
    return async (dispatch, getState) => {
        const userId = await getUserIDFromIndexedDB();
        try {
            const response = await API.post('/user/searchPatient', {
                DoctorId: userId,
                SearchId: searchText,
                NumOfRecords: 3,
            });

            dispatch({
                type: GET_PATIENTS_LIST,
                payload: {
                    patientList: response.data.data,
                    searchText
                }
            })
        } catch (error) {
            dispatch({
                type: GET_PATIENTS_LIST,
                payload: {
                    patientList: [],
                    searchText
                }
            })
        }

    }
}

export const setSelectedPatient = (patientID) => {
    return {
        type: SET_SELECTED_PATIENT,
        payload: patientID
    }
}

export const saveDoctorNote = (docNote) => {
    return async (dispatch, getState) => {
        const response = await API.post('/prescriptionDetails/saveDoctorNote', docNote);
        if (response.data.code.toLowerCase() == "success")
            dispatch({
                type: GET_DOCTOR_NOTES,
                payload: {
                    doctorNoteDetail: docNote,
                    doctorNote: false
                }
            })
    }
}

export const savePsychoNote = (psychoNote) => {
    return async (dispatch, getState) => {
        const response = await API.post('/prescriptionDetails/savePsychotherapyNote', psychoNote);
        if (response.data.code.toLowerCase() == "success") {
            dispatch({
                type: GET_PSYCHO_NOTES,
                payload: {
                    psychoNoteDetail: psychoNote,
                    psychoNote: false
                }
            })
        }
    }
}

export const getDrugDetailsList = (searchTexts) => {
    if (searchTexts.length === 0) {
        return {
            type: GET_PRESCRIPTION_DRUG_DETAILS_LIST,
            payload: {
                DrugList: [],
                searchTexts
            }
        };
    }
    return async (dispatch, getState) => {
        try {

            const response = await API.post('/prescriptionDetails/getdrugDetailsbyName', {
                getdrugName: searchTexts,
                NumOfRecords: 4
            });

            dispatch({
                type: GET_PRESCRIPTION_DRUG_DETAILS_LIST,
                payload: {
                    DrugList: response.data.data,
                    searchTexts
                }
            });
        } catch (error) {
            console.log("ERROR FETCHING DRUG LIST:", error);
        }
    };
};

export const getDrugDetailsListByBrand = (searchTexts) => {
    if (searchTexts.length === 0) {
        return {
            type: GET_PRESCRIPTION_BRAND_DETAILS_LIST,
            payload: {
                BrandList: [],
                searchTexts
            }
        };
    }
    return async (dispatch, getState) => {
        try {

            const response = await API.post('/prescriptionDetails/getdrugDetailsbyBrand', {
                getdrugName: searchTexts,
                NumOfRecords: 4
            });

            dispatch({
                type: GET_PRESCRIPTION_BRAND_DETAILS_LIST,
                payload: {
                    BrandList: response.data.data,
                    searchTexts
                }
            });
        } catch (error) {
            console.log("ERROR FETCHING DRUG LIST:", error);
        }
    };
};

export const getDrugInteractionList = (searchTexts) => {
    return async (dispatch, getState) => {
        try {

            const response = await API.post('/prescriptionDetails/getdrugInteraction', {
                getdrugInteraction: searchTexts,
                NumOfRecords: 100
            });

            dispatch({
                type: GET_DRUG_COMPOUND_LIST_FOR_PRES,
                payload: {
                    compoundList: response.data.data,
                    searchTexts
                }
            });
        } catch (error) {
            console.log("ERROR FETCHING DRUG LIST:", error);
        }
    };
};

export const SavePrescription = (Data) => {
    return async (dispatch, getState) => {
        try {

            const response = await API.post('/prescriptionDetails/savePrescriptionDetails', Data);

            dispatch({
                type: SAVE_PRESCRIPTION,
                payload: {
                    Prescription: response.data.data,
                }
            });
        } catch (error) {
            console.log("ERROR:", error);
        }
    };
}



export const navigateBack = () => {
    return {
        type: NAVIGATE_BACK
    };
};

export const navigateBackPsycNote = () => {
    return {
        type: NAVIGATE_BACK_PSYC_NOTE
    };
};

export const getDoctorNoteDetailForPrescription = (requestObject) => {
    return async (dispatch, getState) => {

        const response = await API.post('/prescriptionDetails/getDoctorNoteDetail', requestObject);

        dispatch({
            type: GET_DOCTOR_NOTES_FOR_PRES,
            payload: {
                DoctorNoteDet: response.data.data
            }
        })
    }
}


export const sendPrescriptionFromCST = (prescriptionData) => ({
    type: SEND_PRESCRIPTION_FROM_CST,
    payload: prescriptionData
});

export const GetPrescription = (userInfo) => {
    return async (dispatch, getState) => {
        try {

            const response = await API.post('/prescriptionDetails/getPrescriptionDetails', userInfo);

            if (response.data.data.status.Value == "Available")
                dispatch({
                    type: GET_PRESCRIPTION,
                    payload: {
                        getPrescription: response.data.data,
                    }
                });
            else {
                dispatch({
                    type: GET_PRESCRIPTION,
                    payload: {
                        getPrescription: "CST has exceeded 3 months limit",
                    }
                });
            }
        } catch (error) {
            console.log("ERROR:", error);
        }
    };
}

export const editDocNoteID = (getdoctorNoteDetail) => {
    return async (dispatch, getState) => {
        dispatch({
            type: EDIT_DOCTOR_NOTES,
            payload: {
                getdoctorNoteDetail: getdoctorNoteDetail,
            },
        });
    };
};

export const editPsychoNoteID = (getPsychoNoteDetail) => {
    console.log(getPsychoNoteDetail);
    return async (dispatch, getState) => {
        dispatch({
            type: EDIT_PSYCHO_NOTES,
            payload: {
                getPsychoNoteDetail: getPsychoNoteDetail,
            },
        });
    };
};

export const resetWriteDoctorNote = () => ({
    type: RESET_WRITE_DOCTOR_NOTE,
});
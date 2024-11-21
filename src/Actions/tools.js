import API from '../Services';
import { CLEAR_BRAND_LIST, CLEAR_SIDE_EFEECT_LIST, GET_DRUG_COMPOUND_LIST, GET_DRUG_DETAILS_LIST, GET_DRUG_SIDE_EFFECTS, GET_DRUG_SIDE_EFFECTS_FOR_PRES } from './type';

export const getDrugDetailsList = (searchTexts) => {
    return async (dispatch, getState) => {
        try {

            const response = await API.post('/prescriptionDetails/getdrugDetailsbyName', {
                getdrugName: searchTexts,
                NumOfRecords: 5
            });

            const BrandList = await API.post('/prescriptionDetails/getdrugDetailsbyBrand', {
                getdrugName: searchTexts,
                NumOfRecords: 3
            });

            dispatch({
                type: GET_DRUG_DETAILS_LIST,
                payload: {
                    DrugList: response.data.data,
                    BrandList: BrandList.data.data,
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
                type: GET_DRUG_COMPOUND_LIST,
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

export const getDrugSdeEffects = (Data) => {
    return async (dispatch, getState) => {
        try {

            const response = await API.post('/prescriptionDetails/getDrugSideEffect', {
                getdrugName: Data.getdrugName,
                getDrugInteraction: Data.getDrugInteraction

            });

            dispatch({
                type: GET_DRUG_SIDE_EFFECTS,
                payload: {
                    sideEffects: response.data.data,
                }
            });


        } catch (error) {
            console.log("ERROR FETCHING DRUG LIST:", error);
        }
    };
};

export const getDrugSdeEffectsForPres = (Data) => {
    return async (dispatch, getState) => {
        try {

            const response = await API.post('/prescriptionDetails/getDrugSideEffect', {
                getdrugName: Data.getdrugName,
                getDrugInteraction: Data.getDrugInteraction

            });

            dispatch({
                type: GET_DRUG_SIDE_EFFECTS_FOR_PRES,
                payload: {
                    sideEffect: response.data.data,
                }
            });

        } catch (error) {
            console.log("ERROR FETCHING DRUG LIST:", error);
        }
    };
};

export const clearBrandList = () => ({
    type: CLEAR_BRAND_LIST,
});

export const clearSideEffectList = () => ({
    type: CLEAR_SIDE_EFEECT_LIST,
});


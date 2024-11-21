
import {
    CLEAR_BRAND_LIST,
    CLEAR_SIDE_EFEECT_LIST,
    GET_DRUG_COMPOUND_LIST,
    GET_DRUG_DETAILS_LIST,
    GET_DRUG_SIDE_EFFECTS,
    GET_DRUG_SIDE_EFFECTS_FOR_PRES
} from '../Actions/type.js';

const initialState = {
    DrugList: [],
    BrandList: [],
    compoundList: [],
    sideEffects: [],
    sideEffect: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DRUG_DETAILS_LIST:
            return {
                ...state,
                DrugList: action.payload.DrugList,
                BrandList: action.payload.BrandList,
                searchTexts: action.payload.searchTexts
            };
        case GET_DRUG_COMPOUND_LIST:
            return {
                ...state,
                compoundList: action.payload.compoundList,
                searchTexts: action.payload.searchTexts
            };
        case GET_DRUG_SIDE_EFFECTS:
            return {
                ...state,
                sideEffects: action.payload
            };
        case GET_DRUG_SIDE_EFFECTS_FOR_PRES:
            return {
                ...state,
                sideEffect: action.payload.sideEffect
            };
        case CLEAR_BRAND_LIST:
            return { ...state, BrandList: [] };
        case CLEAR_SIDE_EFEECT_LIST:
            return { ...state, sideEffects: [] };
        default:
            return state;
    }
}
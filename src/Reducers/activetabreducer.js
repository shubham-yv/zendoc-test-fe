import { ACTIVE_TAB } from '../Actions/type';
const initialState = "";

export default function (state = initialState,action) {
    switch(action.type) {
        case ACTIVE_TAB:
            return action.payload;
        default:
            return state;
    }
}
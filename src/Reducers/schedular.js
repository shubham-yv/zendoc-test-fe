import { 
    ADD_NEW_SCHEDULE, 
    GET_SCHEDULES, 
    SAVE_SCHEDULE, 
    MODIFY_SCHEDULE, 
    GET_SCHEDULES_BY_ID 
  } from "../Actions/type";
  
  const initialState = {
    addNewSchedule: false,
    meetingList: []
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case ADD_NEW_SCHEDULE:
        return {
          ...state,
          addNewSchedule: action.payload
        };
        
      case SAVE_SCHEDULE:
        return {
          ...state,
          addNewSchedule: false,
          meetingList: [
            ...state.meetingList,
            ...(Array.isArray(action.payload) ? action.payload : [])
          ]
        };
        
      case GET_SCHEDULES:
        return {
          ...state,
          meetingList: Array.isArray(action.payload) ? action.payload : []
        };
        
      case MODIFY_SCHEDULE:
        return {
          ...state,
          meetingList: state.meetingList.map(meeting =>
            meeting.id === action.payload.id ? action.payload : meeting
          )
        };
        
      case GET_SCHEDULES_BY_ID:
        return {
          ...state,
          meetingList: Array.isArray(action.payload) ? action.payload : []
        };
        
      default:
        return state;
    }
  }
  
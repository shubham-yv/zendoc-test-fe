import {
  SCHEDULE_DATA, LOAD_DATA,
  FILTER_BY_DATE,
  FILTER_BY_FUTURE_DATE,
  FILTER_BY_MISSED_DATE,
} from "../Actions/type";

const initialState = {
  appointmentDetail: [],
  filteredAppointments: [],
  ScheduleData: [],
  searchText: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        appointmentDetail: action.payload || [],
      };

    case FILTER_BY_DATE:
    case FILTER_BY_FUTURE_DATE:
    case FILTER_BY_MISSED_DATE:
      return {
        ...state,
        filteredAppointments: action.payload?.filteredAppointments || [],
      };

    case SCHEDULE_DATA:
      return {
        ...state,
        ScheduleData: action.payload?.ScheduleData || [],
        searchText: action.payload?.searchText || "",
      };

    default:
      return state;
  }
}

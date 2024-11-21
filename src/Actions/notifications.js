
import API from "../Services";
import { getUserIDFromIndexedDB } from "./indexedDB";
import { FILTER_BY_DATE, FILTER_BY_FUTURE_DATE, FILTER_BY_MISSED_DATE, FILTER_PENDING_REQUEST, LOAD_DATA, SCHEDULE_DATA } from "./type";

export const loadData = (userInfo) => {
  return async (dispatch, getState) => {
    try {
      const response = await API.post("/schedule/getScheduleDetail", userInfo);

      if (response.data.code.toUpperCase() === "SUCCESS") {
        dispatch({
          type: LOAD_DATA,
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.error("Error loading schedule data:", error);
    }
  };
};

export const filterByDate = (appointmentDetails, date) => {
  const filteredAppointments = appointmentDetails.filter(
    (details) => details.scheduleGroupType == "Today"
  );

  return {
    type: FILTER_BY_DATE,
    payload: {
      date: date,
      filteredAppointments: filteredAppointments,
    },
  };
};

export const filterByFutureDate = (appointmentDetails, date) => {
  if (appointmentDetails) {
    const filteredAppointments = appointmentDetails.filter(
      (details) => details.scheduleGroupType == "Upcoming"
    );
    return {
      type: FILTER_BY_FUTURE_DATE,
      payload: {
        date: date,
        filteredAppointments: filteredAppointments,
      },
    };
  }
};

export const filterByMissedDate = (appointmentDetails, date) => {
  if (appointmentDetails) {
    const filteredAppointments = appointmentDetails.filter(
      (details) => details.scheduleGroupType == "Missed"
    );

    return {
      type: FILTER_BY_MISSED_DATE,
      payload: {
        date: date,
        filteredAppointments: filteredAppointments,
      },
    };
  } else {
    return null;
  }
};

export const filterpendingappo = (appointmentDetails, date) => {
  if (appointmentDetails) {
    const filteredAppointments = appointmentDetails.filter(
      (details) => details.scheduleGroupType == "PendingRequest"
    );

    return {
      type: FILTER_PENDING_REQUEST,
      payload: {
        date: date,
        filteredAppointments: filteredAppointments,
      },
    };
  } else {
    return null;
  }
};

export const searchPatientSchedule = (searchText) => {
  return async (dispatch) => {
    if (searchText.length === 0) {
      dispatch({
        type: SCHEDULE_DATA,
        payload: {
          ScheduleData: [],
          searchText,
        },
      });
      return;
    }

    try {
      const userId = await getUserIDFromIndexedDB();
      const date = new Date().toISOString().split("T")[0];
      const response = await API.post("/schedule/getScheduleDetailByName", {
        currentDate: date,
        doctorId: userId,
        appointmentTitle: searchText,
      });

      if (response.data.code.toUpperCase() === "SUCCESS") {
        dispatch({
          type: SCHEDULE_DATA,
          payload: {
            ScheduleData: response.data.data,
            searchText,
          },
        });
      }
    } catch (error) {
      console.error("Error loading schedule data:", error);
    }
  };
};

import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import Phone from "../../../style/images/phone-call.svg";
import Mail from "../../../style/images/mail.svg";
import Group_Consulting from "../../../style/images/Group-consulting.svg";
import profile from "../../../style/images/profile-mid.svg";
import { useDispatch } from "react-redux";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getScheduleDetail,
  getScheduleDetailByID,
  ModifySchedule,
} from "../../../Actions/schedule";
import { connect } from "react-redux";
import { getUserIDFromIndexedDB } from "../../../Actions/indexedDB";
import "../../../style/schedular/AppoitmentDetails.css";
import dayjs from "dayjs";
import Switch from "@mui/material/Switch";

const AppointmentDetailsModal = ({
  showModal,
  handleCloseModal,
  meetingDetails,
  onSaveChanges,
  scheduleID,
  patientInfo,
}) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    userID: "",
    scheduleID: scheduleID,
    appointmentTitle: "",
    scheduleDate: dayjs(),
    startTime: dayjs(),
    endTime: dayjs().add(1, "hour"),
    message: "",
    priority: meetingDetails.priority,
    startTimeString: dayjs().format("hh:mm A"),
    endTimeString: dayjs().add(1, "hour").format("hh:mm A"),
  });

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const userID = await getUserIDFromIndexedDB();
        setState((prevState) => ({
          ...prevState,
          userID: userID,
        }));
      } catch (error) {
        console.error("Error fetching userID from IndexedDB:", error);
      }
    };
    fetchUserID();
  }, []);

  useEffect(() => {
    if (meetingDetails) {
      const scheduleDate = dayjs(meetingDetails.scheduleDate);
      const startTime = dayjs(meetingDetails.startTime);
      const endTime = dayjs(meetingDetails.endTime);

      setState((prevState) => ({
        ...prevState,
        appointmentTitle: meetingDetails.title || "",
        scheduleDate: scheduleDate.isValid() ? scheduleDate : dayjs(),
        startTime: startTime.isValid() ? startTime : dayjs(),
        endTime: endTime.isValid() ? endTime : dayjs().add(1, "hour"),
        startTimeString: startTime.isValid()
          ? startTime.format("hh:mm A")
          : dayjs().format("hh:mm A"),
        endTimeString: endTime.isValid()
          ? endTime.format("hh:mm A")
          : dayjs().add(1, "hour").format("hh:mm A"),
        message: meetingDetails.message || "",
        priority: meetingDetails.priority || 0,
      }));
    }
  }, [meetingDetails]);

  const handleInputChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    handleInputChange("scheduleDate", date);
  };

  const HandleEdit = async () => {
    const startDate = state.scheduleDate.format("YYYY-MM-DD");

    const editedObject = {
      ...state,
      startTime: state.startTimeString,
      endTime: state.endTimeString,
      scheduleDate: startDate,
      priority: state.priority,
    };
    await dispatch(ModifySchedule(editedObject, dispatch));
    onSaveChanges(editedObject);
  };

  const handleRefresh = async () => {
    await dispatch(getScheduleDetail(state.userID));
  };

  const handlePriorityChange = (event) => {
    setState({
      ...state,
      priority: event.target.value,
    });
  };

  const handleCloseModalInternal = () => {
    handleCloseModal();
    onSaveChanges(state);
  };

  const handleStartTimeChange = (time) => {
    if (time) {
      const formattedTime = time.format("hh:mm A");
      setState((prevState) => ({
        ...prevState,
        startTime: time,
        startTimeString: formattedTime,
      }));
    }
  };

  const handleEndTimeChange = (time) => {
    if (time) {
      const formattedTime = time.format("hh:mm A");
      setState((prevState) => ({
        ...prevState,
        endTime: time,
        endTimeString: formattedTime,
      }));
    }
  };

  const {
    inviteeEmailId,
    inviteeMobileNumber,
    firstName,
    lastName,
    patientID,
    isVirtualMeeting,
    problem,
  } = meetingDetails;

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        style={{
          width: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "left",
              margin: "0 auto",
              width: "100%",
              fontSize: "24px",
              color: "#254069",
            }}
          >
            Schedule Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Patient_container">
            <div className="patient_left">
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Card.Img className="patient-img" src={profile} />
              </div>
              <div className="patient_mobile">
                <img src={Phone} alt="Phone call" />
                <span>{inviteeMobileNumber}</span>
              </div>
              <div className="Patient_email">
                <img src={Mail} alt="Email" />
                <span>{inviteeEmailId}</span>
              </div>
              <div className="Patient_email">
                <img src={Mail} alt="Email" />
                <span>{patientID ? patientID : "-"}</span>
              </div>
              <div className="patient-consultation">Virtual consulting</div>
              <div className="patient_status">
                <img src={Group_Consulting} alt="Group_Consulting" />
                <span
                  style={{
                    color:
                      meetingDetails.isVirtualMeeting === 1
                        ? "#3C9D00"
                        : "#D64522",
                  }}
                >
                  {meetingDetails.isVirtualMeeting === 1
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
            </div>

            <div className="paitent_right">
              <div className="paitent_right_sub">
                <div className="Header_parent">
                  <div className="appointement_title">Visitor Name</div>
                  <div className="appointement_value">
                    {firstName + " " + lastName}
                  </div>
                </div>
                <div className="Header_parent">
                  <div className="appointement_title">Age</div>
                  <div className="appointement_value">
                    {patientInfo && patientInfo.age ? patientInfo.age : "-"}
                  </div>
                </div>
                <div className="Header_parent">
                  <div className="appointement_title">Priority</div>
                  <select
                    className="custom-select-priority"
                    onChange={handlePriorityChange}
                    value={state.priority}
                    style={{
                      color:
                        state.priority == 0
                          ? "#FF9241"
                          : state.priority == 1
                          ? "#206FBF"
                          : state.priority == 2
                          ? "#E3AD33"
                          : state.priority == 3
                          ? "#D64522"
                          : "#FF9241",
                    }}
                  >
                    <option value={0} style={{ color: "#FF9241" }}>
                      &#8226; Normal
                    </option>
                    <option value={1} style={{ color: "#206FBF" }}>
                      &#8226; Low
                    </option>
                    <option value={2} style={{ color: "#E3AD33" }}>
                      &#8226; Medium
                    </option>
                    <option value={3} style={{ color: "#D64522" }}>
                      &#8226; High
                    </option>
                  </select>
                </div>
                <div className="Header_parent">
                  <div className="appointement_title">Appointment type</div>
                  <div className="appointement_value">-</div>
                </div>
                <div className="Header_parent">
                  <div className="appointement_title">No of session</div>
                  <div className="appointement_value">-</div>
                </div>
              </div>

              <div className="patient_problem">
                <div className="appointement_title">Problem</div>
                <div className="appointement_value">
                  {problem ? problem : "-"}
                </div>
              </div>

              <div className="ns-time-parent">
                <div className="ns-date-parent">
                  <label className="label-basic">Date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={handleDateChange}
                      value={state.scheduleDate}
                    />
                  </LocalizationProvider>
                </div>

                <div className="ns-starttime-parent">
                  <label className="label-basic">Start Time</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={state.startTime}
                      onChange={handleStartTimeChange}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className="ns-time-parent">
                <div className="ns-endtime-parent">
                  <label className="label-basic">End Time</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={state.endTime}
                      onChange={handleEndTimeChange}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>

          <Modal.Footer>
            <div className="paitent_save">
              <button
                className="button transparent-button avg-button"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="button orange-button avg-button"
                onClick={() => {
                  HandleEdit();
                  handleRefresh();
                  handleCloseModalInternal();
                  onSaveChanges(state);
                }}
              >
                Save Changes
              </button>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  patientInfo: state.patientDetails.patientInfo,
});

export default connect(mapStateToProps, {
  ModifySchedule,
  getScheduleDetailByID,
})(AppointmentDetailsModal);

import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Phone from "../../../style/images/phone-call.svg";
import Mail from "../../../style/images/mail.svg";
import Feather_Edit from "../../../style/images/feather-edit.svg";
import Group_Consulting from "../../../style/images/Group-consulting.svg";
import profile from "../../../style/images/profile-mid.svg";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { connect, useDispatch } from "react-redux";
import {
  ModifySchedule,
  getScheduleDetail,
  getScheduleDetailByID,
} from "../../../Actions/schedule";
import { getUserIDFromIndexedDB } from "../../../Actions/indexedDB";
import { loadData } from "../../../Actions/notifications";
import dayjs from "dayjs";

const AppointmentDetails = ({
  showModalOne,
  setShowModalOne,
  selectedMeeting,
  scheduleID,
}) => {
  const [editclick, setEditclick] = useState(false);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    userID: "",
    scheduleID: "",
    appointmentTitle: "",
    scheduleDate: dayjs(),
    startTime: dayjs(),
    endTime: dayjs().add(1, "hour"),
    message: "",
    startTimeString: dayjs().format("hh:mm A"),
    endTimeString: dayjs().add(1, "hour").format("hh:mm A"),
  });

  useEffect(() => {
    if (scheduleID) {
      setState((prevState) => ({
        ...prevState,
        scheduleID: scheduleID,
      }));
    }
  }, [scheduleID]);


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

  // Set default values from selectedMeeting when it changes
  useEffect(() => {
    if (selectedMeeting) {
      setState((prevState) => ({
        ...prevState,
        appointmentTitle: selectedMeeting.appointmentTitle || "",
        scheduleDate: dayjs(selectedMeeting.scheduleDate),
        startTime: dayjs(),
        endTime: dayjs().add(1, "hour"),
        startTimeString: dayjs().format("hh:mm A"),
        endTimeString: dayjs().add(1, "hour").format("hh:mm A"),
      }));
    }
  }, [selectedMeeting]);

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
  };

  const handleRefresh = async () => {
    await dispatch(getScheduleDetail(state.userID));
    await dispatch(loadData({ userID: state.userID }));
  };

  const handelEditclick = () => {
    setEditclick(!editclick);
  };

  const handleCloseModalOne = () => {
    setShowModalOne(false);
  };

  const handleCloseModalOneCross = () => {
    setShowModalOne(false);
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

  const getPriorityText = (priorityValue) => {
    switch (priorityValue) {
      case 0:
        return "Normal";
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <Modal
        show={showModalOne}
        onHide={handleCloseModalOneCross}
        centered
        style={{
          width: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "1122",
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
            }}
          >
            Appointment details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMeeting && (
            <div className="Patient_container">
              <div className="patient_left">
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <Card.Img className="patient-img" src={profile} />
                </div>
                <div className="patient_mobile">
                  <img src={Phone} alt="Phone call" />
                  <span>{selectedMeeting.inviteeMobileNumber || "-"}</span>
                </div>
                <div className="Patient_email">
                  <img src={Mail} alt="Email" />
                  <span>{selectedMeeting.inviteeEmailId || "-"}</span>
                </div>
                <div className="patient-consultation">Virtual consulting</div>
                <div className="patient_status">
                  <img src={Group_Consulting} alt="Group_Consulting" />
                  <span>Active</span>
                </div>
              </div>
              <div className="paitent_right">
                <div className="paitent_right_sub">
                  <div className="Header_parent">
                    <div className="appointement_title">Visitor Name</div>
                    <div className="appointement_value">
                      {selectedMeeting.appointmentTitle ||
                        selectedMeeting.details ||
                        "-"}
                    </div>
                  </div>
                  <div className="Header_parent">
                    <div className="appointement_title">Age</div>
                    <div className="appointement_value">
                      {selectedMeeting.age || "-"}
                    </div>
                  </div>
                  <div className="Header_parent">
                    <div className="appointement_title">Priority</div>
                    <div className="patient-priority">
                      <span style={{ marginRight: ".4rem" }}>&#9679;</span>
                      {getPriorityText(selectedMeeting.priority) || "-"}
                    </div>
                  </div>
                  <div className="Header_parent">
                    <div className="appointement_title">Appointment type</div>
                    <div className="appointement_value">Virtual consulting</div>
                  </div>
                  <div className="Header_parent">
                    <div className="appointement_title">No of session</div>
                    <div className="appointement_value">
                      {selectedMeeting.isVirtualMeeting || "-"}
                    </div>
                  </div>
                </div>
                <div className="patient_problem">
                  <div className="appointement_title">Problem</div>
                  <div className="appointement_value">
                    {selectedMeeting.problem || "-"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {editclick ? (
            <>
              <div className="ns-time-parent">
                <div className="ns-date-parent">
                  <label className="label-basic">Date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        onChange={handleDateChange}
                        value={state.scheduleDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <div className="ns-starttime-parent">
                  <label className="label-basic">Start Time</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        value={state.startTime}
                        onChange={handleStartTimeChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

              <div className="ns-time-parent">
                <div className="ns-endtime-parent">
                  <label className="label-basic">End Time</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        value={state.endTime}
                        onChange={handleEndTimeChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="appointement_title">Date / Time</div>
              <div className="appointement_value">
                <span className="appointement_date">
                  {selectedMeeting?.scheduleDate}
                </span>
                <span className="appointement_time">
                  {selectedMeeting?.startTime || "-"} -{" "}
                  {selectedMeeting?.endTime || "-"}
                </span>
              </div>
            </div>
          )}

          <Button
            variant="basic"
            className={editclick ? "button_none" : "button-edit"}
            onClick={handelEditclick}
          >
            <img src={Feather_Edit} alt="Feather_Edit" />
            <span>Edit</span>
          </Button>
        </Modal.Body>

        {editclick && (
          <Modal.Footer>
            <div className="paitent_save">
              <button
                className="button transparent-button avg-button"
                onClick={handelEditclick}
              >
                Cancel
              </button>
              <button
                className="button orange-button avg-button"
                onClick={() => {
                  HandleEdit();
                  handleRefresh();
                  handleCloseModalOne();
                }}
              >
                Save Changes
              </button>
            </div>
          </Modal.Footer>
        )}
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
  getScheduleDetail,
  loadData,
})(AppointmentDetails);

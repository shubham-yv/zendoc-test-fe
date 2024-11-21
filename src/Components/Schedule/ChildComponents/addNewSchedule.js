import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AddNewScheduleProfile from "../../../style/images/AddNewScheduleP.svg";
import "../../../style/schedular/addNewSchedule.css";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import {
  addNewScheduleFlag,
  addNewScheduleMeeting,
  getScheduleDetail,
} from "../../../Actions/schedule";
import { getUserIDFromIndexedDB } from "../../../Actions/indexedDB";
import { Modal, Button } from "react-bootstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FormControl, MenuItem, Select } from "@mui/material";

dayjs.extend(customParseFormat);

const AddNewSchedule = ({
  addNewSchedule,
  addNewScheduleFlag,
  addNewScheduleMeeting,
  getScheduleDetail,
  patientID,
  patientInfo
}) => {
  const [state, setState] = useState({
    appointmentTitle: "",
    problem: "",
    message: "",
    scheduleDate: dayjs(),
    startTime: dayjs(),
    endTime: dayjs().add(1, "hour"),
    inviteeEmailId: "",
    inviteeMobileNumber: "",
    isVirtualMeeting: false,
    priority: 0,
    startTimeString: dayjs().format("hh:mm A"),
    endTimeString: dayjs().add(1, "hour").format("hh:mm A"),
  });

  const [showInviteFields, setShowInviteFields] = useState(false);

  const [alert, setAlert] = useState({
    type: "error",
    text: "Please Add And Select Patient To Schedule Consulting",
    show: !patientID,
  });

  const handleVirtualMeetingToggle = () => {
    setState((prevState) => ({
      ...prevState,
      isVirtualMeeting: !prevState.isVirtualMeeting,
    }));
  };

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

  useEffect(() => { }, [patientInfo, patientID]);

  const handleInputChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    handleInputChange(name, value);
  };

  const handleDateChange = (date) => {
    handleInputChange("scheduleDate", date);
  };

  const handleInviteLabelClick = () => {
    setShowInviteFields((prevState) => !prevState);
  };

  const handlePriorityChange = (e) => {
    handleInputChange("priority", e.target.value);
  };

  const handleSubmit = async () => {
    if (!patientID) {
      setAlert({
        type: "error",
        text: "Patient ID is not available",
        show: true,
      });
      return;
    }

    const startDate = state.scheduleDate.format("YYYY-MM-DD");

    const obj = {
      ...state,
      userID: state.userID,
      patientID: patientID,
      startTime: state.startTimeString,
      endTime: state.endTimeString,
      scheduleDate: startDate,
      priority: state.priority,
      isVirtualMeeting: state.isVirtualMeeting,
    };

    console.log(obj, "obj")

    await addNewScheduleMeeting(obj);
    await getScheduleDetail(state.userID);
  };

  const handleCancel = () => {
    addNewScheduleFlag(false);
  };

  const onCloseAlert = () => {
    setAlert((prevAlert) => ({
      ...prevAlert,
      show: false,
    }));
  };

  return (
    <>
      {alert.show ? (
        <Modal
          show={addNewSchedule}
          onHide={handleCancel}
          centered
          style={{
            maxWidth: "600px",
            width: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                color: "#d64522",
                margin: "0 auto",
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              No Patient is Added !
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Please Add And Select Patient To Schedule Consulting</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button
              className="Start-Consulting-Schedule-BTN"
              onClick={addNewSchedule}
              style={{ padding: "10px 50px", fontSize: "18px" }}
            >
              <AddIcon />
              Start Consulting
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          dialogClassName="new-schedule-modal"
          show={addNewSchedule}
          onHide={handleCancel}
          style={{ zIndex: "1122" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="new-schedule-header">
                <label className="label-basic">Add New Schedule</label>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="new-schedule-body">
              <div className="ns-title-parent">
                <label className="label-basic">Appointment Title</label>
                <input
                  onChange={handleTextChange}
                  value={state.appointmentTitle}
                  name="appointmentTitle"
                  type="text"
                  className="form-control"
                  placeholder="Add Title"
                  style={{ fontSize: "smaller" }}
                />
                <label
                  className="label-Appointment"
                  style={{ color: "#808495", fontSize: ".8rem" }}
                >
                  Name of the meeting person or appointment title
                </label>
              </div>

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
                        defaultValue={state.startTime}
                        onChange={handleStartTimeChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <div className="ns-endtime-parent">
                  <label className="label-basic">End Time</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        value={state.endTime}
                        defaultValue={state.endTime}
                        onChange={handleEndTimeChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

              <div>
                <div className="ns-msg-parent">
                  <label className="label-basic">Message</label>
                  <textarea
                    onChange={handleTextChange}
                    value={state.message}
                    name="message"
                    className="form-control"
                    placeholder="Write medicine advice for patients to follow"
                    style={{ fontSize: "smaller" }}
                  ></textarea>
                </div>

                <div className="ns-msg-parent">
                  <label className="label-basic">Problem</label>
                  <textarea
                    onChange={handleTextChange}
                    value={state.problem}
                    name="problem"
                    className="form-control"
                    placeholder="Write patient problem here"
                    style={{ fontSize: "smaller" }}
                  ></textarea>
                </div>
              </div>

              <div className="Virtual-Meet-Container">
                <div className="ns-msg-parent">
                  <label className="label-basic">Priority</label>
                  <FormControl>
                    <Select
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
                                  : "#E3AD33",

                        fontSize: "0.8rem",
                      }}
                    >
                      <MenuItem
                        value={0}
                        style={{ color: "#FF9241", fontSize: "0.8rem" }}
                      >
                        &#8226; Normal
                      </MenuItem>
                      <MenuItem
                        value={1}
                        style={{ color: "#206FBF", fontSize: "0.8rem" }}
                      >
                        &#8226; Low
                      </MenuItem>
                      <MenuItem
                        value={2}
                        style={{ color: "#E3AD33", fontSize: "0.8rem" }}
                      >
                        &#8226; Medium
                      </MenuItem>
                      <MenuItem
                        value={3}
                        style={{ color: "#D64522", fontSize: "0.8rem" }}
                      >
                        &#8226; High
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="ns-msg-parent">
                  <label className="label-basic">Is Virtual Meeting?</label>
                  <div style={{ marginTop: ".6rem" }}>
                    <Switch
                      checked={state.isVirtualMeeting}
                      onChange={handleVirtualMeetingToggle}
                      inputProps={{ "aria-label": "virtual meeting toggle" }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="ns-AddNewScheduleProfile"
                onClick={handleInviteLabelClick}
              >
                <img src={AddNewScheduleProfile} alt="" />
                <label className="label-basic">Invite person for meeting</label>
              </div>

              {showInviteFields && (
                <>
                  <div className="ns-patient-email">
                    <label className="label-basic">Enter email address</label>
                    <input
                      onChange={handleTextChange}
                      value={state.inviteeEmailId}
                      name="inviteeEmailId"
                      type="email"
                      className="form-control"
                      placeholder="enter email address"
                    />
                  </div>
                  <div className="ns-patient-number">
                    <label className="label-basic">Mobile Number</label>
                    <input
                      onChange={handleTextChange}
                      value={state.inviteeMobileNumber}
                      name="inviteeMobileNumber"
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      className="form-control"
                      placeholder="enter mobile number"
                    />
                  </div>
                </>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="new-schedule-buttonbar">
              <button
                className="button transparent-button avg-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="button orange-button avg-button"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  patientID: state.patientDetails?.patientInfo?.patientid,
  addNewSchedule: state.schedular.addNewSchedule,
  patientInfo: state.patientDetails.patientInfo,
});

const mapDispatchToProps = {
  addNewScheduleFlag,
  addNewScheduleMeeting,
  getScheduleDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSchedule);
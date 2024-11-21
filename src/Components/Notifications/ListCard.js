import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AppointmentDetails from "./childComponents/AppointmentDetails";
import profile from "../../style/images/profile-mid.svg";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { setSelectedPatient, getPatientList } from "../../Actions/consultation";
import { setActiveTab } from "../../Actions/landingPage";

const ListCard = ({ filterData, setActiveTab, setSelectedPatient, getPatientList }) => {
  const [cardVisibility, setCardVisibility] = useState({});
  const [showModalOne, setShowModalOne] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [closeId, setCloseId] = useState(null);

  useEffect(() => {
    if (filterData) {
      const initialVisibility = filterData.reduce((acc, details) => {
        const id = `${details.scheduleID}_${details.scheduleGroupType}`;
        acc[id] = true;
        return acc;
      }, {});
      setCardVisibility(initialVisibility);
    }
  }, [filterData]);

  const handleSendNoteClick = (details) => {
    setSelectedMeeting(details);
    setShowModalOne(true);
  };

  const handleSendNoteClickSub = async (details) => {
    await getPatientList(details.patientID); // Fetch patient list using patient ID
    setSelectedPatient(details.patientID); // Set selected patient
    setActiveTab('1');
  };

  const handleCloseClick = (id) => {
    setCloseId(id);
    setShowConfirmModal(true);
  };

  const confirmClose = () => {
    setCardVisibility((prevVisibility) => ({
      ...prevVisibility,
      [closeId]: false,
    }));
    setShowConfirmModal(false);
  };

  const cancelClose = () => {
    setShowConfirmModal(false);
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 0:
        return "#FF9241";
      case 1:
        return "#206FBF";
      case 2:
        return "#E3AD33";
      case 3:
        return "#D64522";
      default:
        return "#1E64CC";
    }
  };

  return (
    <>
      {filterData &&
        filterData.map((details) => {
          const id = `${details.scheduleID}_${details.scheduleGroupType}`;
          if (!cardVisibility[id]) {
            return null;
          }
          return (
            <Card key={id} className="patient-card-list">
              <Card.Body>
                <div className="list-main-container">
                  <div className="list-first-container">
                    <Card.Img className="patient-img-card" src={profile} />
                    <Card.Text
                      onClick={() => handleSendNoteClick(details)}
                      className="details-link"
                    >
                      View Details
                    </Card.Text>

                    <Card.Text>
                      {details.appointmentTitle || details.details || "-"}
                    </Card.Text>
                    <Card.Text>{details.inviteeMobileNumber || "-"}</Card.Text>
                    <Card.Text>
                      <span style={{ color: "#257D79", marginRight: "0.1rem" }}>
                        <VideocamOutlinedIcon />
                      </span>
                      {details.scheduleDate || details.appointmentDate || "-"}{" "}
                      {details.startTime || "-"} - {details.endTime || "-"}
                    </Card.Text>
                    <Card.Text
                      className="patient-priority"
                      style={{ color: getPriorityColor(details.priority) }}
                    >
                      <span style={{ marginRight: ".4rem" }}>&#9679;</span>
                      {getPriorityText(details.priority) || "-"}
                    </Card.Text>
                    {details.SideAffectReported && (
                      <Card.Text className="patient-priority-side-effects">
                        <span style={{ marginRight: ".2rem" }}>&#9650;</span>
                        {details.SideAffectReported || "-"}
                      </Card.Text>
                    )}
                    <Card.Text>
                      <div className="list-buttons">
                        <Button
                          variant="primary"
                          className="button-primary"
                          onClick={() => handleSendNoteClickSub(details)}
                        >
                          Attend Now
                        </Button>
                        <Button
                          variant="basic"
                          className="button-basic d-flex"
                          onClick={() => handleSendNoteClick(details)}
                        >
                          <RotateRightIcon />
                          Reschedule
                        </Button>
                      </div>
                    </Card.Text>
                  </div>
                  <span onClick={() => handleCloseClick(id)}>
                    <CloseIcon
                      style={{ color: "#808495", cursor: "pointer" }}
                    />
                  </span>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      <AppointmentDetails
        setShowModalOne={setShowModalOne}
        showModalOne={showModalOne}
        selectedMeeting={selectedMeeting}
      />
      <Modal show={showConfirmModal} onHide={cancelClose} centered className="modal-centered">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Close</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to close this notification?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelClose}>
            No
          </Button>
          <Button variant="primary" onClick={confirmClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  patientsList: state.patientDetails.patientsList,
  selectedPatientID: state.patientDetails.selectedPatientID,
});

const mapDispatchToProps = {
  setSelectedPatient,
  setActiveTab,
  getPatientList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCard);

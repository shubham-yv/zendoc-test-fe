import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SelectedDoctorNote from "../SelectedDoctorNote/mp-doctorNote";
import DoctorPrescription from "../SelectedDoctorNote/mp-prescription";
import { setSelectedNoteID } from "../../../../Actions/managePatient";
import { getAllDataFromIndexedDB } from "../../../../Actions/indexedDB";

const PatientNoteBody = ({
  doctorNote,
  drugs,
  tools,
  selectedNoteID,
  setSelectedNoteID,
}) => {
  const showDoctorNote = () => {
    setSelectedNoteID(
      selectedNoteID === doctorNote.docNoteID ? null : doctorNote.docNoteID
    );
  };
  const [userData, setUserData] = useState({
    prefferedName: '',
    salutation: ''
  });

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    const fetchData = async () => {
      try {
        const dataFromIndexedDB = await getAllDataFromIndexedDB();
        if (isMounted) {
          setUserData({
            ...userData,
            prefferedName: dataFromIndexedDB.prefferedName || '',
            salutation: dataFromIndexedDB.salutation || '',
            firstName: dataFromIndexedDB.firstName || '',
            lastName: dataFromIndexedDB.lastName || '',
          });
        }
      } catch (error) {
        console.error("Error fetching data from IndexedDB:", error);
      }
    };

    fetchData();

    // Cleanup function to run when the component unmounts
    return () => {
      isMounted = false; // Update the flag to indicate unmounting
    };
  }, []);

  return (
    <>
      <div className="mp-ph-note-item">
        <div className="mp-ph-note-summary">
          <div className="mp-nh-session">{doctorNote?.docNoteID}</div>
          <div className="mp-nh-date">{doctorNote?.Date}</div>
          <div className="mp-nh-patient">{doctorNote.guardianName}</div>
          <div className="mp-nh-doctor">{userData.firstName + userData.lastName}</div>
          <div className="mp-nh-visit">{doctorNote.provisionalDiagnosis}</div>
          <div className="mp-nh-icon">
            <i onClick={showDoctorNote} className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
      {doctorNote.docNoteID === selectedNoteID && (
        <div className="np-ph-note-detail">
          <SelectedDoctorNote doctorNoteDetail={doctorNote} />
          {(drugs?.length > 0 || tools?.length > 0) && (
            <DoctorPrescription drugs={drugs} tools={tools} />
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedNoteID: state.managePatient.selectedNoteID,
  };
};

export default connect(mapStateToProps, { setSelectedNoteID })(PatientNoteBody);

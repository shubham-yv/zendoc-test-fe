import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "../../../../style/consultation/doctorNote-info.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Group from "../../../../style/images/Group 2523.svg";
import "../../../../style/consultation/docternote-save.css";
import "../../../../style/consultation/SavePsychoNote.css";
import PsychoNoteTile from "./psychoNote-tile";
import PsychoNoteSessionContent from "./psychoNote-sc";
import { getUserIDFromIndexedDB } from "../../../../Actions/indexedDB";
import {
  writePsychoNote as PsycNote,
  editPsychoNoteID,
  getPsychoNoteDetails as fetchPsychoNoteDetails,
  navigateBackPsycNote,
} from "../../../../Actions/consultation";

const PsychoNoteInfo = ({ patientID }) => {
  const [userID, setUserID] = useState(null);

  const psychoNoteDetail = useSelector(
    (state) => state.patientDetails.psychoNoteDetail
  );

  const getPsychoNoteDetail = useSelector(
    (state) => state.patientDetails.psychoNoteDetail
  );

  const dispatch = useDispatch();


  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const userID = await getUserIDFromIndexedDB();
        setUserID(userID);
      } catch (error) {
        console.error("Error fetching userID from IndexedDB:", error);
      }
    };
    fetchUserID();
  }, []);

  const obj = psychoNoteDetail;
  const obj2 = getPsychoNoteDetail;

  console.log("obj", obj);
  const SessionContent = {
    generalAppearance: obj.generalAppearance,
    rapport: obj.rapport,
    moodAndAffect: obj.moodAndAffect,
    miscellaneousFindings: obj.miscellaneousFindings,
    sessionAgenda: obj.sessionAgenda,
  };

  const handleBackClick = () => {
    dispatch(navigateBackPsycNote());
  };

  console.log("psychoNoteDetail", psychoNoteDetail);
  const handleEditClick = () => {
    dispatch(navigateBackPsycNote());
    dispatch(editPsychoNoteID(getPsychoNoteDetail && psychoNoteDetail));
  };

  const ViewLastNoteSessionContent = {
    generalAppearance:
      obj2?.psychotherapyNote?.sessionContent?.generalAppearance || "",
    rapport: obj2?.psychotherapyNote?.sessionContent?.rapport || "",
    moodAndAffect: obj2?.psychotherapyNote?.sessionContent?.moodAndAffect || "",
    miscellaneousFindings:
      obj2?.psychotherapyNote?.sessionContent?.miscellaneousFindings || "",
    sessionAgenda: obj2?.psychotherapyNote?.sessionContent?.sessionAgenda || "",
  };
  

  const relationshipOptions = [
    { value: 1, name: "Cousin" },
    { value: 2, name: "Father" },
    { value: 3, name: "Mother" },
  ];

  const DiagonasisOptions = [
    { value: 0, name: "No" },
    { value: 1, name: "Yes" },
  ];

  const selectedRelationship = relationshipOptions.find(
    (option) => option.value === psychoNoteDetail.guardianID
  );
  const selectedRelationship2 = DiagonasisOptions.find(
    (option) => option.value == psychoNoteDetail.isDiagnosticChange
  );
  const selectedRelationship3 = DiagonasisOptions.find(
    (option) => option.value == psychoNoteDetail.isLifeEvents
  );

  const getPsychoNoteDetails = () => {
    dispatch(
      fetchPsychoNoteDetails({
        patID: patientID,
        userID: userID,
      }) 
    );
  };

  return (
    <div className="doc-info-parent">
      <div className="dci-header">
        <div className="dci-header-sub-first">
          <span>
            <ArrowBackIcon onClick={handleBackClick} />
          </span>
          <div className="doc-note-head-main">Psychotherapy note</div>
        </div>

        <button className="dci-note-edit-btn" onClick={handleEditClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 18.138 18.138"
            style={{ fill: "#0e57c4" }}
          >
            <path
              id="square-edit-outline"
              d="M6.515,4.5A2.008,2.008,0,0,0,4.5,6.515V20.623a2.015,2.015,0,0,0,2.015,2.015H20.623a2.015,2.015,0,0,0,2.015-2.015V13.569H20.623v7.054H6.515V6.515h7.054V4.5H6.515M19.394,5.508a.7.7,0,0,0-.484.2L17.681,6.929,20.2,9.448l1.229-1.219a.681.681,0,0,0,0-.957L19.867,5.709a.673.673,0,0,0-.474-.2M16.965,7.644,9.538,15.081V17.6h2.519l7.427-7.437Z"
              transform="translate(-4.5 -4.5)"
            />
          </svg>
          <span>Edit</span>
        </button>

        <div className="label-date">
          {obj.createdAt || new Date().toLocaleString()}
        </div>
        <div className="label-basic" onClick={getPsychoNoteDetails}>
          View last note
        </div>
      </div>
      <div className="dci-body">
        <div className="dci-pinfo">
          <div className="sn-title">
            <img src={Group} alt="Group icon" />
            <div className="sn-head">Guardian Name</div>
            <div className="sn-titlevalue">
              <div className="sn-titlevalue">
                {psychoNoteDetail.guardianName}
                {obj2?.psychotherapyNote?.guardian_name}
              </div>
            </div>
          </div>

          <div className="sn-title">
            <img src={Group} alt="Group icon" />
            <div className="sn-head">Relationship with Patient</div>
            <span style={{ marginLeft: "1rem" }}>
              {psychoNoteDetail.relationship}
              {obj2?.psychotherapyNote?.relationship}
            </span>
          </div>
          <div className="sn-title">
            <img src={Group} alt="Group icon" />
            <div className="sn-head">Session number</div>
            <span style={{ marginLeft: "1rem" }}>
              {psychoNoteDetail.sessionNumber}
              {obj2?.psychotherapyNote?.session_number}
            </span>
          </div>
          <div className="sn-title">
            <img src={Group} alt="Group icon" />
            <div className="sn-head">Duration of session</div>
            <span style={{ marginLeft: "1rem" }}>
              {psychoNoteDetail.sessionDuration}
              {obj2?.psychotherapyNote?.session_duration}
            </span>
          </div>
        </div>
        <React.Fragment>
          <PsychoNoteTile
            number="1"
            info={{
              title: "Chief Complaints/Presenting Complaint",
              body: obj.chiefComplaints,
            }}
            viewLastNote={{
              body2:
                obj2 && obj2.psychotherapyNote
                  ? obj2.psychotherapyNote.chief_complaints_presenting_complaint
                  : "",
            }}
          />

          <PsychoNoteTile
            number="2"
            info={{
              title: "Primary Diagnosis/Provisional Diagnosis",
              body: obj.primaryDiagnosis,
            }}
            viewLastNote={{
              body2:
                obj2 && obj2.psychotherapyNote
                  ? obj2.psychotherapyNote
                      .primary_diagnosis_provisional_diagnosis
                  : "",
            }}
          />

          <PsychoNoteSessionContent
            number="3"
            SessionContent={SessionContent}
            ViewLastNoteSessionContent={ViewLastNoteSessionContent}
          />

          <PsychoNoteTile
            number="4"
            info={{
              title:
                "Intervention/Goal Assignment/Techniques used in the session",
              body: obj.interventionAndTechniques,
            }}
            viewLastNote={{
              body2:
                obj2 && obj2.psychotherapyNote
                  ? obj2.psychotherapyNote
                      .intervention_goal_assignment_techniques_used
                  : "",
            }}
          />
          <PsychoNoteTile
            number="5"
            info={{
              title: "Progress of the patient",
              body: obj.patientProgress,
            }}
            viewLastNote={{
              body2:
                obj2 && obj2.psychotherapyNote
                  ? obj2.psychotherapyNote.patient_progress
                  : "",
            }}
          />
          <PsychoNoteTile
            number="6"
            info={{
              title: "Plans/Goals/Agenda for the next session",
              body: obj.plansAndGoals,
            }}
            viewLastNote={{
              body2:
                obj2 && obj2.psychotherapyNote
                  ? obj2.psychotherapyNote.plans_goals_agenda_for_next_session
                  : "",
            }}
          />
          <PsychoNoteTile
            number="7"
            info={{
              title: "Any other finding/comments",
              body: obj.otherFindings,
            }}
            viewLastNote={{
              body2:
                obj2 && obj2.psychotherapyNote
                  ? obj2.psychotherapyNote.any_other_findings_comments
                  : "",
            }}
          />
        </React.Fragment>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  const patientID = state.patientDetails.patientInfo.patientid
    ? state.patientDetails.patientInfo.patientid
    : null;

  return {
    patientID: patientID,
  };
};

export default connect(mapStatetoProps)(PsychoNoteInfo);
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DoctorNoteMSE from "./docNote-mse";
import DoctorNoteTile from "../DoctorNote/docNote-tile";
import DoctorNotePE from "../DoctorNote/docNote-pe";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Group from "../../../../style/images/Group 2523.svg";
import "../../../../style/consultation/doctorNote-info.css";
// import "../../../../style/consultation/docterNote-save.css";
import "../../../../style/consultation/docternote-save.css";
import "../../../../style/consultation/SavePsychoNote.css";
import {
  writeDoctorNote as DocNote,
  editDocNoteID,
  getDoctorNoteDetails as fetchDoctorNoteDetails,
} from "../../../../Actions/consultation";
import { navigateBack } from "../../../../Actions/consultation";
import { getUserIDFromIndexedDB } from "../../../../Actions/indexedDB";

const DoctorNoteInfo = ({ patientID }) => {
  const [userID, setUserID] = useState(null);

  const doctorNoteDetail = useSelector(
    (state) => state.patientDetails.doctorNoteDetail
  );

  const getdoctorNoteDetail = useSelector(
    (state) => state.patientDetails.doctorNoteDetail
  );

  const obj = doctorNoteDetail;
  const obj2 = getdoctorNoteDetail;
  const backendTimestamp = getdoctorNoteDetail[0]?.createdAt;
  const date = new Date(backendTimestamp);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(navigateBack());
  };

  const handleEditClick = () => {
    dispatch(navigateBack());
    dispatch(editDocNoteID(getdoctorNoteDetail[0]));
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

  const getIllnessDurationText = (detail) => {
    if (!detail) return "";
    let illnessDuration = detail.illnessDurationNumber;

    switch (detail.illnessDurationUnit) {
      case 1:
        illnessDuration += " day(s)";
        break;
      case 2:
        illnessDuration += " week(s)";
        break;
      case 3:
        illnessDuration += " month(s)";
        break;
      default:
        return illnessDuration;
    }

    return illnessDuration;
  };

  const illnessDuration = getIllnessDurationText(doctorNoteDetail);
  const illnessDurations =
    obj2.length > 0 ? getIllnessDurationText(obj2[0]) : "";

  const physicalExam = {
    physicalExam_BP: obj?.physicalExam_BP,
    physicalExam_pulse: obj?.physicalExam_pulse,
    physicalExam_height: obj?.physicalExam_height,
    physicalExam_weight: obj?.physicalExam_weight,
  };

  const mse = {
    MSE_GAB: obj?.MSE_GAB,
    MSE_PMA: obj?.MSE_PMA,
    MSE_mood_affect: obj?.MSE_mood_affect,
    MSE_thought_content: obj?.MSE_thought_content,
    MSE_perception: obj?.MSE_perception,
    MSE_HMFCogn: obj?.MSE_HMFCogn,
    MSE_speech_quantity: obj?.MSE_speech_quantity,
    MSE_speech_rate: obj?.MSE_speech_rate,
    MSE_speech_tone: obj?.MSE_speech_tone,
    MSE_speech_volume: obj?.MSE_speech_volume,
    MSE_speech_reactionTime: obj?.MSE_speech_reactionTime,
  };

  const viewlastNoteMSE = {
    MSE_GAB: obj2[0]?.MSE_GAB || null,
    MSE_PMA: obj2[0]?.MSE_PMA || null,
    MSE_mood_affect: obj2[0]?.MSE_mood_affect || null,
    MSE_thought_content: obj2[0]?.MSE_thought_content || null,
    MSE_perception: obj2[0]?.MSE_perception || null,
    MSE_HMFCogn: obj2[0]?.MSE_HMFCogn || null,
    MSE_speech_quantity: obj2[0]?.MSE_speech_quantity || null,
    MSE_speech_rate: obj2[0]?.MSE_speech_rate || null,
    MSE_speech_tone: obj2[0]?.MSE_speech_tone || null,
    MSE_speech_volume: obj2[0]?.MSE_speech_volume || null,
    MSE_speech_reactionTime: obj2[0]?.MSE_speech_reactionTime || null,
  };

  const viewlastNotePE = {
    physicalExam_BP: obj2[0]?.physicalExam_BP || null,
    physicalExam_pulse: obj2[0]?.physicalExam_pulse || null,
    physicalExam_height: obj2[0]?.physicalExam_height || null,
    physicalExam_weight: obj2[0]?.physicalExam_weight || null,
  };

  const relationshipOptions = [
    { value: 1, name: "Cousin" },
    { value: 2, name: "Father" },
    { value: 3, name: "Mother" },
  ];
  const relationshipOptionsget = [
    { value: 1, name: "Cousin" },
    { value: 2, name: "Father" },
    { value: 3, name: "Mother" },
  ];

  console.log("doctorNoteDetail", doctorNoteDetail);

  const selectedRelationship = relationshipOptions.find(
    (option) => option.value == doctorNoteDetail?.guardianRelation
  );

  const getRelationship = relationshipOptionsget.find(
    (option) => option.value == obj2[0]?.guardianRelation
  );

  const getDoctorNoteDetails = () => {
    if (patientID && userID) {
      dispatch(
        fetchDoctorNoteDetails({
          patID: patientID,
          userID: userID,
        })
      );
    }
  };

  return (
    <div className="doc-info-parent">
      <div className="dci-header">
        <div className="dci-header-sub-first">
          <span>
            <ArrowBackIcon onClick={handleBackClick} />
          </span>
          <div className="doc-note-head-main"> Doctor's Note</div>
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
          {obj?.createdAt || new Date().toLocaleString()}
        </div>
        <div className="label-basic" onClick={getDoctorNoteDetails}>
          View last note
        </div>
      </div>
      <div className="dci-body">
        <div className="dci-pinfo">
          <div className="sn-title">
            <img src={Group} alt="Group icon" />
            <div className="sn-head">Guardian Name</div>
            <div className="sn-titlevalue">
              {doctorNoteDetail?.guardianName || obj2[0]?.guardianName}
            </div>
          </div>

          <div className="sn-title">
            <img src={Group} alt="Group icon" />
            <div className="sn-head" style={{ marginRight: ".6rem" }}>
              Relationship with Patient
            </div>
            {selectedRelationship ? selectedRelationship?.name : null}
            {getRelationship ? getRelationship?.name : null}
          </div>

          <div className="sn-title">
            <img src={Group} alt="Group icon" />
            <div className="sn-head">Problem</div>
            <div className="sn-titlevalue">
              {obj?.provisionalDiagnosis}
              {obj2[0]?.provisionalDiagnosis || null}
            </div>
          </div>
          <div className="sn-title">
            <img src={Group} alt="Group icon" />
            <div className="sn-head">Duration of illness</div>
            <div className="sn-titlevalue">
              {illnessDuration || illnessDurations || null}
            </div>
          </div>
        </div>
        <React.Fragment>
          <DoctorNoteTile
            number="1"
            info={{
              title: "Patient Chief Complaint",
              body: obj?.patChiefComplaints,
            }}
            LastNote={{
              body2: obj2 && obj2.length > 0 ? obj2[0]?.patChiefComplaints : "",
            }}
          />

          <DoctorNoteTile
            number="2"
            info={{ title: "Relevant History", body: obj?.relevantHistory }}
            LastNote={{
              body2: obj2 && obj2.length > 0 ? obj2[0]?.relevantHistory : "",
            }}
          />

          <DoctorNoteTile
            number="3"
            info={{ title: "Past History", body: obj?.pastHistory }}
            LastNote={{
              body2: obj2 && obj2.length > 0 ? obj2[0]?.pastHistory : "",
            }}
          />

          <DoctorNoteTile
            number="4"
            info={{
              title: "Personality / Temperament Traits",
              body: obj?.personaTemperTraits,
            }}
            LastNote={{
              body2:
                obj2 && obj2.length > 0 ? obj2[0]?.personaTemperTraits : "",
            }}
          />

          <DoctorNoteMSE
            number="5"
            info={mse}
            LastNote={{ body2: obj2 && obj2.length > 0 ? viewlastNoteMSE : "" }}
          />

          <DoctorNoteTile
            number="6"
            info={{
              title: "Provisional Diagnosis",
              body: obj?.provisionalDiagnosis,
            }}
            LastNote={{
              body2:
                obj2 && obj2.length > 0 ? obj2[0]?.provisionalDiagnosis : "",
            }}
          />

          <DoctorNotePE
            number="7"
            info={physicalExam}
            LastNote={{ body2: obj2 && obj2.length > 0 ? viewlastNotePE : "" }}
          />
        </React.Fragment>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  const patientID = state.patientDetails.patientInfo?.patientid || null;

  return {
    patientID: patientID,
  };
};

export default connect(mapStatetoProps)(DoctorNoteInfo);
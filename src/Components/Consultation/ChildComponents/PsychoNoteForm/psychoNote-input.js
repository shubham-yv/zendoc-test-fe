import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  writePsychoNote,
  savePsychoNote,
} from "../../../../Actions/consultation";
import * as Yup from 'yup';
import PsychoNoteGuardian from "./psychoNote-guardian";
import PsychoNoteSession from "./psychoNote-symptom";
import PsychoNoteChiefComplaints from "./psychoNote-diagnosis";
import PsychoNoteCurrentDiagnosis from "./psychoNote-cSymptom";
import PsychoNoteSessionContent from "./psychoNote-events";
import PsychoNoteMedication from "./pschoNote-medication";
import PsychoNoteGoalAssignment from "./psychonote-safety";
import PsychoNoteProgress from "./psychoNote-progress";
import PsychoNoteGoalsProgress from "./psychoNote-goals";
import RevisedGoals from "./psychoNote-Revised Goals";
import { getUserIDFromIndexedDB } from "../../../../Actions/indexedDB";

const PsychoNoteForm = ({
  patientID,
  writePsychoNote,
  savePsychoNote,
  psychoNoteDetails,
}) => {
  const [state, setState] = useState({
    patientID: patientID,
    doctorID: "",
    psychNoteID: "",
    guardianName: "",
    relationship: "",
    sessionNumber: "",
    sessionDuration: "",
    chiefComplaints: "",
    primaryDiagnosis: "",
    sessionContent: {
      generalAppearance: "",
      rapport: "",
      moodAndAffect: "",
      miscellaneousFindings: "",
      sessionAgenda: "",
    },
    interventionAndTechniques: "",
    patientProgress: "",
    plansAndGoals: "",
    otherFindings: "",
  });

  const [useErrors, setUseErrors] = useState({});

  const validationSchema = Yup.object().shape({
    relationship: Yup.string().required("Please enter Relationship"),
    sessionNumber: Yup.string().required("Please enter Session Number"),
    sessionDuration: Yup.string().required("Please enter Duration"),
    chiefComplaints: Yup.string().required("Please enter Complaints"),
    primaryDiagnosis: Yup.string().required("Please enter Diagnosis"),
    interventionAndTechniques: Yup.string().required("Please enter Intervention"),
    patientProgress: Yup.string().required("Please enter Progress"),
    plansAndGoals: Yup.string().required("Please enter Plans/Goals/Agenda"),
    otherFindings: Yup.string().required("Please enter Findings/Comments"),
    sessionContent: Yup.object().shape({
      generalAppearance: Yup.string().required("Please enter General Appearance"),
      rapport: Yup.string().required("Please enter Rapport"),
      moodAndAffect: Yup.string().required("Please enter Mood and Affect"),
      miscellaneousFindings: Yup.string().required("Please enter Miscellaneous Findings"),
      sessionAgenda: Yup.string().required("Please enter Session Agenda")
    })
  });


  useEffect(() => {
    if (psychoNoteDetails && psychoNoteDetails.psychotherapyNote) {
      setState((prevState) => ({
        ...prevState,
        psychNoteID: psychoNoteDetails.psychotherapyNote.psychNoteID || "",
        patientID: patientID,
        doctorID: psychoNoteDetails.psychotherapyNote.doctorID || "",
        guardianName: psychoNoteDetails.psychotherapyNote.guardian_name || "",
        relationship: psychoNoteDetails.psychotherapyNote.relationship || "",
        sessionNumber: psychoNoteDetails.psychotherapyNote.session_number || "",
        sessionDuration:
          psychoNoteDetails.psychotherapyNote.session_duration || "",
        chiefComplaints:
          psychoNoteDetails.psychotherapyNote
            .chief_complaints_presenting_complaint || "",
        primaryDiagnosis:
          psychoNoteDetails.psychotherapyNote
            .primary_diagnosis_provisional_diagnosis || "",
        sessionContent: {
          generalAppearance:
            psychoNoteDetails.psychotherapyNote.sessionContent
              .generalAppearance || "",
          rapport:
            psychoNoteDetails.psychotherapyNote.sessionContent.rapport || "",
          moodAndAffect:
            psychoNoteDetails.psychotherapyNote.sessionContent.moodAndAffect ||
            "",
          miscellaneousFindings:
            psychoNoteDetails.psychotherapyNote.sessionContent
              .miscellaneousFindings || "",
          sessionAgenda:
            psychoNoteDetails.psychotherapyNote.sessionContent.sessionAgenda ||
            "",
        },
        interventionAndTechniques:
          psychoNoteDetails.psychotherapyNote
            .intervention_goal_assignment_techniques_used || "",
        patientProgress:
          psychoNoteDetails.psychotherapyNote.patient_progress || "",
        plansAndGoals:
          psychoNoteDetails.psychotherapyNote
            .plans_goals_agenda_for_next_session || "",
        otherFindings:
          psychoNoteDetails.psychotherapyNote.any_other_findings_comments || "",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        patientID: patientID,
        doctorID: "",
        psychNoteID: "",
        guardianName: "",
        relationship: "",
        sessionNumber: "",
        sessionDuration: "",
        chiefComplaints: "",
        primaryDiagnosis: "",
        sessionContent: {
          generalAppearance: "",
          rapport: "",
          moodAndAffect: "",
          miscellaneousFindings: "",
          sessionAgenda: "",
        },
        interventionAndTechniques: "",
        patientProgress: "",
        plansAndGoals: "",
        otherFindings: "",
      }));
    }
  }, [psychoNoteDetails, patientID]);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const userID = await getUserIDFromIndexedDB();
        setState((prevState) => ({
          ...prevState,
          doctorID: userID,
        }));
      } catch (error) {
        console.error("Error fetching userID from IndexedDB:", error);
      }
    };
    fetchUserID();
  }, []);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (["generalAppearance", "rapport", "moodAndAffect", "miscellaneousFindings", "sessionAgenda"].includes(name)) {
      setState(prevState => ({
        ...prevState,
        sessionContent: {
          ...prevState.sessionContent,
          [name]: value
        }
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    setUseErrors({
      ...useErrors,
      [name]: '',
    });
  };

  const saveNoteHandler = () => {
    savePsychoNote({ ...state, userID: state.userID });
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(state, { abortEarly: false });
      savePsychoNote({ ...state, userID: state.userID });
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach(error => {
        if (error.path.includes('sessionContent')) {
          const field = error.path.split('.')[1];
          formattedErrors[field] = error.message;
        } else {
          formattedErrors[error.path] = error.message;
        }
      });
      setUseErrors(formattedErrors);
    }
  };

  const cancelPsychoNote = () => {
    writePsychoNote(false);
  };

  const info = {
    guardianName: state.guardianName || "",
    relationship: state.relationship || "",
  };

  const chiefComplaints = {
    chiefComplaints: state.chiefComplaints || "",
    isDiagnosticChange: state.isDiagnosticChange || "",
  };

  const Session = {
    sessionNumber: state.sessionNumber || "",
    sessionDuration: state.sessionDuration || "",
  };

  const {
    generalAppearance,
    rapport,
    moodAndAffect,
    miscellaneousFindings,
    sessionAgenda,
  } = state.sessionContent;

  return (
    <React.Fragment>
      <PsychoNoteGuardian info={info} handleChange={handleChange}  useErrors={useErrors} setUseErrors={setUseErrors} />
      <PsychoNoteSession Session={Session} handleChange={handleChange} useErrors={useErrors} setUseErrors={setUseErrors} />
      <PsychoNoteChiefComplaints
        chiefComplaints={chiefComplaints}
        handleChange={handleChange}
        useErrors={useErrors} setUseErrors={setUseErrors}
      />
      <PsychoNoteCurrentDiagnosis
        primaryDiagnosis={state.primaryDiagnosis}
        handleChange={handleChange}
        useErrors={useErrors} setUseErrors={setUseErrors}
      />
      <PsychoNoteSessionContent
        sessionContent={{
          generalAppearance,
          rapport,
          moodAndAffect,
          miscellaneousFindings,
          sessionAgenda,
        }}
        handleChange={handleChange}
      />
      <PsychoNoteGoalAssignment
        interventionAndTechniques={state.interventionAndTechniques}
        handleChange={handleChange}
        useErrors={useErrors} setUseErrors={setUseErrors}
      />
      <PsychoNoteGoalsProgress
        patientProgress={state.patientProgress}
        handleChange={handleChange}
        useErrors={useErrors} setUseErrors={setUseErrors}
      />
      <RevisedGoals
        plansAndGoals={state.plansAndGoals}
        handleChange={handleChange}
        useErrors={useErrors} setUseErrors={setUseErrors}
      />
      <PsychoNoteProgress
        otherFindings={state.otherFindings}
        handleChange={handleChange}
        useErrors={useErrors} setUseErrors={setUseErrors}
      />
      <div className="psychonote-inputfooter">
        <button
          onClick={cancelPsychoNote}
          className="button-basics avg-button transparent-button"
        >
          Reset
        </button>
        <button
          onClick={handleSubmit}
          className="button-basics avg-button transparent-button--blue"
        >
          Save Note
        </button>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    patientID: state.patientDetails.patientInfo?.patientid,
    psychoNoteDetails: state.patientDetails.psychoNoteDetails
      ? state.patientDetails.psychoNoteDetails
      : null,
  };
};

export default connect(mapStatetoProps, {
  writePsychoNote,
  savePsychoNote,
})(PsychoNoteForm);
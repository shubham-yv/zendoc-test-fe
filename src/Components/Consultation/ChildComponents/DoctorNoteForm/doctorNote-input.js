import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import DoctorNoteDiseaseInput from "./doctorNote-diseaseinput";
import DoctorNoteComplaints from "./doctorNote-complaints";
import DoctorNoteDiagnosis from "./doctorNote-diagnosis";
import {
  saveDoctorNote,
  writeDoctorNote,
} from "../../../../Actions/consultation";
import "../../../../style/consultation/doctorNote-form.css";
import { navigateBack } from "../../../../Actions/consultation";
import { getUserIDFromIndexedDB } from "../../../../Actions/indexedDB";

const DoctorNoteInput = ({
  patientID,
  doctorNoteID,
  saveDoctorNote,
  writeDoctorNote,
}) => {
  const [state, setState] = useState({
    patientID: patientID,
    docNoteID: "",
    doctorID: "",
    guardianID: "",
    guardianName: "",
    illnessType: 1,
    illnessDurationUnit: "",
    illnessDurationNumber: "",
    relevantHistory: "",
    patChiefComplaints: "",
    pastHistory: "",
    personaTemperTraits: "",
    MSE_GAB: "",
    MSE_PMA: "",
    MSE_speech_quantity: "",
    MSE_speech_rate: 2,
    MSE_speech_tone: "",
    MSE_speech_volume: "",
    MSE_speech_reactionTime: "",
    MSE_mood_affect: "",
    MSE_thought_content: "",
    MSE_thought_possession: "",
    MSE_perception: "",
    MSE_HMFCogn: "",
    provisionalDiagnosis: "",
    physicalExam_BP: "",
    physicalExam_pulse: "",
    physicalExam_height: "",
    physicalExam_weight: "",
  });

  const [useErrors, setUseErrors] = useState({});

  const validationSchema = Yup.object().shape({
    guardianName: Yup.string().required("Please enter Guardian Name"),
    illnessDurationUnit: Yup.string().required("Please enter Duration Unit"),
    illnessDurationNumber: Yup.number().required("Please enter Duration Number")
      .typeError('Duration Number must be a number')
      .positive('Duration Number must be a positive number')
      .integer('Duration Number must be an integer'),
    relevantHistory: Yup.string().required("Please enter Relevant History"),
    patChiefComplaints: Yup.string().required("Please enter Chief Complaints"),
    pastHistory: Yup.string().required("Please enter Past History"),
    personaTemperTraits: Yup.string().required("Please enter Persona Temper Traits"),
    MSE_GAB: Yup.string().required("Please enter General Appearance/Behaviour"),
    MSE_PMA: Yup.string().required("Please Choose Physical/Mental Assessment"),
    MSE_speech_quantity: Yup.string().required("Please Choose Speech Quantity"),
    MSE_speech_tone: Yup.string().required("Please enter Speech Tone"),
    MSE_speech_volume: Yup.string().required("Please enter Speech Volume"),
    MSE_mood_affect: Yup.string().required("Please enter Mood and Affect"),
    MSE_thought_content: Yup.string().required("Please enter Thought Content"),
    // MSE_thought_possession: Yup.string().required("Please enter Thought Possession"),
    MSE_perception: Yup.string().required("Please enter Perception"),
    // MSE_HMFCogn: Yup.string().required("Please enter Higher Mental Functioning/Cognition"),
    provisionalDiagnosis: Yup.string().required("Please enter Provisional Diagnosis"),
    physicalExam_BP: Yup.number()
      .required('BP is required')
      .typeError('BP must be a number')
      .positive('BP must be a positive number')
      .integer('BP must be an integer'),
    physicalExam_pulse: Yup.number()
      .required('Pulse is required')
      .typeError('Pulse must be a number')
      .positive('Pulse must be a positive number')
      .integer('Pulse must be an integer'),
    physicalExam_height: Yup.number()
      .required('Height is required')
      .typeError('Height must be a number')
      .positive('Height must be a positive number')
      .integer('Height must be an integer'),
    physicalExam_weight: Yup.number()
      .required('Weight is required')
      .typeError('Weight must be a number')
      .positive('Weight must be a positive number')
      .integer('Weight must be an integer'),
  });

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const userID = await getUserIDFromIndexedDB();
        setState((prevState) => ({
          ...prevState,
          doctorID: userID,
        }));
        console.log(userID, "userID");
      } catch (error) {
        console.error("Error fetching userID from IndexedDB:", error);
      }
    };
    fetchUserID();
  }, []);

  useEffect(() => {
    if (doctorNoteID) {
      setState((prevState) => ({
        ...prevState,
        docNoteID: doctorNoteID,
        guardianName: doctorNoteID.guardianName,
        provisionalDiagnosis: doctorNoteID.provisionalDiagnosis,
        patChiefComplaints: doctorNoteID.patChiefComplaints,
        relevantHistory: doctorNoteID.relevantHistory,
        pastHistory: doctorNoteID.pastHistory,
        personaTemperTraits: doctorNoteID.personaTemperTraits,
        MSE_GAB: doctorNoteID.MSE_GAB,
        MSE_PMA: doctorNoteID.MSE_PMA,
        MSE_speech_quantity: doctorNoteID.MSE_speech_quantity,
        MSE_speech_rate: 2,
        MSE_speech_tone: doctorNoteID.MSE_speech_tone,
        MSE_speech_volume: doctorNoteID.MSE_speech_volume,
        MSE_speech_reactionTime: doctorNoteID.MSE_speech_reactionTime,
        MSE_mood_affect: doctorNoteID.MSE_mood_affect,
        MSE_thought_content: doctorNoteID.MSE_thought_content,
        MSE_thought_possession: doctorNoteID.MSE_thought_possession,
        MSE_perception: doctorNoteID.MSE_perception,
        MSE_HMFCogn: doctorNoteID.MSE_HMFCogn,
        physicalExam_BP: doctorNoteID.physicalExam_BP,
        physicalExam_pulse: doctorNoteID.physicalExam_pulse,
        physicalExam_height: doctorNoteID.physicalExam_height,
        physicalExam_weight: doctorNoteID.physicalExam_weight,
        illnessDurationNumber: doctorNoteID.illnessDurationNumber,
        illnessDurationUnit: doctorNoteID.illnessDurationUnit,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        docNoteID: "",
        guardianName: "",
        provisionalDiagnosis: "",
        patChiefComplaints: "",
        relevantHistory: "",
        pastHistory: "",
        personaTemperTraits: "",
        MSE_GAB: "",
        MSE_PMA: "",
        MSE_speech_quantity: "",
        MSE_speech_rate: 2,
        MSE_speech_tone: "",
        MSE_speech_volume: "",
        MSE_speech_reactionTime: "",
        MSE_mood_affect: "",
        MSE_thought_content: "",
        MSE_thought_possession: "",
        MSE_perception: "",
        MSE_HMFCogn: "",
        physicalExam_BP: "",
        physicalExam_pulse: "",
        physicalExam_height: "",
        physicalExam_weight: "",
        illnessDurationNumber: "",
        illnessDurationUnit: "",
      }));
    }
  }, [doctorNoteID]);

  const navigateBackState = useSelector((state) => state.navigateBack);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDiseaseInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setUseErrors({
      ...useErrors,
      [name]: "",
    });
  };

  const saveDoctorNoteHandler = async () => {
    try {
      console.log("Before validation");
      await validationSchema.validate(state, { abortEarly: false });
      console.log("Validation passed, saving doctor note");
      saveDoctorNote({ ...state, userID: state.userID });
    } catch (validationErrors) {
      console.log("Validation errors:", validationErrors);
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
        console.log(`Validation failed on ${error.path}: ${error.message}`);
      });
      setUseErrors(formattedErrors);
    }
  };



  const cancelDoctorNote = () => {
    writeDoctorNote(false);
  };

  return (
    <>
      <DoctorNoteDiseaseInput
        info={state}
        handleDiseaseInputChange={handleDiseaseInputChange}
        useErrors={useErrors}
      />
      <DoctorNoteComplaints
        complaints={state}
        handleDiseaseInputChange={handleDiseaseInputChange}
        useErrors={useErrors}
      />
      <DoctorNoteDiagnosis
        diagnosis={state}
        handleDiseaseInputChange={handleDiseaseInputChange}
        useErrors={useErrors}
      />
      <div className="doctornote-inputfooter">
        <button
          className="button-basics avg-button transparent-button"
          onClick={cancelDoctorNote}
        >
          Reset
        </button>
        <button
          onClick={saveDoctorNoteHandler}
          className="button-basics avg-button transparent-button--blue"
        >
          Save Note
        </button>
      </div>
    </>
  );
};

const mapStatetoProps = (state) => {
  const patientID = state.patientDetails.patientInfo.patientid
    ? state.patientDetails.patientInfo.patientid
    : null;
  const doctorNoteID = state.patientDetails.doctorNoteDetails
    ? state.patientDetails.doctorNoteDetails
    : null;

  return {
    patientID: patientID,
    doctorNoteID: doctorNoteID,
  };
};

export default connect(mapStatetoProps, {
  saveDoctorNote,
  writeDoctorNote,
})(DoctorNoteInput);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PatientInfoCard from "./mp-patientCard.js";
import PatientHistory from "./mp-patientHitstory.js";
import PatientNavBar from "./mp-patientNavbar.js";
import PatientInforActivity from "./mp-patientActivity.js";
import "../../../../style/managePatients/mp-patientInfo.css";
import "../../../../style/managePatients/mp-patientHistory.css";
import NewComponent from "../Journals/AllJournals.js";
import MpPatientList from "../mp-patientList.js";
import { getPatientHabitData } from '../../../../Actions/managePatient';
import { getPatientMoodData } from '../../../../Actions/managePatient';
import { getPatientTaskData } from '../../../../Actions/managePatient';
import { getPatientPillData } from '../../../../Actions/managePatient';
import { getPatientPillConfigData } from '../../../../Actions/managePatient';
import { getPatientHabitConfigData } from '../../../../Actions/managePatient';
import { getPatientTaskConfigData } from '../../../../Actions/managePatient';

const PatientDetails = ({ patientInfo, patientHistory, selectedTabID, getHabitData, getPatientHabitData, getPatientMoodData, getPatientTaskData, getPatientPillData, getMoodData, getTaskData, getPillData, getPillConfData, getPatientPillConfigData, getHabitConfData, getPatientHabitConfigData, getTaskConfData, getPatientTaskConfigData }) => {

  const [showActivityTrackings, setShowActivityTrackings] = useState(true);
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [back, setBack] = useState(false);
  const [habitData, setHabitData] = useState(null);
  const [moodData, setMoodData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [pillData, setPillData] = useState(null);
  const [congPillData, setConfPillData] = useState(null);
  const [congHabitData, setConfHabitData] = useState(null);
  const [confTaskData, setConfTaskData] = useState(null);
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);


  useEffect(() => {
    if (patientInfo && patientInfo.patientid) {
      // getPatientHabitData(patientInfo.patientid);
      // getPatientMoodData(patientInfo.patientid);
      // getPatientTaskData(patientInfo.patientid);
      // getPatientPillConfigData(patientInfo.patientid)
      // getPatientPillData(patientInfo.patientid);
      // getPatientHabitConfigData(patientInfo.patientid)
      // getPatientTaskConfigData(patientInfo.patientid)

      getPatientHabitData("_aslkksa");
      getPatientMoodData("_aslkksa");
      getPatientTaskData("_aslkksa");
      getPatientPillConfigData("_aslkasa")
      getPatientPillData("_aslkksa");
      getPatientHabitConfigData("_aslkksa")
      getPatientTaskConfigData("_aslkksa")
    }
  }, [patientInfo, refreshDataTrigger]);

  useEffect(() => {
    if (getHabitData) {
      setHabitData(getHabitData);
    }
    if (getMoodData) {
      setMoodData(getMoodData);
    }
    if (getTaskData) {
      setTaskData(getTaskData);
    }
    if (getPillData) {
      setPillData(getPillData);
    }
    if (getPillConfData) {
      setConfPillData(getPillConfData);
    }
    if (getHabitConfData) {
      setConfHabitData(getHabitConfData)
    }
    if (getTaskConfData) {
      setConfTaskData(getTaskConfData)
    }

  }, [getHabitData, getMoodData, getTaskData, getPillData, getHabitConfData, getTaskConfData]);


  const handleArrowClick = () => {
    setShowActivityTrackings(false);
    setShowNewComponent(true);
  };

  const handleGoBack = () => {
    setShowNewComponent(false);
    setShowActivityTrackings(true);
  };

  const handleBack = () => {
    setBack(!back);
  };

  return (
    <>
      {back == true ? (
        <MpPatientList />
      ) : (
        <>
          {showActivityTrackings && (
            <div className="mp-patient-detail">
              <div className="mp-patient-detail-header">
                <div
                  className="mp-patient-detail-back fas fa-arrow-left"
                  onClick={handleBack}
                ></div>
                <div className="mp-pd-buttons">
                  <button className="medium-button transparent-button--bluemp">
                    CST
                  </button>
                  <button className="medium-button blue-button">
                    Start Consulting
                  </button>
                </div>
              </div>
              <PatientInfoCard patientInfo={patientInfo} />
              <PatientNavBar />
              {selectedTabID == 2 ? (
                <PatientInforActivity onArrowClick={handleArrowClick} habitData={habitData} moodData={moodData}
                  taskData={taskData} pillData={pillData} congPillData={congPillData} getHabitConfData={getHabitConfData}
                  confTaskData={confTaskData}
                />
              ) : (
                <PatientHistory patientHistory={patientHistory} />
              )}
            </div>
          )}
          {showNewComponent && <NewComponent goBack={handleGoBack} />}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedTabID: state.managePatient.selectedTabID,
    patientInfo: state.managePatient.patientInfo,
    patientHistory: state.managePatient.patientHistory,
    getHabitData: state.managePatient.getHabitData,
    getMoodData: state.managePatient.getMoodData,
    getTaskData: state.managePatient.getTaskData,
    getPillData: state.managePatient.getPillData,
    getPillConfData: state.managePatient.getPillConfData,
    getHabitConfData: state.managePatient.getHabitConfData,
    getTaskConfData: state.managePatient.getTaskConfData
  };
};

export default connect(mapStateToProps, { getPatientHabitData, getPatientMoodData, getPatientTaskData, getPatientPillData, getPatientPillConfigData, getPatientHabitConfigData, getPatientTaskConfigData })(PatientDetails);
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import _ from "lodash";
import PatientInfo from "./ChildComponents/patientInfo-view";
import Prescription from "./ChildComponents/prescription-view";
import DoctorNoteInfo from "./ChildComponents/DoctorNote/doctorNote-info";
import PsychoNoteInfo from "./ChildComponents/PsychoNote/psychoNote-Info";
import DoctorNoteForm from "./ChildComponents/DoctorNote/doctorNote-form";
import PsychoNoteForm from "./ChildComponents/PsychoNote/psychoNote-form";
import SearchPatient from "./ChildComponents/SearchNAddPatient/searchPatient-view";
import AddNewPatient from "./ChildComponents/SearchNAddPatient/addNewPatient-view";
import SearchPatientComponent from "./ChildComponents/ControlledSearchComponent/searchPatientControl";
import { Modal, Button } from "react-bootstrap";
import { writeDoctorNote, writePsychoNote, SavePrescription, GetPrescription, getDoctorNoteDetailForPrescription, resetPatientInfo, navigateBack, navigateBackPsycNote } from "../../Actions/consultation";
import PrintPrescription from "./PrintPrescription";
import "../../style/consultation/consultation-view.css";
import "../../style/utilsCSS/common.css";
import "../../style/utilsCSS/prescription.css";
import { getAllDataFromIndexedDB, getUserIDFromIndexedDB } from "../../Actions/indexedDB";
import { getProfileDetails } from "../../Actions/Settings";
import { useReactToPrint } from 'react-to-print';
import PrintDocNote from "./PrintDocNote";
import PresPrintOnly from './PrescriptionOnly'
import { setActiveTab } from "../../Actions/landingPage";

const Consultation = ({
  psychoNote,
  doctorNote,
  patientsList,
  searchText,
  addNewPatient,
  doctorNoteDetail,
  psychoNoteDetail,
  patientInfo,
  writeDoctorNote,
  writePsychoNote,
  searchTexts,
  SavePrescription,
  GetPrescription,
  getProfileDetails,
  ProfileDetails,
  getDoctorNoteDetailForPrescription,
  DoctorNoteDet,
  getPrescription,
  setActiveTab
}) => {

  const [buttonsVisibility, setButtonsVisibility] = useState(false);
  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [showModalThree, setShowModalThree] = useState(false);
  const [showIntermediateModal, setShowIntermediateModal] = useState(false);
  const [searchingAndAddingPatient, setSearchingAndAddingPatient] = useState(false);
  const printIframeRef = useRef(null);
  const [userID, setUserId] = useState('');
  const [showPrintComponent, setShowPrintComponent] = useState(false);
  const [showPrintPresComponent, setShowPrintPresComponent] = useState(false);
  const [showDocPrintComponent, setDocShowPrintComponent] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [userData, setUserData] = useState({
    prefferedName: '',
    salutation: ''
  });
  const [ViewdoctorNote, setViewDoctorNote] = useState('');
  const [localPrescriptions, setLocalPrescriptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);


  const dispatch = useDispatch();

  const printRef = useRef(null);
  const DocPrintRef = useRef(null);
  const presRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => {
      setShowPrintComponent(true);
      return printRef.current;
    },
    documentTitle: 'Prescription',
    onAfterPrint: () => {
      setShowPrintComponent(false);
    }
  });

  const handlePresPrint = useReactToPrint({
    content: () => {
      setShowPrintPresComponent(true);
      return presRef.current;
    },
    documentTitle: 'Prescription',
    onAfterPrint: () => {
      setShowPrintPresComponent(false);
    }
  });

  const handleDocPrint = useReactToPrint({
    content: () => {
      setDocShowPrintComponent(true);
      return DocPrintRef.current;
    },
    documentTitle: 'doctorNote',
    onAfterPrint: () => {
      setDocShowPrintComponent(false);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromIndexedDB = await getAllDataFromIndexedDB();
        if (dataFromIndexedDB) {
          setUserData({
            ...userData,
            prefferedName: dataFromIndexedDB.prefferedName || '',
            salutation: dataFromIndexedDB.salutation || '',
            firstName: dataFromIndexedDB.firstName || '',
            lastName: dataFromIndexedDB.lastName || '',
            emailID: dataFromIndexedDB.emailID || '',
            phoneNumber: dataFromIndexedDB.phoneNumber || ''
          });
        }
      } catch (error) {
        console.error("Error fetching data from IndexedDB:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (patientInfo) {
      dispatch(navigateBack());
      dispatch(writeDoctorNote(false));
      dispatch(navigateBackPsycNote());
      dispatch(writePsychoNote(false));
    }
  }, [patientInfo]);

  useEffect(() => {
    const showButtons = (!psychoNote || searchingAndAddingPatient) &&
      (!doctorNote || searchingAndAddingPatient) &&
      (!psychoNoteDetail || searchingAndAddingPatient) &&
      !doctorNoteDetail &&
      (patientInfo && patientInfo.patientid);
    setButtonsVisibility(showButtons);
  }, [psychoNote, doctorNote, doctorNoteDetail, patientInfo, searchingAndAddingPatient, psychoNoteDetail]);

  useEffect(() => {
    let isMounted = true;
    const fetchUserID = async () => {
      try {
        const userId = await getUserIDFromIndexedDB();
        if (isMounted) {
          setUserId(userId);
        }
      } catch (error) {
        console.error("Error fetching userID from IndexedDB:", error);
      }
    };
    fetchUserID();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (patientInfo && patientInfo.patientid) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
      const storedTimeDurations = JSON.parse(localStorage.getItem('timeDurations')) || [];
      const storedSessionDetails = JSON.parse(localStorage.getItem('sessionDetails')) || [];

      const prescriptionData = {
        patientId: patientInfo.patientid,
        tasks: storedTasks,
        habits: storedHabits,
        timeDurations: storedTimeDurations,
        sessionDetails: storedSessionDetails,
      };

      SavePrescription(prescriptionData);
      getProfileDetails();

      const fetchDoctorNoteDetails = async () => {
        if (patientInfo && patientInfo.patientid && userID) {
          const requestObject = {
            patID: patientInfo.patientid,
            userID: userID,
            isViewLastNote: 1
          };
          getDoctorNoteDetailForPrescription(requestObject);
        }
      };
      fetchDoctorNoteDetails();
    }
  }, [patientInfo, SavePrescription, getDoctorNoteDetailForPrescription]);

  const handleWritePsychoNote = () => {
    if (patientInfo) writePsychoNote(true);
  };

  const handleWriteDoctorNote = () => {
    if (patientInfo) writeDoctorNote(true);
  };

  const handleSendNoteClick = () => {
    setShowModalOne(true);
  };

  const handleCloseModalOne = () => {
    if (!patientInfo || !patientInfo.patientid) {
      setShowModalOne(false);
      setShowAddPatientModal(true);
    }

    else {

      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const tasks = storedTasks
        .filter(item => item.patientId === patientInfo.patientid)
        .map(item => item.taskDetails);

      const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
      const habits = storedHabits
        .filter(item => item.patientId === patientInfo.patientid)
        .map(item => item.habitData);

      const storedTools = JSON.parse(localStorage.getItem('tool')) || [];
      const tools = storedTools
        .filter(item => item.patientId === patientInfo.patientid)
        .map(item => item.toolDetails);

      const storedDrugs = JSON.parse(localStorage.getItem('prescriptionDrugs')) || [];
      const drugs = storedDrugs.map(item => item.drug);

      const prescriptionData = {
        doctorID: userID,
        patientID: patientInfo.patientid,
        signature: "sign",
        drugs: drugs,
        tasks: tasks,
        habits: habits,
        tools: tools
      };

      SavePrescription(prescriptionData);

      localStorage.removeItem('tasks');
      localStorage.removeItem('habits');
      localStorage.removeItem('tool');
      localStorage.removeItem('prescriptionDrugs');

      setShowIntermediateModal(true);
      setShowModalOne(false);
    }
  };

  const handleIntermediateModalChoice = async (choice) => {

    if (choice === 'doctorNote' && !DoctorNoteDet) {
      setShowIntermediateModal(false);
      setShowPopup(true);
      return;
    }

    if (userID) {
      const Obj = {
        patID: patientInfo.patientid,
        userID: userID,
        isCST: 0
      };
      try {
        await GetPrescription(Obj);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
      const requestObject = {
        patID: patientInfo.patientid,
        userID: userID,
        isViewLastNote: 1
      };
      try {
        await getDoctorNoteDetailForPrescription(requestObject);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    }

    // Handle choices after checking for DoctorNoteDet
    if (choice === 'prescription') {
      setShowPrintComponent(true);
      handlePrint();
    } else if (choice === 'doctorNote') {
      setDocShowPrintComponent(true);
      handleDocPrint();
    } else if (choice === 'prescriptionOnly') {
      setShowPrintPresComponent(true);
      handlePresPrint();
    }

    // Close the intermediate modal and proceed to the next modal
    setShowIntermediateModal(false);
    setShowChoiceModal(false);
    setShowModalTwo(true);
  };


  const handleCloseModalOneCross = () => {
    setShowModalOne(false);
    setShowIntermediateModal(false);
    setShowModalTwo(false);
    setShowModalThree(false);
  };
  const handleCloseModalTwo = () => {
    setShowModalTwo(false);
    setShowModalThree(true);
  };

  const handleCloseModalThree = () => {
    setShowModalThree(false);
    dispatch(resetPatientInfo());
    setActiveTab('');
  };

  const handleOpenModalThree = () => {
    setShowModalTwo(false);
    setShowModalThree(true);
  };

  const HandlePrescription = () => {
    setShowIntermediateModal(false);
    setShowChoiceModal(true)
  }

  return (
    <div className="consultation">
      <div className="consultation__body">
        <div className="consultation__patient-details">
          <span>Patient's details</span>
          <div className="ui input">
            <SearchPatientComponent searchText={searchText} />
          </div>
          <div className="consultation__patient-details-btn">
            <button className="consultation__patient-details-btn2">
              Cancel
            </button>
            <button
              className="consultation__patient-details-btn1"
              onClick={handleSendNoteClick}
            >
              Send Note
            </button>
          </div>
        </div>
        <div className="consultation__patient-Info">
          <PatientInfo patientInfo={patientInfo} prescriptionData={getPrescription} setLocalPrescriptions={setLocalPrescriptions} localPrescriptions={localPrescriptions} />
        </div>

        <div className="consultation__note-pres-Parent">
          {buttonsVisibility && (
            <div className="consultation__note">
              <div className="consultation--note-Parent">
                <div className="consultation--note">
                  <button
                    onClick={handleWritePsychoNote}
                    className="BTNhandleWritePsychoNote"
                  >
                    Write Psychotherapy note
                  </button>
                </div>
                <div className="consultation--note-label1">
                  Psychiatric note includes problems, target, Goals for
                  Counselling purpose
                </div>
              </div>
              <div className="consultation--pres-Parent">
                <div className="consultation--pres">
                  <button
                    onClick={handleWriteDoctorNote}
                    className="BTNhandleWriteDoctorNote"
                  >
                    Write Doctor’s note
                  </button>
                </div>
                <div className="consultation--note-label2">
                  Doctor’s note includes patient chief complaints, Physical
                  examination, MSE & Diagnosis
                </div>
              </div>
              <div className="consultation__note-pres__body"></div>
            </div>
          )}
          {psychoNote && <PsychoNoteForm />}
          {psychoNoteDetail && <PsychoNoteInfo />}
          {doctorNote && <DoctorNoteForm />}
          {doctorNoteDetail && <DoctorNoteInfo />}
          <div className="consultation__prescription">
            <Prescription searchTexts={searchTexts} setLocalPrescriptions={setLocalPrescriptions} localPrescriptions={localPrescriptions} />
          </div>
        </div>
      </div>
      {searchText && patientsList && <SearchPatient />}
      {searchText && <SearchPatient />}
      {addNewPatient && <AddNewPatient />}

      <Modal show={showModalOne} onHide={handleCloseModalOneCross} centered
        style={{ maxWidth: '800px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              margin: "0 auto",
              width: "100%",
              fontSize: "34px",
            }}
          >
            Are You Sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="ModelImage"></div>
          <br />
          <p>
            Click On The Send Now To Send The Prescription And The Notes To The Patient
            <span style={{ color: '#1E64CC' }}>{patientInfo ? patientInfo.phoneNumber
              : ' '}</span>
          </p>
          <hr />
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px", padding: '1rem' }}
          >
            <Button
              variant="light"
              style={{
                backgroundColor: "white",
                color: "#808080",
                border: "1px solid #808080",
                width: "150px",
                height: '50px',
              }}
              onClick={handleCloseModalOneCross}
            >
              Cancel
            </Button>
            <Button onClick={handleCloseModalOne} variant="primary"
              style={{
                backgroundColor: '#FF9241',
                color: 'white',
                width: '150px',
                height: '50px',
                border: 'none'
              }}>
              Send now
            </Button>

          </div>
        </Modal.Body>
      </Modal>


      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered
        style={{ maxWidth: '800px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Write a Doctor Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to write a doctor note before sending it.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddPatientModal} onHide={() => setShowAddPatientModal(false)} centered
        style={{ maxWidth: '800px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Add Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please add a patient and start the consultation to send prescriptions or notes.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAddPatientModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showIntermediateModal} onHide={handleCloseModalOneCross} centered
        style={{ maxWidth: '800px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              margin: "0 auto",
              width: "100%",
              fontSize: "34px",
            }}
          >
            Are You Sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="ModelImage"></div>
          <br />
          <div style={{ display: 'none' }}>
            {showDocPrintComponent && (
              <PrintDocNote
                ref={DocPrintRef}
                DoctorNoteDet={DoctorNoteDet}
                prescriptionData={getPrescription}
                patientInfo={patientInfo}
                ProfileDetails={ProfileDetails}
                userData={userData}
              />
            )}
          </div>

          {showPrintComponent && (
            <PrintPrescription
              ref={printRef}
              prescriptionData={getPrescription}
              patientInfo={patientInfo}
              ProfileDetails={ProfileDetails}
              userData={userData}
              DoctorNoteDet={DoctorNoteDet}
            />
          )}
          <p>
            Choose What Do You Want To Send To a Patient
            <span style={{ color: '#1E64CC' }}> {patientInfo ? patientInfo.phoneNumber
              : ' '}</span>
          </p>
          <hr />
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px", padding: '1rem' }}
          >
            <Button
              variant="primary"
              style={{
                backgroundColor: '#FF9241',
                color: 'white',
                width: '175px',
                height: '50px',
                border: 'none'
              }}
              onClick={HandlePrescription}
            >
              Send Prescription
            </Button>
            <Button
              variant="primary"
              style={{
                backgroundColor: '#FF9241',
                color: 'white',
                width: '175px',
                height: '50px',
                border: 'none'
              }}
              onClick={() => handleIntermediateModalChoice('doctorNote')}
            >
              Send Doctor Note
            </Button>

          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showChoiceModal} onHide={() => setShowChoiceModal(false)} centered style={{ maxWidth: '800px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Choose an option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'none' }}>
            {showPrintComponent && (
              <PrintPrescription
                ref={printRef}
                prescriptionData={getPrescription}
                patientInfo={patientInfo}
                ProfileDetails={ProfileDetails}
                userData={userData}
                DoctorNoteDet={DoctorNoteDet}
              />
            )}
          </div>
          <div style={{ display: 'none' }}>
            {setShowPrintPresComponent && (
              <PresPrintOnly
                ref={presRef}
                prescriptionData={getPrescription}
                patientInfo={patientInfo}
                ProfileDetails={ProfileDetails}
                userData={userData}
              />
            )}
          </div>
          Please choose whether you want to send the prescription only or with diagnosis.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleIntermediateModalChoice('prescriptionOnly')} >
            Prescription Only
          </Button>
          <Button variant="primary" onClick={() => handleIntermediateModalChoice('prescription')}>
            Prescription with Diagnosis
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalTwo} centered onHide={handleCloseModalOneCross} onClick={handleCloseModalThree}
        style={{ maxWidth: '600px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >

        <Modal.Header closeButton onClick={handleCloseModalThree}>

        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="ModelImage2"></div>
          <br />
          <h3 style={{ color: '#257D79', fontWeight: 'bold' }}>
            Sent successfully to <span style={{ color: '#1E64CC' }}>{patientInfo ? patientInfo.phoneNumber
              : ' '}</span>
          </h3>
          {/* <hr /> */}
          {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button onClick={handleOpenModalThree} variant="light" style={{ backgroundColor: '#EDF4FD', color: '#1E64CC', borderRadius: '1px', width: '150px' }}>
              Link Guardian
            </Button>
          </div>
          <p style={{ color: '#254069' }}>If patient is with guardian send invite to guardian</p> */}
        </Modal.Body>
      </Modal>

      <Modal show={showModalThree} onHide={handleCloseModalThree} centered
        style={{ maxWidth: '600px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#1E64CC', margin: '0 auto', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Enter Guardian Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Guardian">
            <div style={{ margin: '1rem', display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="guardianName" style={{ marginRight: '10px', minWidth: '100px', color: '#254069' }}>Name:</label>
              <input type="text" id="guardianName" style={{ border: '1px solid #808495' }} />
            </div>
            <div style={{ margin: '1rem', display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="guardianMobile" style={{ marginRight: '10px', minWidth: '100px', color: '#254069' }}>Mobile Number:</label>
              <input type="text" id="guardianMobile" style={{ border: '1px solid #808495' }} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="light" style={{ padding: '10px 70px', fontSize: '18px', border: '1px solid #808080', backgroundColor: 'transparent' }} onClick={handleCloseModalThree}>
            Close
          </Button>
          <Button variant="primary" style={{ padding: '10px 70px', fontSize: '18px' }}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      <iframe
        title="print-frame"
        ref={printIframeRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  psychoNote: state.patientDetails.psychoNote,
  doctorNote: state.patientDetails.doctorNote,
  patientsList: state.patientDetails.patientsList,
  searchText: state.patientDetails.searchText,
  addNewPatient: state.patientDetails.addNewPatient,
  doctorNoteDetail: state.patientDetails.doctorNoteDetail,
  psychoNoteDetail: state.patientDetails.psychoNoteDetail,
  patientInfo: state.patientDetails.patientInfo,
  getPrescription: state.patientDetails.getPrescription,
  ProfileDetails: state.Setting.ProfileDetails,
  DoctorNoteDet: state.patientDetails.DoctorNoteDet,
  prescriptionFromCST: state.patientDetails.prescriptionFromCST
});

const mapDispatchToProps = {
  SavePrescription,
  writeDoctorNote,
  writePsychoNote,
  GetPrescription,
  getProfileDetails,
  getDoctorNoteDetailForPrescription,
  setActiveTab
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Consultation);

import React, { useState, useEffect, useRef } from 'react';
import AddPrescription from './DrugPrescription/addPrescriptoin-view';
import PrescriptionSummary from './DrugPrescription/prescription-summary';
import AddPharmaPres from './PharmaPrescription/addPharma-view';
import NonPharmaSummary from './DrugPrescription/Non-pharma-summary';
import '../../../style/consultation/prescript-view.css';
import { connect } from 'react-redux';
import { GetPrescription } from '../../../Actions/consultation';
import { getAllDataFromIndexedDB, getUserIDFromIndexedDB } from '../../../Actions/indexedDB';
import { Modal, Button } from 'react-bootstrap';
import CST from './CST';
import { useReactToPrint } from 'react-to-print';
import PrintPrescription from '../PrintPrescription';
import PrintDocNote from '../PrintDocNote';
import PresPrintOnly from '../PrescriptionOnly'

const Prescription = ({ GetPrescription, prescription, patientID, getPrescription, patientInfo, ProfileDetails, DoctorNoteDet, localPrescriptions, setLocalPrescriptions }) => {
    const [tabHeader, setTabHeader] = useState('1');
    const [showAddPrescription, setShowAddPrescription] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [habits, setHabits] = useState([]);
    const [timeDurations, setTimeDurations] = useState([]);
    const [userID, setUserID] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sessionDetails, setSessionDetails] = useState([]);
    const [showCSTSummary, setShowCSTSummary] = useState(false);
    const [isModalConfirmed, setIsModalConfirmed] = useState(false);
    const [showPrintComponent, setShowPrintComponent] = useState(false);
    const [showPrintPresComponent, setShowPrintPresComponent] = useState(false);
    const [showDocPrintComponent, setDocShowPrintComponent] = useState(false);
    const [showModalOne, setShowModalOne] = useState(false);
    const [showChoiceModal, setShowChoiceModal] = useState(false);
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);
    const [userData, setUserData] = useState({
        prefferedName: '',
        salutation: ''
    });

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

    const handleAddPrescriptionClick = () => {
        setShowAddPrescription(true);
    };

    const handleBackToSummaryClick = () => {
        setShowAddPrescription(false);
    };

    const handleCSTClick = () => {
        setIsModalVisible(true);
    };

    const handleModalConfirm = async () => {
        setIsModalVisible(false);
        setIsModalConfirmed(true);
    };
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
        if (isModalConfirmed) {
            const handleModalConfirm = async () => {
                const UserDetails = {
                    patID: patientID,
                    userID: userID,
                    isCST: 1
                };
                try {
                    await GetPrescription(UserDetails);
                    setShowCSTSummary(true);
                } catch (error) {
                    console.error("Error fetching prescription data:", error);
                }
            };

            handleModalConfirm();
            setIsModalConfirmed(false);
        }
    }, [isModalConfirmed, patientID, userID, GetPrescription]);

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddTask = (task) => {
        const newTask = { ...task, doctorId: userID, patientId: patientID, taskType: 'task' };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleAddHabit = (habit) => {
        const newHabit = { ...habit, doctorId: userID, patientId: patientID, taskType: 'habit' };
        const updatedHabits = [...habits, newHabit];
        setHabits(updatedHabits);
        localStorage.setItem('habits', JSON.stringify(updatedHabits));
    };

    const handleAddTimeDuration = (timeDuration) => {
        const newTimeDuration = { ...timeDuration, doctorId: userID, patientId: patientID, taskType: 'tool' };

        // Get existing tools from localStorage
        const storedTools = JSON.parse(localStorage.getItem('tool')) || [];
        const updatedTools = [...storedTools, newTimeDuration]; // Merge the new tool with existing tools

        setTimeDurations(updatedTools);
        localStorage.setItem('tool', JSON.stringify(updatedTools));
    };

    const handleSessionDetails = (session) => {
        const newSessionDetails = { ...session, doctorId: userID, patientId: patientID, taskType: 'tool' };

        // Get existing tools from localStorage
        const storedTools = JSON.parse(localStorage.getItem('tool')) || [];
        const updatedTools = [...storedTools, newSessionDetails]; // Merge the new tool with existing tools

        setSessionDetails(updatedTools);
        localStorage.setItem('tool', JSON.stringify(updatedTools));
    };


    const handlePrintClick = () => {
        setShowModalOne(true);
    };

    const handleCloseModalOneCross = () => {
        setShowModalOne(false);
    };


    useEffect(() => {
        let isMounted = true;

        const fetchUserID = async () => {
            try {
                const userId = await getUserIDFromIndexedDB();
                if (isMounted) {
                    setUserID(userId);
                }
            } catch (error) {
                console.error("Error fetching userID from IndexedDB:", error);
            }
        };

        fetchUserID();

        // Cleanup function to run when the component unmounts
        return () => {
            isMounted = false; // Update the flag to indicate unmounting
        };
    }, []);

    const handleBackFromCST = () => {
        setShowCSTSummary(false);
    };



    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);

        const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
        setHabits(storedHabits);

        const storedTimeDurations = JSON.parse(localStorage.getItem('tool')) || [];
        setTimeDurations(storedTimeDurations);

        const storedSessionDetails = JSON.parse(localStorage.getItem('tool')) || [];
        setSessionDetails(storedSessionDetails);
    }, []);

    const tabClickHandler = (event) => {
        const tabId = event.target.getAttribute('name');
        setTabHeader(tabId);
    };

    const getTabClassName = (tabId) => {
        return tabHeader === tabId ? 'pres-tab-selected' : 'pres-tab-not-selected';
    };

    const drugTabclass = 'border-radius-l press-tab ' + getTabClassName('1');
    const pharmsTabclass = 'border-radius-r press-tab ' + getTabClassName('2');

    const HandlePrescription = () => {
        if (!patientInfo || !patientInfo.patientid) {
            setShowModalOne(false);
            setShowAddPatientModal(true);
        }
        else {
            setShowModalOne(false);
            setShowChoiceModal(true)
        }
    }

    const handleIntermediateModalChoice = async (choice) => {

        if (!patientInfo || !patientInfo.patientid) {
            setShowModalOne(false);
            setShowAddPatientModal(true);
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
        }
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
        setShowModalOne(false)
        setShowChoiceModal(false)
    };

    return (
        <div className='con-pres-parent'>
            <div className='pres-header'>
                <div className='pres-header--label'>
                    Write Prescription
                </div>
                <div className='press-headercontent'>
                    <div className='pres-header--img img-cst image-basic' onClick={handleCSTClick}>
                        CST
                    </div>
                    <div className='pres-header--img img-print image-basic' onClick={handlePrintClick}>
                        Print
                    </div>
                </div>
            </div>
            {showCSTSummary ? (
                <CST onBack={handleBackFromCST} prescription={getPrescription} />
            ) : (
                <>
                    <div className='pres-tab-header'>
                        <div onClick={tabClickHandler} tabIndex='1' name='1' className={drugTabclass}>
                            Drug Prescription
                        </div>
                        <div onClick={tabClickHandler} tabIndex='1' name='2' className={pharmsTabclass}>
                            Non-Pharma Prescription
                        </div>
                    </div>
                    <div className='pres-tab-body'>
                        {tabHeader === '1' &&
                            <div className='pres-body-parent'>
                                {showAddPrescription ? (
                                    <AddPrescription onAddprescription={handleBackToSummaryClick} />
                                ) : (
                                    <PrescriptionSummary onAddPrescription={handleAddPrescriptionClick} setLocalPrescriptions={setLocalPrescriptions} localPrescriptions={localPrescriptions} />
                                )}
                            </div>
                        }
                        {tabHeader === '2' &&
                            <div>
                                {patientID ? (
                                    <>
                                        <AddPharmaPres
                                            handleAddTask={handleAddTask}
                                            handleAddHabit={handleAddHabit}
                                            handleAddTimeDuration={handleAddTimeDuration}
                                            handleSessionDetails={handleSessionDetails}
                                        />
                                        <NonPharmaSummary
                                            tasks={tasks}
                                            habits={habits}
                                            timeDurations={timeDurations}
                                            sessionDetails={sessionDetails}
                                            setTasks={setTasks}
                                            setHabits={setHabits}
                                            setTimeDurations={setTimeDurations}
                                            setSessionDetails={setSessionDetails}
                                        />
                                    </>
                                ) : (
                                    <div className='no-summary'>
                                        <div className='label-basic'>Patient ID Not available, Please Add Patient To Continue</div>
                                        <div className='no-summary-cst label-basic'></div>
                                        <div className='label-basic'>Click CST to add prescription from last session</div>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </>
            )}
            <Modal
                show={isModalVisible}
                onHide={handleModalCancel}
                centered
                style={{ maxWidth: '600px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: '#1E64CC', margin: '0 auto', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                        Are you sure?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>Do you want to prescribe the same treatment again for the selected patient?</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" onClick={handleModalCancel} style={{ padding: '10px 70px', fontSize: '18px' }}>Cancel</Button>
                    <Button variant="primary" onClick={handleModalConfirm} style={{ padding: '10px 70px', fontSize: '18px' }}>Confirm</Button>
                </Modal.Footer>
            </Modal>

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
                    <div style={{ display: 'none' }}>
                        {showDocPrintComponent && (
                            <PrintDocNote
                                ref={DocPrintRef}
                                DoctorNoteDet={DoctorNoteDet}
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
                        Choose What Do You Want To Send To Print
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
                            Print Prescription
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
                            Print Doctor Note
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
                    Please choose whether you want to Print prescription only or prescription with diagnosis.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleIntermediateModalChoice('prescriptionOnly')} >
                        Print Prescription
                    </Button>
                    <Button variant="primary" onClick={() => handleIntermediateModalChoice('prescription')}>
                        Print   Prescription with Diagnosis
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
                    <p>Please add a patient and start the consultation to Print prescriptions or notes.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowAddPatientModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
    prescription: state.patientDetails.getPrescription,
    patientID: state.patientDetails?.patientInfo?.patientid,
    getPrescription: state.patientDetails.getPrescription,
    patientInfo: state.patientDetails?.patientInfo,
    ProfileDetails: state.Setting.ProfileDetails,
    DoctorNoteDet: state.patientDetails.DoctorNoteDet,
});

export default connect(mapStateToProps, { GetPrescription })(Prescription);

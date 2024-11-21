import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { getPatientHistory, setSelectedTab } from '../../../Actions/managePatient';
import { getUserIDFromIndexedDB } from '../../../Actions/indexedDB';
import { getDoctorNoteDetails as fetchDoctorNoteDetails } from '../../../Actions/consultation';
import { setActiveTab } from '../../../Actions/landingPage';
import EditIcon from '../../../style/images/Edit.svg';
import ProfileIMG from '../../../style/images/Profile-2.svg';

const PatientInfo = ({ patientInfo, getPatientHistory, setLocalPrescriptions, setSelectedTab }) => {
    const patientDetails = useSelector(state => state.patientDetails.patientInfo);
    const [userID, setUserID] = useState(null);
    const [lastSessionDate, setLastSessionDate] = useState('-');
    const [profileImage, setProfileImage] = useState(ProfileIMG);

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

    useEffect(() => {
        if (patientInfo && userID) {
            fetchDoctorNoteDetails({ patID: patientInfo.patientid, userID: userID });
        }
    }, [patientInfo, userID]);

    const dispatch = useDispatch();

    const getDoctorNoteDetails = () => {
        dispatch(
            fetchDoctorNoteDetails({
                patID: patientInfo.patientid,
                userID: userID,
            })
        );
    };

    const handleGetPatientHistory = async () => {
        try {
            const response = await getPatientHistory({
                userID: userID,
                patID: patientInfo.patientid,
                pageNum: 1
            }, patientInfo);

            if (response && response.drugs) {
                const storedDrugs = JSON.parse(localStorage.getItem('prescriptionDrugs')) || [];
                storedDrugs.push({
                    UsrInfo: {
                        patientID: patientInfo.patientid,
                        userID: userID
                    },
                    drug: response.drugs
                });
                localStorage.setItem('prescriptionDrugs', JSON.stringify(storedDrugs));
                setLocalPrescriptions((prevDrugs) => [...prevDrugs, ...response.drugs]);

                // Find the latest doctor note date
                if (response.doctorNotes && response.doctorNotes.length > 0) {
                    const latestNote = response.doctorNotes.reduce((latest, note) => {
                        return new Date(note.Date) > new Date(latest.Date) ? note : latest;
                    });
                    setLastSessionDate(new Date(latestNote.Date).toLocaleString());
                }
            }
        } catch (error) {
            console.error("Error fetching patient history:", error);
        }
    };

    const handleClick = () => {
        handleGetPatientHistory();
        getDoctorNoteDetails();
    };

    const handleTabClick = (tabID) => {
        setSelectedTab(tabID);
    };

    const handleButtonClick = () => {
        if (patientDetails == null) {
            dispatch(setActiveTab("1"));
        } else {
            dispatch(setActiveTab("3"));
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='pinfo'>
            <div className='pinfo-pic'>
                <div className="edit-profile-img">
                    <img src={profileImage} alt="Profile" className="profile-image New-Ima" />
                    <div className="edit-overlay"></div>
                    <input
                        type="file"
                        accept="image/*"
                        className="edit-file-input"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="upload-profile-img"
                    />
                    {patientDetails && (
                        <label htmlFor="upload-profile-img" className="edit-icon-label">
                            <img src={EditIcon} alt="Edit" className="edit-icon" />
                        </label>
                    )}
                </div>
                <div className='pinfo__name'>
                    <div className='pinfo-flexcontainer-column'>
                        <span className='pinfo--name-label pinfo-labels'>Patient's Name</span>
                        <div className='pinfo--name pinfo-text'>{patientDetails?.firstName ? (patientDetails.firstName + " " + patientDetails.lastName) : "-"}</div>
                    </div>
                    <div className='pinfo-flexcontainer-column'>
                        <div className='pinfo-flexcontainer'>
                            <span className='pinfo--age-label pinfo-labels'>Age</span>
                            <span className='pinfo--gender-label pinfo-labels'>Sex</span>
                        </div>
                        <div className='pinfo-flexcontainer'>
                            <div className='pinfo--age pinfo-text'>{patientDetails?.age ? patientDetails?.age : '-'}</div>
                            <div className='pinfo--gender pinfo-text'>{patientDetails?.gender ? patientDetails?.gender : "-"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pinfo__contacts'>
                <div className='pinfo__contacts-container'>
                    <div className='pinfo__mail-parent pinfo__contacts--label'>
                        <span className='pinfo-labels'>Email Address</span>
                        <div className='pinfo__mail pinfo-text'>{patientDetails?.emailID ? patientDetails?.emailID : '-'}</div>
                    </div>
                    <div className='pinfo__mobile-parent pinfo__contacts--label'>
                        <span className='pinfo-labels'>Mobile</span>
                        <div className='pinfo__mobile pinfo-text'>{patientDetails?.phoneNumber ? patientDetails?.phoneNumber : '-'}</div>
                    </div>
                    <div className='pinfo__consulting-parent pinfo__contacts--label'>
                        <span className='pinfo-labels'>Consulting</span>
                        <div className='pinfo__consulting pinfo-text'>-</div>
                    </div>
                    <div className='pinfo__last-sesion-parent pinfo__contacts--label'>
                        <span className='pinfo-labels'>Last Session</span>
                        <div className='pinfo__last-session pinfo-text'>{lastSessionDate || "-"}</div>
                    </div>
                </div>
                <div className='pinfo__activity-container'>
                    <div className='pinfo__activity' onClick={() => { handleClick(); handleTabClick(2); handleButtonClick() }}>
                        <i></i>
                        <div>Activity tracking</div>
                    </div>
                    {patientInfo &&
                        <div className='pinfo__activity' onClick={handleClick}>
                            <i></i>
                            <div>View Last Session</div>
                        </div>
                    }
                    <div className='pinfo__lab' onClick={() => { handleClick(); handleTabClick(3); handleButtonClick() }}>
                        <i></i>
                        <div>Lab reports</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedTabID: state.managePatient.selectedTabID,
    };
};

export default connect(mapStateToProps, { getPatientHistory, setSelectedTab })(PatientInfo);

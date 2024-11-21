import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPatientHistory } from '../../../Actions/managePatient';
import { getUserIDFromIndexedDB } from '../../../Actions/indexedDB';

const PatientTile = ({ patientInfo, getPatientHistory }) => {
    const userName = `${patientInfo.firstName} ${patientInfo.middleName} ${patientInfo.lastName}`;
    const country = patientInfo.country;
    const phoneNumber = patientInfo.phoneNumber;

    const handleGetPatientHistory = () => {
        getPatientHistory({
            userID: userID,
            patID: patientInfo.patientid,
            pageNum: 1
        }, patientInfo);
    };

    const [userID, setUserID] = useState(null);

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

    return (
        <div className='mp-patient-tile'>
            <div className='mp-tile-data' tabIndex="1" onClick={handleGetPatientHistory}>
                <div className='mp-user-img fas fa-user-tie'></div>
                <div className='mp-user-data'>
                    <label className='label-basic mp-user'>{userName}</label>
                    <label className='label-basic mp-country'>{country}</label>
                    <label className='label-basic mp-mobile'>{phoneNumber}</label>
                </div>
                <div className='mp-tile-icon far fa-calendar'></div>
            </div>
            <div className='mp-tile-empty'></div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, { getPatientHistory })(PatientTile);

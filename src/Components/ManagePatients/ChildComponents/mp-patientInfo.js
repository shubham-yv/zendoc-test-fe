import React from 'react';
import { useSelector } from 'react-redux';

import PatientDetails from './PatientTracker/mp-patientDetails.js';

const PatientTrackerInfo = () => {
    // const yourReduxState = useSelector(state => state.yourRedcerName);

    return (
        <div className='mp-patient-info'>
            <PatientDetails />
        </div>
    );
}

export default PatientTrackerInfo;

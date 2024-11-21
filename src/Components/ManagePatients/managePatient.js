import React from 'react';
import { connect } from 'react-redux';

import PatientSearchBar from './ChildComponents/mp-searcbar';
import PatientList from './ChildComponents/mp-patientList';
import PatientTrackerInfo from './ChildComponents/mp-patientInfo';

import '../../style/managePatients/mp-SearchBar.css';
import '../../style/managePatients/mp-patientList.css';
import '../../style/managePatients/mp-patientInfo.css';

function ManagePatients(props) {
    const { patientsList, patientHistory } = props.managePatient;

    if (!patientsList && !patientHistory) {
        return (
            <div className='manage-patients'>
                <PatientSearchBar />
            </div>
        );
    } else if (patientsList) {
        return (
            <div className='manage-patients'>
                <PatientList patientList={patientsList} />
            </div>
        );
    } else {
        return (
            <div className='manage-patients'>
                <PatientTrackerInfo />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        managePatient: state.managePatient,
    };
}

export default connect(mapStateToProps)(ManagePatients);

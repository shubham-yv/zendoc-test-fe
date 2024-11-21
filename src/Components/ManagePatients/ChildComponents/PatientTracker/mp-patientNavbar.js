import React from 'react';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../../../Actions/managePatient';

const PatientNavBar = ({ selectedTabID, setSelectedTab }) => {
    const getClassName = (tabID) => {
        let className = 'mp-nav-div';
        if (selectedTabID === tabID)
            className = 'mp-nav-div mp-nav-div--selected';
        return className;
    };

    const handleTabClick = (tabID) => {
        setSelectedTab(tabID);
    };

    return (
        <div className='mp-patient-nav-bar-parent'>
            <div className='mp-patient-nav-bar'>
                <div tabIndex="1" onClick={() => handleTabClick(1)} className={getClassName(1)} tabid="1">
                    Patient History
                </div>
                <div tabIndex="1" onClick={() => handleTabClick(2)} className={getClassName(2)} tabid="2">
                    Activity Tracking
                </div>
                <div tabIndex="1" onClick={() => handleTabClick(3)} className={getClassName(3)} tabid="3">
                    Lab Reports
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        selectedTabID: state.managePatient.selectedTabID
    }
}

export default connect(mapStateToProps, { setSelectedTab })(PatientNavBar);

import React from "react";
import { connect } from "react-redux";

import SearchPatientInfo from "./SearchPatientInfo";
import { addNewPatientFlag } from "../../../../Actions/consultation";
import "../../../../style/consultation/searchnAddPatient-view.css";

const SearchPatient = ({ patientsList, addNewPatientFlag }) => {

    const handleAddNewPatient = () => {
        addNewPatientFlag(true);
    };

    const renderPatients = () => {
        if (!patientsList || !Array.isArray(patientsList)) {
            return null;
        }
        return patientsList.map((patient) => (
            <SearchPatientInfo key={patient.patientid} patient={patient} />
        ));
    };

    return (
        <div className="con-sp-parent">
            <div className="con-sp-header">Search Result</div>
            {patientsList && patientsList.length === 0 && (
                <div className="con-sp-addPatient">
                    <span>
                        This Email address Is not available. To continue click add patient
                    </span>
                    <button
                        onClick={handleAddNewPatient}
                        className="button blue-buttonadd small-button"
                    >
                        Add Patient
                    </button>
                </div>
            )}
            <div className="con-sp-body">{renderPatients()}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        patientsList: state.patientDetails.patientsList,
    };
};

export default connect(mapStateToProps, {
    addNewPatientFlag,
})(SearchPatient);

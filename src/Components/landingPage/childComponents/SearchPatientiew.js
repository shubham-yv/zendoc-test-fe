import React, { useState } from "react";
import { connect } from "react-redux";
import SearchPatientInfo from "./SearchPatientInfo";
import { addNewPatientFlag } from "../../../Actions/consultation";
import { setActiveTab } from "../../../Actions/landingPage";
import "../../../style/landingPage/Searchpatient.css";

const SearchPatient = ({ patientsList, addNewPatientFlag, setActiveTab, onSelectPatient }) => {
    const [listOpen, setListOpen] = useState(true);

    const handleAddNewPatient = () => {
        addNewPatientFlag(true);
    };

    const handleSelectPatient = (patientId) => {
        onSelectPatient(patientId);
        setListOpen(false);
        setActiveTab('1');
    };

    const renderPatients = () => {
        if (!patientsList || !Array.isArray(patientsList) || patientsList.length === 0) {
            return <div className="no-patients-message" style={{ marginLeft: '1rem' }}>N/A</div>;
        }
        return patientsList.map((patient) => (
            <SearchPatientInfo key={patient.patientid} patient={patient} onSelectPatient={handleSelectPatient} />
        ));
    };

    return (
        <div>
            {listOpen && (
                <>
                    <div className="con-sp-parent-landing-page">
                        <div className="con-sp-header">Search Results</div>
                        <div className="con-sp-body">{renderPatients()}</div>
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        patientsList: state.patientDetails.patientsList,
    };
};

const mapDispatchToProps = {
    addNewPatientFlag,
    setActiveTab
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPatient);
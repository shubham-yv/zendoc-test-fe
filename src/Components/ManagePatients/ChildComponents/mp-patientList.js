import React, { useState } from "react";
import { connect } from 'react-redux';
import PatientTile from "./mp-patientTile";
import AddNewPatient from '../../landingPage/childComponents/AddNewPatient';
import { getPatientsToManage } from "../../../Actions/managePatient";
import { addNewPatientFlag } from '../../../Actions/consultation'

const PatientList = ({ patientList, getPatientsToManage, addNewPatientFlag }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearchChange = (event) => {
    const searchString = event.target.value;
    setSearchTerm(searchString);
    getPatientsToManage(searchString);
  };

  const getPatientList = (list) => {
    if (!list) return null;
    return list.map((info) => {
      return <PatientTile key={info.patientid} patientInfo={info} />;
    });
  };

  const patientListItems = getPatientList(patientList);

  const handleAddPatientClick = () => {
    setShowModal(true);
    addNewPatientFlag(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    addNewPatientFlag(false);
  };

  return (
    <div className='mp-patient-tiles-page'>
      <div className="mp-Page__search">
        <div className="landing-Page__search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter patient ID or mobile number to search patient"
          />
          <button type="submit">
            <i className="fas fa-search"></i>
            Search
          </button>
        </div>
        <button className="landing-Page__add-patient" onClick={handleAddPatientClick}>
          <i className="fas fa-plus"></i>
          Add New Patient
        </button>
      </div>
      <div className='mp-patient-tile-parent'>
        {patientListItems || <div style={{ marginTop: '1.5rem' }}>Please Search And Select Patient To View His Records</div>}
      </div>

      <AddNewPatient show={showModal} onHide={handleCloseModal} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  patientList: state.managePatient.patientsList
});

export default connect(mapStateToProps, {
  getPatientsToManage,
  addNewPatientFlag
})(PatientList);

import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { getPatientsToManage } from "../../../Actions/managePatient";
import AddIcon from '@mui/icons-material/Add';
import AddNewPatient from '../../landingPage/childComponents/AddNewPatient'; 
import { addNewPatientFlag } from "../../../Actions/consultation"; 

const SearchBar = ({ getPatientsToManage, showImage, addNewPatientFlag }) => {
  const [debounceFn, setDebounceFn] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => { };

  const handleAdditionalTextClick = () => {
    setShowModal(true);
    addNewPatientFlag(true);
  };

  const handleChange = (event) => {
    event.persist();
    if (!debounceFn) {
      setDebounceFn(
        _.debounce(() => {
          let searchString = event.target.value;
          getPatientsToManage(searchString);
        }, 300)
      );
    }
    // debounceFn();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    addNewPatientFlag(false);
  };

  return (
    <div className="mp-searchBar-Parent">
      {!showImage && (
        <div className="mp-seachBar-image">
          <div className="mp-image-labels">
            <label className="label-basic1">Manage Patients</label>
            <label className="label-basic2">
              Search patient by ID, Name, Mobile, or Email Address
            </label>
          </div>
          <div>
            <button className="custom-button" onClick={() => setShowModal(true)}>
              <AddIcon /> Add New Patient
            </button>
          </div>
        </div>
      )}

      <div className="mp-search-box-container">
        <div className="mp-search-image"></div>
        <div className="mp-searchbar-input">
          <input
            onChange={(event) => handleChange(event)}
            className="form-control"
            placeholder="Type to search existing patient or click add patient to add new patient"
          />
          <button className="search-buttons" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="mp-parent-box">
          <div
            className="email-address"
            style={{
              height: "14px",
              fontSize: "14px",
              textDecoration: "underline",
              color: "blue",
              marginBottom: "10px",
            }}
          >
            example@example.com
          </div>
          <div
            style={{ fontSize: "14px", color: "blue", textAlign: "center" }}
            onClick={handleAdditionalTextClick}
          >
            This Email address is not available. To add, click Add Patient.
          </div>
        </div>
      </div>

      <AddNewPatient show={showModal} onHide={handleCloseModal} />
    </div>
  );
};

export default connect(null, {
  getPatientsToManage,
  addNewPatientFlag,
})(SearchBar);

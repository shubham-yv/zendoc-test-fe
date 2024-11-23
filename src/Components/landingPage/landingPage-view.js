import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import Header from "../header";
import Tiles from "./childComponents";
import { tilesCollection } from "./tilesJson";
import AddIcon from "@mui/icons-material/Add";
import "../../style/landingPage/landingPage.css";
import Dashboard_Image from "../../../src/style/images/Dashboard Footer.svg";
import AddNewPatient from "./childComponents/AddNewPatient";
import { addNewPatientFlag, getPatientList } from "../../Actions/consultation";
import SearchPatient from "./childComponents/SearchPatientiew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = ({ addNewPatientFlag, getPatientList }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const handleTileClick = (route) => {
    console.log(`Navigating to ${route}`);
    history.push(route);
  };

  const debouncedFn = useCallback(
    _.debounce((value) => {
      getPatientList(value);
    }, 300),
    []
  );

  const handleChange = (event) => {
    setSearchString(event.target.value);
    debouncedFn(event.target.value);
  };

  const handleButtonClick = () => {
    if (searchString.trim() !== "") {
      console.log("Search button clicked with query:", searchString);
    }
  };

  const handleAddPatientClick = () => {
    setShowModal(true);
    addNewPatientFlag(true);
  };

  const handleSelectPatient = (patientId) => {
    setSearchString(patientId);
    setSelectedPatientId(patientId);
  };

  const handleModalClose = () => {
    setShowModal(false);
    addNewPatientFlag(false);
  };

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  return (
    <div className="landing-Page">
      <Header />
      <ToastContainer />
      <div className="landing-Page__search">
        <div className="landing-Page__search-bar">
          <button type="submit" id="SearchPatient-BTN" onClick={handleButtonClick}>
            Search Patients
          </button>
          <input
            type="text"
            placeholder="Enter patient ID or mobile number to search patient"
            onChange={handleChange}
            value={searchString}
          />
          <button type="submit">
            <i className="fas fa-search"></i> Search
          </button>
        </div>
        <button className="landing-Page__add-patient" onClick={handleAddPatientClick}>
          <AddIcon />
          Add Patient
        </button>
      </div>

      {searchString && <SearchPatient onSelectPatient={handleSelectPatient} />}

      <div className="tiles-container">
        {tilesCollection.map((tile) => (
          <div className="tile-Container" key={tile.id}>
            <Tiles tile={tile} tileClickHandler={() => handleTileClick(tile.route)} />
          </div>
        ))}
      </div>

      <div className="DashboardFooter">
        <img src={Dashboard_Image} alt="Footer" />
        <div className="content">
          <p>Want to give any suggestion? You are always welcome</p>
          <button className="landing-Page__Feedback">Write Feedback</button>
        </div>
      </div>

      <AddNewPatient show={showModal} onHide={handleModalClose} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  managePatient: state.managePatient,
});

const mapDispatchToProps = {
  addNewPatientFlag,
  getPatientList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

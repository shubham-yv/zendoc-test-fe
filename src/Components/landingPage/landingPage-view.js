// import React, { useState, useCallback, useEffect } from "react";
// import { connect, useDispatch } from "react-redux";
// import Header from "../header";
// import _ from "lodash";
// import Tiles from "./childComponents";
// import { tilesCollection } from "./tilesJson";
// import AddIcon from '@mui/icons-material/Add';
// import "../../style/landingPage/landingPage.css";
// import Dashboard_Image from '../../../src/style/images/Dashboard Footer.svg';
// import AddNewPatient from './childComponents/AddNewPatient';
// import { addNewPatientFlag, getPatientList } from "../../Actions/consultation";
// import SearchPatient from './childComponents/SearchPatientiew';
// import { setActiveTab } from "../../Actions/landingPage";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useLocation } from 'react-router-dom';

// const LandingPage = ({ tileClickHandler, addNewPatientFlag, getPatientList, setActiveTab }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [searchString, setSearchString] = useState('');
//   const [selectedPatientId, setSelectedPatientId] = useState(null);

//   const dispatch = useDispatch();

//   const handleAddPatientClick = () => {
//     setShowModal(true);
//     addNewPatientFlag(true);
//   };

//   const handleButtonClick = () => {
//     if (searchString.trim() !== '') {
//       dispatch(setActiveTab('1'));
//     }
//   };

//   console.log(setActiveTab, "setActiveTab")

//   const debouncedFn = useCallback(
//     _.debounce((value) => {
//       getPatientList(value);
//     }, 300),
//     []
//   );

//   const handleChange = (event) => {
//     event.persist();
//     setSearchString(event.target.value);
//     debouncedFn(event.target.value);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     addNewPatientFlag(false);
//   };

//   const handleSelectPatient = (patientId) => {
//     setSearchString(patientId);
//     setSelectedPatientId(patientId);
//   };

//   const getTilesCollection = (tilesCollection) => {
//     return tilesCollection.map((tile) => (
//       <div className="tile-Container" key={tile.id}>
//         <Tiles tile={tile} tileClickHandler={tileClickHandler} />
//       </div>
//     ));
//   };

//   const location = useLocation();

//   useEffect(() => {
//     if (location.state && location.state.message) {
//       toast.success(location.state.message);
//     }
//   }, [location.state]);

//   return (
//     <div className="landing-Page">
//       <Header />
//       <ToastContainer />
//       <div className="landing-Page__search">
//         <div className="landing-Page__search-bar">
//           <button type="submit" id="SearchPatient-BTN" onClick={handleButtonClick}>
//             Search Patients
//           </button>
//           <input
//             type="text"
//             placeholder="Enter patient ID or mobile number to search patient"
//             onChange={handleChange}
//             value={searchString}
//           />
//           <button type="submit">
//             <i className="fas fa-search"></i>
//             Search
//           </button>
//         </div>
//         <button className="landing-Page__add-patient" onClick={handleAddPatientClick}>
//           <AddIcon />
//           Add Patient
//         </button>
//       </div>

//       {searchString && <SearchPatient onSelectPatient={handleSelectPatient} />}

//       <div className="tiles-container">
//         {getTilesCollection(tilesCollection)}
//       </div>

//       <div className="page-wrapper">
//         <div className="main-content"></div>
//         <div className="DashboardFooter">
//           <img src={Dashboard_Image} alt="" />
//           <div className="content">
//             <p>Want to give any suggestion? You are always welcome</p>
//             <button className="landing-Page__Feedback">Write Feedback</button>
//           </div>
//         </div>
//       </div>

//       <AddNewPatient show={showModal} onHide={handleModalClose} />
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     managePatient: state.managePatient
//   };
// };

// const mapDispatchToProps = {
//   addNewPatientFlag,
//   getPatientList,
//   setActiveTab
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);





import React, { useState, useCallback, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Header from "../header";
import _ from "lodash";
import Tiles from "./childComponents";
import { tilesCollection } from "./tilesJson";
import AddIcon from '@mui/icons-material/Add';
import "../../style/landingPage/landingPage.css";
import Dashboard_Image from '../../../src/style/images/Dashboard Footer.svg';
import AddNewPatient from './childComponents/AddNewPatient';
import { addNewPatientFlag, getPatientList } from "../../Actions/consultation";
import SearchPatient from './childComponents/SearchPatientiew';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useHistory } from 'react-router-dom';

const LandingPage = ({ addNewPatientFlag, getPatientList }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleTileClick = (tileId) => {

    console.log(`Tile ${tileId} clicked`);

    switch (tileId) {
      case 1:
        history.push('/consultation');
        break;
      case 2:
        history.push('/schedule-calender');
        break;
      case 3:
        history.push('/manage-patients');
        break;
      case 4:
        history.push('/notifications');
        break;
      case 5:
        history.push('/tools');
        break;
      case 6:
        history.push('/blogs');
        break;
      case 7:
        history.push('/profile');
        break;
      case 'help':
        history.push('/help');
        break;
      default:
        break;
    }
  };

  const debouncedFn = useCallback(
    _.debounce((value) => {
      getPatientList(value);
    }, 300),
    []
  );

  const handleChange = (event) => {
    event.persist();
    setSearchString(event.target.value);
    debouncedFn(event.target.value);
  };

  const handleButtonClick = () => {
    if (searchString.trim() !== '') {
      dispatch(setActiveTab('1'));
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
            <i className="fas fa-search"></i>
            Search
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
            <Tiles tile={tile} tileClickHandler={() => handleTileClick(tile.id)} />
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

import React, { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "../../style/dashBoard/patientCard.css";
import {
  loadData,
  filterByDate,
  filterByFutureDate,
  filterByMissedDate,
  filterpendingappo,
  searchPatientSchedule,
} from "../../Actions/notifications";
import DashboardImg from "../../style/images/Icon material-dashboard.svg";
import ListImg from "../../style/images/Icon awesome-list.svg";
import ListCard from "./ListCard";
import GridCard from "./GridCard";
import { getUserIDFromIndexedDB } from "../../Actions/indexedDB";
import { getScheduleDetail } from "../../Actions/schedule";
import _ from "lodash";
import { setActiveTab } from "../../Actions/landingPage";

const PatientCard = ({
  appointmentDetail,
  filteredAppointments,
  loadData,
  filterByDate,
  filterByFutureDate,
  filterByMissedDate,
  getScheduleDetail,
  ScheduleData,
  searchPatientSchedule,
  setActiveTab
}) => {
  const [heading, setHeading] = useState("Appointments");
  const [listView, setListView] = useState(false);
  const [activeButton, setActiveButton] = useState("all");
  const [userID, setUserID] = useState(null);
  const [searchString, setSearchString] = useState("");
  const prevUserIDRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = await getUserIDFromIndexedDB();
        if (userID !== prevUserIDRef.current) {
          setUserID(userID);
          await getScheduleDetail(userID);
          await loadData({ userID: userID });
          prevUserIDRef.current = userID;
        }
      } catch (error) {
        console.error("Error loading schedule data:", error);
      }
    };

    fetchData();
  }, [loadData, getScheduleDetail]);

  const handleDashboardClick = () => {
    setListView(false);
  };

  const handleAttendNowClick = () => {
    setActiveTab('1');
  };

  const handleListClick = () => {
    setListView(true);
  };

  const handleFilterClick = (filterType) => {
    const date = new Date().toISOString().split("T")[0];
    switch (filterType) {
      case "all":
        setHeading("Appointments");
        setActiveButton("all");
        break;
      case "today":
        setHeading("Today's Appointments");
        filterByDate(appointmentDetail, date);
        setActiveButton("today");
        break;
      case "Upcoming":
        setHeading("Upcoming Appointments");
        filterByFutureDate(appointmentDetail, date);
        setActiveButton("Upcoming");
        break;
      case "missed":
        setHeading("Missed Appointments");
        filterByMissedDate(appointmentDetail, date);
        setActiveButton("missed");
        break;
      case "pending":
        setHeading("Pending Request Appointments");
        filterpendingappo(appointmentDetail, date);
        setActiveButton("pending");
        break;
      default:
        setHeading("Appointments");
        setActiveButton("all");
        break;
    }
  };

  const uniqueAppointments = appointmentDetail?.reduce((acc, current) => {
    const x = acc.find((item) => item.scheduleID === current.scheduleID);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const debouncedFn = useCallback(
    _.debounce((value) => {
      searchPatientSchedule(value);
    }, 300),
    [searchPatientSchedule]
  );

  const handleChange = (event) => {
    event.persist();
    setSearchString(event.target.value);
    debouncedFn(event.target.value);
  };

  const filterData =
    activeButton === "all"
      ? uniqueAppointments
      : filteredAppointments.length === 0 && activeButton === "all"
        ? uniqueAppointments
        : filteredAppointments;

  return (
    <div className="Card_container">
      <div className="heading_box">
        <h4>{heading}</h4>
      </div>
      <div className="Patient-Card-Main-Container">
        <div className="Paitent_filter">
          <Button
            value="all"
            variant="basic"
            className={`button-notification ${activeButton === "all" ? "active" : ""
              }`}
            style={{
              color: activeButton === "all" ? "white" : "#1E64CC",
              backgroundColor: activeButton === "all" ? "#1E64CC" : "white",
            }}
            onClick={() => handleFilterClick("all")}
          >
            All
          </Button>
          <Button
            value="today"
            variant="basic"
            className={`button-notification ${activeButton === "today" ? "active" : ""
              }`}
            style={{
              color: activeButton === "today" ? "white" : "#1E64CC",
              backgroundColor: activeButton === "today" ? "#1E64CC" : "white",
            }}
            onClick={() => handleFilterClick("today")}
          >
            Today's
          </Button>
          <Button
            value="Upcoming"
            variant="basic"
            className={`button-notification ${activeButton === "Upcoming" ? "active" : ""
              }`}
            style={{
              color: activeButton === "Upcoming" ? "white" : "#1E64CC",
              backgroundColor:
                activeButton === "Upcoming" ? "#1E64CC" : "white",
            }}
            onClick={() => handleFilterClick("Upcoming")}
          >
            Upcoming
          </Button>
          <Button
            value="missed"
            variant="basic"
            className={`button-notification ${activeButton === "missed" ? "active" : ""
              }`}
            style={{
              color: activeButton === "missed" ? "white" : "#1E64CC",
              backgroundColor: activeButton === "missed" ? "#1E64CC" : "white",
            }}
            onClick={() => handleFilterClick("missed")}
          >
            Missed
          </Button>
          <Button
            value="pending"
            variant="basic"
            className={`button-notification ${activeButton === "pending" ? "active" : ""
              }`}
            style={{
              color: activeButton === "pending" ? "white" : "#1E64CC",
              backgroundColor: activeButton === "pending" ? "#1E64CC" : "white",
            }}
            onClick={() => handleFilterClick("pending")}
          >
            Pending request
          </Button>
        </div>
        <div className="Patient-Card-Sub-Container2">
          <div>
            <img src={DashboardImg} onClick={handleDashboardClick} alt="" />
          </div>
          <div onClick={handleListClick}>
            <img src={ListImg} alt="" />
          </div>
        </div>
      </div>

      <div
        className={
          activeButton == "today"
            ? "Appoitment__search"
            : "Appoitment__search_none"
        }
      >
        <div className="Appoitment__search-bar">
          <button type="submit" id="SearchPatient-BTN">
            Search Patients
          </button>
          <input
            value={searchString}
            type="text"
            placeholder="Enter patient name to search patient"
            onChange={handleChange}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
            Search
          </button>
        </div>
      </div>

      {listView ? (
        <div className="list-view">
          <div>
            <ListCard
              handleAttendNowClick={handleAttendNowClick}
              filterData={
                activeButton === "today" &&
                  ScheduleData &&
                  ScheduleData.length > 0
                  ? ScheduleData
                  : filterData
              }
            />
          </div>
        </div>
      ) : (
        <div className="card-view">
          <div className="container-div">
            <GridCard
              handleAttendNowClick={handleAttendNowClick}
              filterData={
                activeButton === "today" &&
                  ScheduleData &&
                  ScheduleData.length > 0
                  ? ScheduleData
                  : filterData
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  appointmentDetail: state.appointmentDetail.appointmentDetail,
  filteredAppointments: state.appointmentDetail.filteredAppointments,
  ScheduleData: state.appointmentDetail.ScheduleData,
  searchText: state.appointmentDetail.searchText,
});

const mapDispatchToProps = {
  loadData,
  filterByDate,
  filterByFutureDate,
  filterByMissedDate,
  getScheduleDetail,
  filterpendingappo,
  searchPatientSchedule,
  setActiveTab
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientCard);


// export default connect(mapStateToProps, {
//   loadData,
//   filterByDate,
//   filterByFutureDate,
//   filterByMissedDate,
//   getScheduleDetail,
//   filterpendingappo,
//   searchPatientSchedule,
// })(PatientCard);

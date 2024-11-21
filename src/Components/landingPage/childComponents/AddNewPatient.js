import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { addAndLoadPatient, addNewPatientFlag } from "../../../Actions/consultation";
import "../../../style/dashBoard/addNewPatient.css";
import { getUserIDFromIndexedDB } from "../../../Actions/indexedDB";
import { setActiveTab } from "../../../Actions/landingPage";
import { setSelectedPatient } from "../../../Actions/consultation";
import * as Yup from "yup";

const AddNewPatient = ({ show, onHide, addAndLoadPatient, addNewPatientFlag, setActiveTab }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    sex: "",
    emailAddress: "",
    mobileNumber: "",
    age: ""
  });
  const userRef = useRef(null);
  const [userID, setUserID] = useState(null);
  const [useErrors, setUseErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const userID = await getUserIDFromIndexedDB();
        setUserID(userID);
      } catch (error) {
        console.error("Error fetching userID from IndexedDB:", error);
      }
    };
    fetchUserID();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setUseErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validationSchema = Yup.object().shape({
    patientName: Yup.string().required('Patient Name is required'),
    sex: Yup.string().required('Sex is required'),
    age: Yup.number()
      .required('Age is required')
      .typeError('Age must be a number')
      .positive('Age must be a positive number')
      .integer('Age must be an integer'),
    emailAddress: Yup.string().email('Invalid email format'),
    mobileNumber: Yup.string()
      .required('Mobile Number is required')
      .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
  });


  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const newPatient = await addAndLoadPatient({ ...formData, doctorId: userID });
      if (newPatient && newPatient.patientID) {
        dispatch(setActiveTab('1'));
        dispatch(setSelectedPatient(newPatient.patientID));
        console.log(newPatient, "newPatient");
      } else {
        console.error('New patient data is not available or does not have a patientID.');
      }
      onHide();
    } catch (error) {
      if (error.inner) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setUseErrors(errors);
      } else {
        console.error("Error adding new patient:", error);
      }
    }
  };

  const handleCancel = () => {
    onHide();
  };

  return (
    <Modal
      dialogClassName="custom-modal"
      show={show}
      onHide={handleCancel}
      centered
      style={{ zIndex: "1112" }}
    >
      <Modal.Header closeButton className="AddPatientHeader">
        <Modal.Title>
          <div className="np-patient-label">
            <label>Add New Patient</label>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="AddPatientBody">
        <div className="np-patient-name np-parentcontainer">
          <label className="np-label">Patient Name</label>
          <input
            value={formData.patientName}
            className="form-control"
            onChange={handleChange}
            name="patientName"
            placeholder="Patient Name"
            onClick={() => setUseErrors({ ...useErrors, patientName: "" })}
          />
          {useErrors.patientName && (
            <div className="error-message">{useErrors.patientName}</div>
          )}
        </div>
        <div className="np-gender-age np-parentcontainer">
          <div className="np-gender">
            <label className="np-label">Sex</label>
            <Select
              id="ap-sex-select"
              className="zenquip-select-gender"
              value={formData.sex}
              label="Sex"
              name="sex"
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    zIndex: 999999999999999,
                  },
                },
              }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Prefer Not to say"}>Prefer Not to say</MenuItem>
            </Select>
            {useErrors.sex && (
              <div className="error-message">{useErrors.sex}</div>
            )}
          </div>
          <div className="np-age">
            <label className="np-label">Age</label>
            <input
              className="form-control"
              onChange={handleChange}
              name="age"
              value={formData.age}
              placeholder="Age"
              onClick={() => setUseErrors({ ...useErrors, age: "" })}
            />
            {useErrors.age && (
              <div className="error-message">{useErrors.age}</div>
            )}
          </div>
        </div>
        <div className="np-mail-parent np-parentcontainer">
          <div className="np-mail-label">
            <label className="np-label">
              Email Address <span>(Optional)</span>
            </label>
          </div>
          <div className="np-mail-text">
            <div className="np-mail-input">
              <input
                value={formData.emailAddress}
                onChange={handleChange}
                className="form-control"
                name="emailAddress"
                placeholder="Enter email id"
              />
            </div>
          </div>
        </div>
        <div className="np-mail-parent">
          <div className="np-mail-label">
            <label className="np-label">Mobile</label>
            <span>Send Verification</span>
          </div>
          <div className="np-mail-text">
            <div className="np-mail-input">
              <input
                value={formData.mobileNumber}
                onChange={handleChange}
                className="form-control"
                name="mobileNumber"
                placeholder="Enter Mobile No"
                onClick={() => setUseErrors({ ...useErrors, mobileNumber: "" })}
              />
            </div>
            <div className="np-mail-otp">
              <input className="form-control" placeholder="Enter OTP" />
              <button className="AddPatientVerifyBTN">Verify</button>
            </div>
          </div>
          {useErrors.mobileNumber && (
            <div className="error-message">{useErrors.mobileNumber}</div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="AddPatientFooter" style={{ padding: "1.5rem" }}>
        <div className="np-buttonbar">
          <button className="button AddPatientBTN" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="button orange-button avg-button"
            onClick={handleSubmit}
          >
            Add New
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    addNewPatient: state.patientDetails.addNewPatient,
  };
};

const mapDispatchToProps = {
  addAndLoadPatient,
  addNewPatientFlag,
  setActiveTab,
  setSelectedPatient
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPatient);

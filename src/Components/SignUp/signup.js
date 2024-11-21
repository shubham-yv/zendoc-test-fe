import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createDoctor } from "../../Actions/authentication";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({ createDoctor }) => {
  const history = useHistory();

  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [typing, setTyping] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    userPassword: "",
    mobileNumber: "",
    confirmPassword: "",
    prefferedName: "",
    salutation: "",
    agreement: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errors, setErrors] = useState({
    signupError: "",
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    prefferedName: Yup.string().required("Please enter your preferred Name"),
    emailAddress: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
      .required("Please enter your mobile number"),
    userPassword: Yup.string().required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("userPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
    agreement: Yup.boolean()
      .oneOf([true], "Please agree to the terms and conditions")
      .required(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const toggleConfirmPasswordVisibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  const handleChangeCheckbox = (event) => {
    const { name, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const signupHandler = async () => {
    if (
      !lowerValidated ||
      !upperValidated ||
      !numberValidated ||
      !specialValidated ||
      !lengthValidated
    ) {
      setErrors({
        signupError: "Please ensure the password meets all the requirements.",
      });
      return;
    }

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      toast.success("Signup successful!");
      createDoctor(formData, history, setErrors);
    } catch (error) {
      const fieldErrors = {};
      error.inner.forEach((err) => {
        fieldErrors[err.path] = err.message;
      });
      setErrors({ ...fieldErrors });
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;

    setTyping(true);

    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));

    if (typeof value === "string" && value.trim() !== "") {
      setTyping(true);
    } else {
      setTyping(false);
    }
  };

  const handlePasswordInputChange = (event) => {
    const { value } = event.target;
    setPasswordValue(value);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  return (
    <div className="sign-up-container">
      <ToastContainer />
      <div className="sign-up-controls">
        <div className="lp-parent-container-image-parent">
          <div className="lp-parent-container-image"></div>
          <div className="lp-parent-container-image-text">ZenDoc</div>
        </div>
        <div className="lp-parent-container-choose">
          <span className="label-signin">
            Please complete to create your account
          </span>
        </div>

        <div className="Signup-Salutation">
          <div>
            <select
              id="salutation"
              value={formData.salutation}
              className="form-control"
              name="salutation"
              onChange={handleChange}
              style={{ width: "auto", padding: 0 }}
            >
              <option value={0}></option>
              <option value={1}>Dr</option>
              <option value={2}>Mr</option>
              <option value={3}>Mrs</option>
            </select>
          </div>
          <div className="lp-parent-container_pass">
            <div className="ui transparent input">
              <input
                onChange={handleChange}
                className="form-control"
                onClick={() => setErrors({ ...errors, prefferedName: "" })}
                name="prefferedName"
                value={formData.prefferedName}
                type="text"
                placeholder="Enter Your Preferred Name Here"
              />
            </div>
          </div>
        </div>
        {errors.prefferedName && (
          <div className="error-message">{errors.prefferedName}</div>
        )}

        <div className="lp-parent-container_pass">
          <div className="ui transparent input d-flex align-items-center">
            <input
              onChange={handleChange}
              className="form-control"
              onClick={() => setErrors({ ...errors, firstName: "" })}
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
            />
          </div>
        </div>
        {errors.firstName && (
          <div className="error-message">{errors.firstName}</div>
        )}

        <div className="lp-parent-container_pass">
          <div className="ui transparent input d-flex align-items-center">
            <input
              onChange={handleChange}
              className="form-control"
              onClick={() => setErrors({ ...errors, lastName: "" })}
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
            />
          </div>
        </div>
        {errors.lastName && (
          <div className="error-message">{errors.lastName}</div>
        )}

        <div className="lp-parent-container_pass">
          <div className="ui transparent input">
            <input
              onChange={handleChange}
              className="form-control"
              onClick={() => setErrors({ ...errors, emailAddress: "" })}
              name="emailAddress"
              value={formData.emailAddress}
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        {errors.emailAddress && (
          <div className="error-message">{errors.emailAddress}</div>
        )}

        <div className="lp-parent-container_pass">
          <div className="ui transparent input">
            <input
              onChange={handleChange}
              className="form-control"
              name="mobileNumber"
              value={formData.mobileNumber}
              type="number"
              placeholder="Mobile Number"
              onClick={() => setErrors({ ...errors, mobileNumber: "" })}
            />
          </div>
        </div>
        {errors.mobileNumber && (
          <div className="error-message">{errors.mobileNumber}</div>
        )}

        <div className="lp-parent-container_pass">
          <div className="ui transparent input d-flex align-items-center">
            <input
              className="form-control"
              onChange={(e) => {
                handleChange(e);
                handlePasswordInputChange(e);
                handlePasswordChange(e);
              }}
              onClick={() => setErrors({ ...errors, userPassword: "" })}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              name="userPassword"
              value={passwordValue}
              type={formData.showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span className="Sign-in-span">
              {passwordValue ? (
                <i
                  className={`eye-icon fas ${formData.showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  onClick={togglePasswordVisibility}
                ></i>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
        {errors.userPassword && (
          <div className="error-message">{errors.userPassword}</div>
        )}

        <main
          className={
            typing && passwordFocused ? "tracker-box show" : "tracker-box"
          }
        >
          <div className={lowerValidated ? "validated" : "not-validated"}>
            {lowerValidated ? (
              <span className="list-icon green">&#10003;</span>
            ) : (
              <span className="list-icon">&#9888;</span>
            )}
            At least one lowercase letter
          </div>
          <div className={upperValidated ? "validated" : "not-validated"}>
            {upperValidated ? (
              <span className="list-icon green">&#10003;</span>
            ) : (
              <span className="list-icon">&#9888;</span>
            )}
            At least one uppercase letter
          </div>
          <div className={numberValidated ? "validated" : "not-validated"}>
            {numberValidated ? (
              <span className="list-icon green">&#10003;</span>
            ) : (
              <span className="list-icon">&#9888;</span>
            )}
            At least one number
          </div>
          <div className={specialValidated ? "validated" : "not-validated"}>
            {specialValidated ? (
              <span className="list-icon green">&#10003;</span>
            ) : (
              <span className="list-icon">&#9888;</span>
            )}
            At least one special character
          </div>
          <div className={lengthValidated ? "validated" : "not-validated"}>
            {lengthValidated ? (
              <span className="list-icon green">&#10003;</span>
            ) : (
              <span className="list-icon">&#9888;</span>
            )}
            At least 8 characters
          </div>
          <div className="password-length-indicator">
            <span>Characters entered: {passwordValue.length}</span>
          </div>
        </main>

        <div className="lp-parent-container_pass">
          <div className="ui transparent input d-flex align-items-center">
            <input
              className="form-control"
              onChange={handleChange}
              onClick={() => setErrors({ ...errors, confirmPassword: "" })}
              name="confirmPassword"
              value={formData.confirmPassword}
              type={formData.showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <span className="Sign-in-span">
              {formData.confirmPassword ? (
                <i
                  className={`eye-icon fas ${formData.showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  onClick={toggleConfirmPasswordVisibility}
                ></i>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
        {errors.confirmPassword && (
          <div className="error-message">{errors.confirmPassword}</div>
        )}

        <div className="lp-parent-container-terms">
          <input
            name="agreement"
            checked={formData.agreement}
            id="signupCheck"
            type="checkbox"
            onChange={handleChangeCheckbox}
            onClick={() => setErrors({ ...errors, agreement: "" })}
          />
          <label
            htmlFor="signupCheck"
            style={{ marginTop: "12px" }}
            className="label-basic gray-label-medium"
          >
            I agree with terms and conditions
          </label>
        </div>
        {errors.agreement && (
          <div className="error-message">{errors.agreement}</div>
        )}

        {errors.signupError && (
          <div className="error-message">{errors.signupError}</div>
        )}

        <div className="lp-parent-container-signup">
          <div className="no-border-center">
            <input
              onClick={signupHandler}
              className="avg-button no-border-btn btn--border-radius pa-btn ui button mini btn--padding-lr"
              type="button"
              value="Sign up"
            />
          </div>
          <div className="link-to-login-parent">
            <span className="link-to-login">Already have an account?</span>
            <Link to="/">
              <span className="link-to-login">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createDoctor })(SignUp);

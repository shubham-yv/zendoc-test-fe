import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { login } from "../../Actions/authentication";
import { Datacontext } from "../../Context/DataProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ login }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    loginError: "",
  });

  const { completeProfilePercenrtage } = useContext(Datacontext);
  const history = useHistory();
  const location = useLocation();
  const { username, password, showPassword } = formData;

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message);
      history.replace({ state: {} });
    }
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const loginHandler = () => {
    if (validateForm()) {
      login(formData, history, setErrors, completeProfilePercenrtage);
    }
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !showPassword,
    });
  };

  const validateForm = () => {
    let valid = true;
    const emailOrMobileRegex =
      /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)$/;

    if (!username || !emailOrMobileRegex.test(username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Please enter correct credentials",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "",
      }));
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Please enter your password",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
    }
    return valid;
  };

  return (
    <div className="sign-up-container">
      <ToastContainer />
      <div className="sign-up-controls">
        <div className="lp-parent-container-image-parent">
          <div className="lp-parent-container-image fas fa-head-side-virus"></div>
          <div className="lp-parent-container-image-text">ZenDoc</div>
        </div>
        <div className="lp-parent-container-choose">
          <span className="label-signin">
            Welcome Back! Please login to your account
          </span>
        </div>

        <div>
          <div className="ui transparent input">
            <input
              name="username"
              className="form-control"
              type="text"
              onChange={handleChange}
              value={username}
              placeholder="Enter your email or mobile number"
              onClick={() => setErrors({ ...errors, emailError: "" })}
            />
          </div>
        </div>
        {errors.emailError && (
          <div className="error-message" style={{ color: "red" }}>
            {errors.emailError}
          </div>
        )}

        <div className="lp-parent-container_pass">
          <div className="ui transparent input d-flex align-items-center">
            <input
              name="password"
              className="form-control"
              onChange={handleChange}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onClick={() =>
                setErrors({ ...errors, passwordError: "", loginError: "" })
              }
            />
            <span className="Sign-in-span">
              {password ? (
                <i
                  className={`eye-icon fas ${showPassword ? "fa-eye " : "fa-eye-slash"
                    }`}
                  onClick={togglePasswordVisibility}
                ></i>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
        {errors.passwordError && (
          <div className="error-message" style={{ color: "red" }}>
            {errors.passwordError}
          </div>
        )}
        {errors.loginError && (
          <div className="error-message" style={{ color: "red" }}>
            {errors.loginError}
          </div>
        )}

        <div className="lp-remPass-container">
          <div className="ui transparent">
            <input id="remember" type="checkbox" />
            <label
              className="label-basic gray-label-medium"
              htmlFor="remember"
              style={{ marginTop: "12px" }}
            >
              Remember Me
            </label>
          </div>
          <Link to="forgot">
            <label
              className="label-basic gray-label-medium"
              style={{ marginTop: "12px" }}
            >
              Forgot Password ?
            </label>
          </Link>
        </div>
        <div className="lp-parent-container-signup">
          <div className="no-border">
            <input
              onClick={loginHandler}
              className="login-button"
              type="button"
              value="Login"
            />
            <Link to="/signup">
              <input className="signup-button" type="button" value="Sign up" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { login })(SignIn);

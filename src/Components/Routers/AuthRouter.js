import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({ component: Comp, authed , ...rest }) => {
    //const Comp = props.component;
    return (
      <Route
      {...rest}
      render={(props) => authed === true
        ? <Comp {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />)
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(AuthRoute);

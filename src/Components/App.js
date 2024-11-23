import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from '../Reducers';
import PrivateRoute from '../Context/AuthContext';
import DataProvider from '../Context/DataProvider';

// Import your components
import LandingPageContainer from './landingPage';
import SignUp from './SignUp';
import Auth from './Authentication';
import ForgotPasswordPage from './ForgotPassword/ForgotPassowrdPage';
import Onboard from './Onboard/Onboard';
import LandingPage from './landingPage/landingPage-view';
import Consultation from './Consultation';
import Schedule from './Schedule';
import ManagePatients from './ManagePatients';
import Notification from './Notifications';
import DrugTool from './Tools/DrugTool';
import Blog from './Blog/Blog';
import Setting from './Settings';
import Help from './Help/help';
import ConsultationView from './Consultation/consultation-view';

const store = createStore(combineReducers, applyMiddleware(thunk));

const App = () => {
    return (
        <Provider store={store}>
            <DataProvider>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Auth} />
                        <Route path="/signup" exact component={SignUp} />
                        <Route path="/forgot" exact component={ForgotPasswordPage} />
                        <PrivateRoute path="/onboard" exact component={Onboard} />
                        <PrivateRoute path="/dashboard" exact component={LandingPage} />
                        <PrivateRoute path="/consultation">
                            <LandingPageContainer>
                                <Consultation />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <PrivateRoute path="/schedule">
                            <LandingPageContainer>
                                <Schedule />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <PrivateRoute path="/managepatients">
                            <LandingPageContainer>
                                <ManagePatients />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <PrivateRoute path="/notification">
                            <LandingPageContainer>
                                <Notification />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <PrivateRoute path="/drugtool">
                            <LandingPageContainer>
                                <DrugTool />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <PrivateRoute path="/blog">
                            <LandingPageContainer>
                                <Blog />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <PrivateRoute path="/setting">
                            <LandingPageContainer>
                                <Setting />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <PrivateRoute path="/help">
                            <LandingPageContainer>
                                <Help />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <PrivateRoute path="/patient/:patientID">
                            <LandingPageContainer>
                                <ConsultationView />
                            </LandingPageContainer>
                        </PrivateRoute>

                        <Redirect to="/" />
                    </Switch>
                </Router>
            </DataProvider>
        </Provider>
    );
};

export default App;

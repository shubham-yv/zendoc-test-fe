// import React, { useEffect, useState } from 'react';
// import { StrictMode } from 'react';
// import ReactDOM from "react-dom";
// import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import combineReducers from '../Reducers';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { Provider } from 'react-redux';

// /* In App Imports */
// import Auth from './Authentication';
// import LandingPageContainer from './landingPage';
// import SignUp from './SignUp';
// import AuthRouter from './Routers/AuthRouter';
// import Notifications from './Notifications';
// // import LeftMenu from './LeftMenu';

// import '../style/consultation/patientinfo-view.css';
// import ForgotPassowrdPage from './ForgotPassword/ForgotPassowrdPage';
// import Onboard from './Onboard/Onboard';
// import DataProvider from '../Context/DataProvider';
// import { checkTokenExists } from '../Actions/indexedDB';

// const App = () => {
//     const store = createStore(combineReducers, applyMiddleware(thunk));
//     const [isTokenChecked, setIsTokenChecked] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const checkToken = async () => {
//             const tokenExists = await checkTokenExists();
//             if (!tokenExists) {
//                 setIsAuthenticated(false);
//                 setIsTokenChecked(true); // Token check is complete
//             } else {
//                 setIsAuthenticated(true);
//                 setIsTokenChecked(true); // Token check is complete
//             }
//         };
//         checkToken();
//     }, []);

//     if (!isTokenChecked) {
//         return null; // Or you can show a loading spinner
//     }

//     return (
//         <Provider store={store}>
//             <DataProvider>
//                 <Router>
//                     <div className='app-container'>
//                         <Switch>
//                             <Route path='/' exact component={Auth} />
//                             <Route path='/signup' exact component={SignUp} />
//                             <Route path='/forgot' exact component={ForgotPassowrdPage} />

//                             <Route path='/dashboard' exact>
//                                 {isAuthenticated ? <LandingPageContainer /> : <Redirect to="/" />}
//                             </Route>
//                             <Route path='/onboard' exact>
//                                 {isAuthenticated ? <Onboard /> : <Redirect to="/" />}
//                             </Route>

//                             <Redirect to="/" />
//                         </Switch>
//                     </div>
//                 </Router>
//             </DataProvider>
//         </Provider>
//     );
// }

// export default App;

// import React from 'react';
// import { StrictMode } from 'react';
// import ReactDOM from "react-dom";
// import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import combineReducers from '../Reducers';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { Provider } from 'react-redux';

// /* In App Imports */
// import Auth from './Authentication';
// import LandingPageContainer from './landingPage';
// import SignUp from './SignUp';
// import AuthRouter from './Routers/AuthRouter';
// import Notifications from './Notifications';
// import PrivateRoute from '../Context/AuthContext';
// // import LeftMenu from './LeftMenu';

// import '../style/consultation/patientinfo-view.css';
// import ForgotPassowrdPage from './ForgotPassword/ForgotPassowrdPage';
// import Onboard from './Onboard/Onboard';
// import DataProvider from '../Context/DataProvider';

// const store = createStore(combineReducers, applyMiddleware(thunk));

// const App = () => {
//     return (
//         <Provider store={store}>
//             <DataProvider>
//                 <Router>
//                     <div className='app-container'>
//                         <Switch>
//                             <Route path='/' exact component={Auth} />
//                             <Route path='/signup' exact component={SignUp} />
//                             <Route path='/forgot' exact component={ForgotPassowrdPage} />
//                             {/* <Route path='/dashboard' exact component={LandingPageContainer} /> */}
//                             <PrivateRoute path="/dashboard" exact component={LandingPageContainer} />
//                             <PrivateRoute path="/onboard" exact component={Onboard} />
//                             {/* <Route path='/onboard' exact component={Onboard} /> */}
//                             <Redirect to="/" />
//                         </Switch>
//                     </div>
//                 </Router>
//             </DataProvider>
//         </Provider>
//     );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from '../Reducers';
import PrivateRoute from '../Context/AuthContext';
import LandingPageContainer from './landingPage';
import SignUp from './SignUp';
import Auth from './Authentication';
import ForgotPasswordPage from './ForgotPassword/ForgotPassowrdPage';
import Onboard from './Onboard/Onboard';
import DataProvider from '../Context/DataProvider';

const store = createStore(combineReducers, applyMiddleware(thunk));

const App = () => {
    return (
        <Provider store={store}>
            <DataProvider>
                <Router>
                    <div className="app-container">
                        <Switch>
                            <Route path="/" exact component={Auth} />
                            <Route path="/signup" exact component={SignUp} />
                            <Route path="/forgot" exact component={ForgotPasswordPage} />
                            <PrivateRoute path="/onboard" exact component={Onboard} />
                            <PrivateRoute path="/dashboard" exact component={LandingPageContainer} />
                            <PrivateRoute path="/:activeTab" exact component={LandingPageContainer} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </Router>
            </DataProvider>
        </Provider>
    );
};

export default App;

/* External Imports */
import { combineReducers } from 'redux';

/* In App Imports */
import login from './login';
import messages from './messages';
import patientDetails from './patienDetails'
import appointmentDetail from './reducerNotifications';
import activetab from './activetabreducer';
import managePatient from './managePatient';
import schedular from './schedular';
import toolsreducer from './toolsreducer';
import Setting from './setting'
import activityTracker from './activityTracker'

export default combineReducers({
    login,
    messages,
    patientDetails,
    appointmentDetail,
    activetab,
    managePatient,
    schedular,
    toolsreducer,
    Setting,
    activityTracker
});
import React from "react";
import Consultation from '../../Consultation';
import Schedule from "../../Schedule";
import ManagePatients from "../../ManagePatients";
import DrugTool from "../../Tools/DrugTool";
import Blog from "../../Blog/Blog";
import Setting from "../../Settings/index";
import AddPrescription from "../../Consultation/ChildComponents/DrugPrescription/addPrescriptoin-view";
import Notifications from "../../Notifications";
import Help from "../../Help/help";

const LoadComponentPage = ({ route }) => {
    const routeToComponent = {
        '/schedule-calender': <Schedule />,
        '/manage-patients': <ManagePatients />,
        '/notifications': <Notifications />,
        '/tools': <DrugTool />,
        '/blogs': <Blog />,
        '/profile': <Setting />,
        '/consultation': <Consultation />,
        '/help': <Help />,
        'addPrescription': <AddPrescription />
    };

    return routeToComponent[route] || <div></div>;
};

export default LoadComponentPage;


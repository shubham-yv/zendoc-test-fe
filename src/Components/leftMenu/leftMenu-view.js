import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../../style/landingPage/leftMenu.css';

const LeftMenu = ({ menuItemClickHandler, activeTab }) => {
    const history = useHistory();

    useEffect(() => {
        // You could use this effect to handle any side-effects if needed
    }, [activeTab]);

    const handleMenuItemClick = (event) => {
        const name = event.currentTarget.getAttribute('data-name');
        if (menuItemClickHandler) {
            menuItemClickHandler(name);
        }

        const routeMapping = {
            '': '/dashboard',
            '2': '/schedule',
            '3': '/managepatients',
            '4': '/notification',
            '5': '/drugtool',
            '6': '/blog',
            '7': '/setting',
            'help': '/help',
        };

        const route = routeMapping[name];
        if (route) {
            history.push(route);
        }
    };

    return (
        <div className="left-menu">
            <div className="left-menu-icon-container">
                <div
                    data-name=""
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--home ${activeTab === '' ? 'active' : ''}`}
                >
                    <div className="left-menu-item-text">Home</div>
                </div>
                <div
                    data-name="2"
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--schedule ${activeTab === '2' ? 'active' : ''}`}
                >
                    <div className="left-menu-item-text">Schedule</div>
                </div>
                <div
                    data-name="3"
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--patients ${activeTab === '3' ? 'active' : ''}`}
                >
                    <div className="left-menu-item-text">Patients</div>
                </div>
                <div
                    data-name="4"
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--Appointments ${activeTab === '4' ? 'active' : ''}`}
                >
                    <div className="left-menu-item-text">Appointments</div>
                </div>
                <div
                    data-name="5"
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--Tools ${activeTab === '5' ? 'active' : ''}`}
                >
                    <div className="left-menu-item-text">Tools</div>
                </div>
                <div
                    data-name="6"
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--blog ${activeTab === '6' ? 'active' : ''}`}
                >
                    <div className="left-menu-item-text">Blog</div>
                </div>
                <div
                    data-name="7"
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--settings ${activeTab === '7' ? 'active' : ''}`}
                >
                    <div className="left-menu-item-text">Settings</div>
                </div>
            </div>
            <div
                data-name="help"
                onClick={handleMenuItemClick}
                className={`left-menu__item left-menu__item--help ${activeTab === 'help' ? 'active' : ''}`}
            >
                <div className="left-menu-item-text">Help</div>
            </div>
        </div>
    );
};

export default LeftMenu;

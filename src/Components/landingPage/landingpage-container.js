import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeftMenu from '../leftMenu/leftMenu-view';
import Header from '../header/header-view';

const LandingPageContainer = ({ children }) => {
    const [activeTab, setActiveTab] = useState('');
    const location = useLocation();

    useEffect(() => {
        const routeMapping = {
            '/dashboard': '',
            '/schedule': '2',
            '/managepatients': '3',
            '/notification': '4',
            '/drugtool': '5',
            '/blog': '6',
            '/setting': '7',
            '/help': 'help',
        };
        setActiveTab(routeMapping[location.pathname] || '');
    }, [location.pathname]);

    const handleMenuItemClick = (menuItem) => {
        setActiveTab(menuItem);
    };

    return (
        <div className='component-container'>
            <div className="component-header">
                <Header />
            </div>
            <div className="component-body">
                <LeftMenu
                    menuItemClickHandler={handleMenuItemClick}
                    activeTab={activeTab}
                />
                <div className='component-page-container'>
                    <div>
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LandingPageContainer;

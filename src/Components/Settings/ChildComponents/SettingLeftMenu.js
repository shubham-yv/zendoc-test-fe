import React, { useState } from 'react';
import '../../../style/Settings/Settting.css';
import ProfileIcon from '../../../style/images/ProfileIcon.svg';
import SettingsIcon from '../../../style/images/SettingsIcon.svg';
import PaymentIcon from '../../../style/images/PaymentIcon.svg';

const SettingLeftMenu = ({ activeComponent, setActiveComponent }) => {
    const [hoveredComponent, setHoveredComponent] = useState(null);

    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };

    const handleMouseEnter = (component) => {
        setHoveredComponent(component);
    };

    const handleMouseLeave = () => {
        setHoveredComponent(null);
    };

    return (
        <div className="sub-left-menu">
            <div
                className={`menu-item ${activeComponent === 'profile' ? 'active' : ''}`}
                onClick={() => handleMenuClick('profile')}
                onMouseEnter={() => handleMouseEnter('profile')}
                onMouseLeave={handleMouseLeave}
            >
                <img src={ProfileIcon} alt="" />
                Profile
            </div>
            <div
                className={`menu-item ${activeComponent === 'general-settings' ? 'active' : ''}`}
                onClick={() => handleMenuClick('general-settings')}
                onMouseEnter={() => handleMouseEnter('general-settings')}
                onMouseLeave={handleMouseLeave}
            >
                <img src={SettingsIcon} alt="" />
                General Settings
            </div>
            <div
                className={`menu-item ${activeComponent === 'payment-settings' ? 'active' : ''}`}
                onClick={() => handleMenuClick('payment-settings')}
                onMouseEnter={() => handleMouseEnter('payment-settings')}
                onMouseLeave={handleMouseLeave}
            >
                <img src={PaymentIcon} alt="" />
                Payment Settings
            </div>
        </div>
    );
};

export default SettingLeftMenu;

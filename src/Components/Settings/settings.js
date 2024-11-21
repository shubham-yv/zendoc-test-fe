import React, { useState } from 'react';
import '../../style/Settings/Settting.css'
import ProfileComponent from './ChildComponents/Profile';
import GeneralSettingsComponent from './ChildComponents/GeneralSettings';
import PaymentSettingsComponent from './ChildComponents/PaymentSettings';
import SettingLeftMenu from './ChildComponents/SettingLeftMenu';

const Setting = () => {
    const [activeComponent, setActiveComponent] = useState('profile');

    return (
        <div className="settings-container">
            <SettingLeftMenu activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            <div className="main-content">
                {activeComponent === 'profile' && <ProfileComponent />}
                {activeComponent === 'general-settings' && <GeneralSettingsComponent />}
                {activeComponent === 'payment-settings' && <PaymentSettingsComponent />}
            </div>
        </div>
    );
};

export default Setting;

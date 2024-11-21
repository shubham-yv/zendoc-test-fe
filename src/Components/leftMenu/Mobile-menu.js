import React from 'react';
import '../../style/landingPage/leftMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const MobileMenu = ({ menuItemClickHandler, activeTab, closeMenu, userIconInitials, selectedSalutation, preferredName, handleLogout }) => {
    const handleMenuItemClick = (event) => {
        const name = event.currentTarget.getAttribute('data-name');
        menuItemClickHandler(name);
        closeMenu();
    };

    return (
        <div className='mobile-menu'>
            <div className='mobile-user-info'>
                <div className='header__user-icon'>{userIconInitials}</div>
                <div className='header__user-name'>
                    <a href="#" className='header__user-name_a'>{selectedSalutation}. {preferredName}</a>
                </div>

                <span className='Mobile-Dropdown'>
                    <span style={{ color: '#0e58c7', transform: 'rotate(180deg)' }}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </span>
                    <button onClick={handleLogout}>Logout</button>
                </span>

            </div>
            <div className='mobile-menu-item' data-name='' onClick={handleMenuItemClick}>Home</div>
            <div className='mobile-menu-item' data-name='2' onClick={handleMenuItemClick}>Schedule</div>
            <div className='mobile-menu-item' data-name='3' onClick={handleMenuItemClick}>Patients</div>
            <div className='mobile-menu-item' data-name='4' onClick={handleMenuItemClick}>Appointments</div>
            <div className='mobile-menu-item' data-name='5' onClick={handleMenuItemClick}>Tools</div>
            <div className='mobile-menu-item' data-name='6' onClick={handleMenuItemClick}>Blog</div>
            <div className='mobile-menu-item' data-name='7' onClick={handleMenuItemClick}>Settings</div>
            <div className='mobile-menu-item-help' data-name='help' onClick={handleMenuItemClick}>Help</div>
        </div>
    );
};

export default MobileMenu;

import React, { useEffect, useState } from 'react';
import '../../style/landingPage/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faAngleDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Logout } from '../../Actions/authentication';
import { connect } from 'react-redux';
import { getAllDataFromIndexedDB } from '../../Actions/indexedDB';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MobileMenu from '../leftMenu/Mobile-menu';

function Header({ menuItemClickHandler, activeTab }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    prefferedName: '',
    salutation: ''
  });
  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      try {
        const dataFromIndexedDB = await getAllDataFromIndexedDB();
        if (isMounted) {
          setUserData({
            ...userData,
            prefferedName: dataFromIndexedDB.prefferedName || '',
            salutation: dataFromIndexedDB.salutation || '',
            firstName: dataFromIndexedDB.firstName || '',
            lastName: dataFromIndexedDB.lastName || '',
          });
        }
      } catch (error) {
        console.error("Error fetching data from IndexedDB:", error);
      }
    };

    fetchData();

    // Cleanup function to run when the component unmounts
    return () => {
      isMounted = false; // Update the flag to indicate unmounting
    };
  }, []);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const history = useHistory();

  const handleLogout = () => {
    Logout(history);
  };

  const salutationOptions = [
    { value: 1, name: 'Dr' },
    { value: 2, name: 'Mr' },
    { value: 3, name: 'Mrs' },
  ];

  const selectedSalutation = salutationOptions.find(option => option.value === parseInt(userData.salutation));

  const firstNameInitial = userData.firstName ? userData.firstName.charAt(0).toUpperCase() : '';
  const lastNameInitial = userData.lastName ? userData.lastName.charAt(0).toUpperCase() : '';

  const userIconInitials = firstNameInitial + lastNameInitial;

  return (
    <div className={`header ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className='header__image fas fa-head-side-virus'></div>
      <div className='header__text'>ZenDoc</div>
      <div className='header__icons'>
        {!mobileMenuOpen && (
          <>
            <div className='header__user-icon'>{userIconInitials}</div>
            <div className='header__user-name' onClick={toggleDropdown}>
              <a href="#" className='header__user-name_a'>{selectedSalutation?.name}. {userData.prefferedName} </a>
              <span style={{ marginLeft: '8px', color: '#0e58c7' }}>
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#0e58c7', transform: 'rotate(180deg)' }}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </span>
                    <button onClick={handleLogout}>Logout</button>
                  </span>
                </div>
              )}
            </div>
          </>
        )}
        <span onClick={toggleMobileMenu} className='Mobile-Icon'>
          {mobileMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </span>
        <div className='header__notification-icon'>
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
      {mobileMenuOpen && (
        <MobileMenu
          menuItemClickHandler={menuItemClickHandler}
          activeTab={activeTab}
          closeMenu={closeMobileMenu}
          userIconInitials={userIconInitials}
          selectedSalutation={selectedSalutation?.name}
          preferredName={userData.prefferedName}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}

const mapStatetoProps = (state) => {
  const docDetails = state.login && state.login.doctorDetails;
  return {
    docDetails: docDetails ? docDetails : null
  };
};

export default connect(mapStatetoProps)(Header);

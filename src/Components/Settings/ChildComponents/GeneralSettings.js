import React, { useState, useEffect } from 'react';
import Save from '../../../style/images/Save.svg';
import Reset from '../../../style/images/Reset.svg';
import '../../../style/Settings/GeneralSetting.css';
import GeneralSettingForm from './GeneralSettingFrom';
import GeneralSettingAccounts from './GeneralSettingAccounts';
import { getProfileDetails } from '../../../Actions/Settings';
import { connect } from 'react-redux';

const GeneralSettingsComponent = ({ getProfileDetails, ProfileDetails }) => {
  const [ProfileDetailsState, setProfileDetails] = useState("");

  useEffect(() => {
    if (ProfileDetails) {
      setProfileDetails(ProfileDetails);
    }
  }, [ProfileDetails]);

  return (
    <>
      <div className="GeneralSettingContainer">
        <div className="GeneralSetting">

          <div className='GeneralHeadingContainer'>
            <h5 className="GeneralSettingHead"><b>Accounts details</b></h5>
          </div>

          <div className='GeneralSettingBTNContainer'>
            <button>
              <img src={Reset} alt="Reset-BTN-IMG" className='GeneralSettingBTNContainerimg' />
              Reset
            </button>
            <button>
              <img src={Save} alt="Save-BTN-IMG" className='GeneralSettingBTNContainerimg' />
              Save
            </button>
          </div>
        </div>
        <hr />
        <GeneralSettingForm ProfileDetails={ProfileDetailsState} />
        {/* <GeneralSettingAccounts /> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  ProfileDetails: state.Setting.ProfileDetails
});

export default connect(mapStateToProps, {
  getProfileDetails
})(GeneralSettingsComponent);

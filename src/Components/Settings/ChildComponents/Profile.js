import React, { useState, useEffect } from 'react';
import ProfileIMG from '../../../style/images/profile-mid.svg';
import DegreeIcon from '../../../style/images/Degree.svg';
import ExperienceIcon from '../../../style/images/Experience.svg';
import '../../../style/Settings/Profile.css';
import EditIcon from '../../../style/images/Edit.svg';
import Education from './Education';
import Experience from './Experience';
import Specialized from './Specialized';
import EditContainer from './ProfileEditContainer';
import { connect } from 'react-redux';
import { getProfileDetails } from '../../../Actions/Settings';
import { getAllDataFromIndexedDB, getUserIDFromIndexedDB } from '../../../Actions/indexedDB';

const ProfileComponent = ({ getProfileDetails, ProfileDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    prefferedName: '',
    salutation: ''
  });
  const [userID, setUserID] = useState('');
  const [bio, setBio] = useState('Please Edit The Page To Enter Your Bio');

  const salutationOptions = [
    { value: 1, name: 'Dr' },
    { value: 2, name: 'Mr' },
    { value: 3, name: 'Mrs' },
  ];

  const selectedSalutation = salutationOptions.find(option => option.value === parseInt(userData.salutation));

  useEffect(() => {
    getProfileDetails();
  }, [getProfileDetails]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUserID = async () => {
      try {
        const userId = await getUserIDFromIndexedDB();
        if (isMounted) {
          setUserID(userId);
          const userProfile = ProfileDetails.find(profile => profile.userId === userId);
          if (userProfile) {
            setBio(userProfile.bio || '');
          }
        }
      } catch (error) {
        console.error("Error fetching userID from IndexedDB:", error);
      }
    };

    fetchUserID();

    return () => {
      isMounted = false;
    };
  }, [ProfileDetails]);


  useEffect(() => {
    const bioFromStorage = localStorage.getItem(`bio_${userID}`) || 'Please Edit The Page To Enter Your Bio';
    setBio(bioFromStorage);
  }, [userID]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromIndexedDB = await getAllDataFromIndexedDB();
        if (dataFromIndexedDB) {
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
  }, []);

  if (isEditing) {
    return <EditContainer bio={bio} setBio={setBio} userID={userID} />;
  } else {
    const educationArray = ProfileDetails.education ? ProfileDetails.education.split(',') : [];
    const experienceArray = ProfileDetails.experienceInYears ? ProfileDetails.experienceInYears.split(',') : [];
    const specializedArray = ProfileDetails.specialization ? ProfileDetails.specialization.split(',') : [];

    return (
      <>
        <div className="profile-Container">
          <div className='Edit-Container' onClick={handleEditClick}>
            <img src={EditIcon} alt="Edit" />
            <h5>Edit</h5>
          </div>
          <div className="Profie-Sub-Container">
            <div className="ProfileIMG">
              <img src={ProfileIMG} alt="Profile" />
            </div>
            <h5>{selectedSalutation?.name}. {userData.prefferedName}</h5>
          </div>
        </div>
        {isEditing ? (
          <EditContainer bio={bio} setBio={setBio} />
        ) : (
          <div className='Profile-Description'>
            <h5>Bio</h5>
            <p>{bio}</p>
          </div>
        )}
        <Education educationArray={educationArray} />
        <Experience experienceArray={experienceArray} />
        <Specialized specializedArray={specializedArray} />
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  ProfileDetails: state.Setting.ProfileDetails
});

export default connect(mapStateToProps, {
  getProfileDetails
})(ProfileComponent);

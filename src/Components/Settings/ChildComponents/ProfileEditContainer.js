import React from 'react';
import EditIcon from '../../../style/images/Edit.svg';
import ProfileIMG from '../../../style/images/profile-mid.svg';
import Reset from '../../../style/images/Reset.svg';
import Save from '../../../style/images/Save.svg';
import '../../../style/Settings/EditProfile.css';


const EditContainer = (props) => {

    const handleSave = () => {
        localStorage.setItem(`bio_${props.userID}`, props.bio);
    };

    return (
        <div className="edit-container">
            <div className="edit-general-setting-container">
                <div className="edit-general-setting">
                    <div className='edit-general-heading-container'>
                        <h5 className="edit-general-setting-head">Profile Details</h5>
                    </div>
                    <div className='edit-general-setting-btn-container'>
                        <button>
                            <img src={Reset} alt="Reset-BTN-IMG" className='edit-general-setting-btn-container-img' />
                            Reset
                        </button>
                        <button onClick={handleSave}>
                            <img src={Save} alt="Save-BTN-IMG" className='edit-general-setting-btn-container-img' />
                            Save
                        </button>
                    </div>
                </div>
                <hr />
            </div>
            <div className="edit-profile-img-container">
                <div className="edit-profile-img">
                    <img src={ProfileIMG} alt="" />
                    <div className="edit-overlay"></div>
                    <img src={EditIcon} alt="Edit" className="edit-icon" />
                </div>
            </div>
            <div className="edit-bio">
                <textarea placeholder="Edit Bio" value={props.bio}
                    onChange={(e) => props.setBio(e.target.value)}></textarea>
            </div>
        </div>
    );
};

export default EditContainer;

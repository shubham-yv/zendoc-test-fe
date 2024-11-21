import React, { useState } from "react";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const PatientInfoCard = ({ patientInfo }) => {
    const patientName = `${patientInfo.firstName} ${patientInfo.middleName} ${patientInfo.lastName}`;

    const [isConsultingActive, setIsConsultingActive] = useState(true);

    const toggleConsulting = () => {
        setIsConsultingActive(!isConsultingActive);
    };

    return (
        <div className='pinfo'>
            <div className='pinfo-pic'>
                <div className='pinfo-img'></div>
                <div className='pinfo__name'>
                    <div className='pinfo-flexcontainer-column'>
                        <span className='pinfo--name-label pinfo-labels'>Patient's Name</span>
                        <div className='pinfo--name pinfo-text'>{patientName}</div>
                    </div>
                    <div className='pinfo-flexcontainer-column'>
                        <div className='pinfo-flexcontainer'>
                            <span className='pinfo--age-label pinfo-labels'>Age</span>
                            <span className='pinfo--gender-label pinfo-labels'>Sex</span>
                        </div>
                        <div className='pinfo-flexcontainer'>
                            <div className='pinfo--age pinfo-text'>{patientInfo.age}</div>
                            <div className='pinfo--gender pinfo-text'>{patientInfo.gender}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pinfo__contacts'>
                <div className='pinfo__contacts-container'>
                    <div className='pinfo__mail-parent pinfo__contacts--label'>
                        <span className='pinfo-labels'>Email Address</span>
                        <div className='pinfo__mail pinfo-text'>{patientInfo.emailID}</div>
                    </div>
                    <div className='pinfo__mobile-parent pinfo__contacts--label'>
                        <span className='pinfo-labels'>Mobile</span>
                        <div className='pinfo__mobile pinfo-text'>{patientInfo.phoneNumber}</div>
                    </div>
                    <div className='pinfo__consulting-parent pinfo__contacts--label'>
                        <span className='pinfo-labels'>Virtual Consulting</span>
                        <div>
                            <Switch
                                checked={isConsultingActive}
                                onChange={toggleConsulting}
                                inputProps={label.inputProps}
                                color="success"
                            />
                            <span>{isConsultingActive ? 'Active' : 'Inactive'}</span>
                        </div>
                    </div>
                    <div className='pinfo__last-sesion-parent pinfo__contacts--label'>
                        <span className='pinfo-labels'>Last Session</span>
                        <div className='pinfo__last-session pinfo-text'>{new Date().toDateString()}</div>
                    </div>
                    {/* <div className='mp-patient-settingsicons'></div> */}
                </div>
            </div>
        </div>
    );
}

export default PatientInfoCard;

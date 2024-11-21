import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setSelectedPatient } from '../../../../Actions/consultation';

const SearchPatientInfo = (props) => {
    const userRef = useRef(null);

    const selectUser = () => {
        props.setSelectedPatient(props.patient.patientid);
    };

    const truncateEmail = (email) => {
        return email.length > 14 ? email.substring(0, 11) + '...' : email;
    };

    return (
        <div onClick={selectUser} className='sp-list-item' ref={userRef} id={props.patient.patientid}>
            <div className='sp-item-img fas fa-user'></div>
            <div className='sp-item-body'>
                <div className='sp-item-header'>
                    <div className='label-basic'>Patient Name</div>
                    <div className='label-basic'>Age</div>
                    <div className='label-basic'>Sex</div>
                    <div className='label-basic'>Email</div>
                    <div className='label-basic'>Mobile</div>
                    <div className='label-basic'>Patient ID</div>
                </div>
                <div className='sp-item-data'>
                    <div className='label-basic'>{props.patient.firstName + " " + props.patient.lastName}</div>
                    <div className='label-basic'>{props.patient.age}</div>
                    <div className='label-basic'>{props.patient.gender}</div>
                    <div className='label-basic' title={props.patient.emailID}>
                        {truncateEmail(props.patient.emailID)}
                    </div>
                    <div className='label-basic'>{props.patient.phoneNumber}</div>
                    <div className='label-basic'>{props.patient.patientid}</div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, {
    setSelectedPatient
})(SearchPatientInfo);

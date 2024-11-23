import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSelectedPatient } from '../../../Actions/consultation';

const SearchPatientInfo = (props) => {
    const { onSelectPatient } = props;
    const userRef = useRef(null);
    const history = useHistory();

    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const selectUser = (event) => {
        props.setSelectedPatient(userRef.current.getAttribute("id"));
        onSelectPatient(props.patient.patientid);
        history.push(`/patient/${props.patient.patientid}`);
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
                    <div className='label-basic'>{props.patient.emailID}</div>
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

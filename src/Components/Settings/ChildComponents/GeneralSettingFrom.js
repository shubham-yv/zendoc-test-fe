import React, { useEffect, useState } from 'react';
import { getAllDataFromIndexedDB } from '../../../Actions/indexedDB';

const GeneralSettingForm = ({ ProfileDetails }) => {

    const [userData, setUserData] = useState({
        prefferedName: '',
        salutation: ''
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        registrationId: '',
        email: '',
        password: '',
        contact: '',
        address: '',
        pinCode: '',
        state: ''
    });

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
                        emailID: dataFromIndexedDB.emailID || '',
                        phoneNumber: dataFromIndexedDB.phoneNumber || ''
                    });
                }
            } catch (error) {
                console.error("Error fetching data from IndexedDB:", error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="GeneralSettingForm">
            <form onSubmit={handleSubmit}>
                <div className="container-fluid">
                    <div className='GeneralSettingFormFields'>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="Enter First name" name="firstName" value={userData.firstName || "-"} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={userData.lastName} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="registrationId">Registration / Medical ID</label>
                                <input type="text" className="form-control" id="registrationId" placeholder="Enter Registration / Medical ID" name="registrationId" value={ProfileDetails.regMedicalID
                                    || "-"} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" value={userData.emailID} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <div className='d-flex justify-content-between'>
                                    <label htmlFor="password">Password</label>
                                    <span style={{ color: '#0E57C4' }}>Change Password</span>
                                </div>
                                <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="form-group col-md-4">
                                <label htmlFor="contact">Mobile</label>
                                <input type="text" className="form-control" id="contact" placeholder="Enter Mobile" name="contact" value={userData.phoneNumber} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="form-group col-md-6">
                                <label htmlFor="address">Address Line 1</label>
                                <input type="text" className="form-control" id="address" placeholder="Enter Address" name="address" value={ProfileDetails.address} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="form-group col-md-2">
                                <label htmlFor="pinCode">Pin Code</label>
                                <input type="text" className="form-control" id="pinCode" placeholder="Enter Pin Code" name="pinCode" value={ProfileDetails.pinCode} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="blog-horizontal-line"></div>
        </div>
    );
};

export default GeneralSettingForm;

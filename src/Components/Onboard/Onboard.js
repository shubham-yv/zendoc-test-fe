import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../header';
import { getCity, getCountry, getDistrict, getState, submitProfile } from '../../Services/authentication.service';
import { useHistory } from 'react-router-dom';
import '../../style/Onboard/Onboard.css'
import { Datacontext } from '../../Context/DataProvider';
import { connect } from 'react-redux';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { getAllDataFromIndexedDB } from '../../Actions/indexedDB';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";


const Onboard = ({ docDetails }) => {

    const [formData, setFormData] = useState({
        linkedIn: '',
        contact: '',
        address: '',
        pinCode: '',
        state: '',
        Country: '',
        District: '',
        city: '',
        education: '',
        specialities: '',
        workExperience: '',
        medicalID: '',
        photoID: '',
        userId: '',
        doctorCertificates: ''
    });

    const [storeCountry, setStoredCountry] = useState();
    const [storeState, setStoredState] = useState();
    const [storeDistrict, setStoredDistrict] = useState();
    const [storeCity, setStoredCity] = useState();
    const [indexedDBData, setIndexedDBData] = useState({});
    const [additionalSpecialities, setAdditionalSpecialities] = useState([{ name: '', file: null }]);
    const [additionalExperience, setAdditionalExperience] = useState([{ name: '', file: null }]);
    const [additionalEducations, setAdditionalEducations] = useState([{ doctorDegree: '', doctorCertificates: null, education: '' }]);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [additionalMedicalIDs, setAdditionalMedicalIDs] = useState([{ id: '', file: null }]);
    const [useErrors, setuseErrors] = useState({});



    const { linkedIn, firstName, lastName, contact, address, pinCode, state, education, specialities, workExperience, medicalID, photoID, userId, Country, District, city, salutation, prefferedName, phoneNumber, doctorDegree } = formData;

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.message) {
            toast.success(location.state.message);
        }
    }, []);

    const { completeProfilePercenrtage, setCompleteProfilePercenrtage } = useContext(Datacontext)

    const handleAddEducation = () => {
        setAdditionalEducations([...additionalEducations, { doctorDegree: '', doctorCertificates: null, education: '' }]);
    };

    const validationSchema = Yup.object().shape({
        linkedIn: Yup.string().url("Invalid URL").required("Please enter your LinkedIn URL"),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataFromIndexedDB = await getAllDataFromIndexedDB();
                setIndexedDBData(dataFromIndexedDB);
                if (dataFromIndexedDB) {
                    setFormData({
                        ...formData,
                        prefferedName: dataFromIndexedDB.prefferedName || '',
                        salutation: dataFromIndexedDB.salutation || '',
                        firstName: dataFromIndexedDB.firstName || '',
                        lastName: dataFromIndexedDB.lastName || '',
                        phoneNumber: dataFromIndexedDB.phoneNumber || '',
                    });
                }
            } catch (error) {
                console.error("Error fetching data from IndexedDB:", error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setuseErrors({
            ...useErrors,
            [name]: '',
        });
    };

    const handleAdditionalFileChange = (index, event) => {
        const file = event.target.files[0];
        const updatedEducations = [...additionalEducations];
        updatedEducations[index].doctorCertificates = file ? file.name : null;
        setAdditionalEducations(updatedEducations);
    };

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSpecialityChange = (index, value) => {
        const newSpecialities = [...additionalSpecialities];
        newSpecialities[index].name = value;
        setAdditionalSpecialities(newSpecialities);
    };

    const handleSpecialityFileChange = (index, event) => {
        const newSpecialities = [...additionalSpecialities];
        newSpecialities[index].file = event.target.files[0];
        setAdditionalSpecialities(newSpecialities);
    };

    const handleAddSpeciality = () => {
        setAdditionalSpecialities([...additionalSpecialities, { name: '', file: null }]);
    };

    const handleExperienceChange = (index, value) => {
        const updatedExperience = [...additionalExperience];
        updatedExperience[index].name = value;
        setAdditionalExperience(updatedExperience);
    };

    const handleExperienceFileChange = (index, event) => {
        const updatedExperience = [...additionalExperience];
        updatedExperience[index].file = event.target.files[0];
        setAdditionalExperience(updatedExperience);
    };

    const handleMedicalIDChange = (index, value) => {
        const updatedIDs = [...additionalMedicalIDs];
        updatedIDs[index].id = value;
        setAdditionalMedicalIDs(updatedIDs);
    };

    const handleMedicalIDFileChange = (index, event) => {
        const updatedIDs = [...additionalMedicalIDs];
        updatedIDs[index].file = event.target.files[0];
        setAdditionalMedicalIDs(updatedIDs);
    };

    const handleAddMedicalID = () => {
        setAdditionalMedicalIDs([...additionalMedicalIDs, { id: '', file: null }]);
    };

    const handleAddExperience = () => {
        setAdditionalExperience([...additionalExperience, { name: '', file: null }]);
    };

    const handleAdditionalEducationChange = (index, event) => {
        const { name, value } = event.target;
        const updatedEducations = [...additionalEducations];
        updatedEducations[index][name] = value;
        setAdditionalEducations(updatedEducations);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });

            const additionalSpecialitiesString = additionalSpecialities.map((entry) => {
                if (entry.name && entry.file) {
                    return `${entry.name} - ${entry.file.name}`;
                } else {
                    return 'Speciality or Certificate is Unavailable';
                }
            }).filter(entry => entry);

            let combinedSpecialities;
            if (formData.specialities) {
                combinedSpecialities = [formData.specialities, ...additionalSpecialitiesString].join(',');
            } else {
                combinedSpecialities = additionalSpecialitiesString.join(',');
            }

            const additionalEducationsString = additionalEducations.map((entry) => {
                if (entry.doctorDegree && entry.doctorCertificates && entry.education) {
                    return `${entry.education} - ${entry.doctorDegree} - ${entry.doctorCertificates}`;
                } else {
                    return 'Education, Degree or Certificate is Unavailable';
                }
            }).filter(entry => entry);

            let combinedEducation;
            if (formData.education) {
                combinedEducation = [formData.education, ...additionalEducationsString].join(',');
            } else {
                combinedEducation = additionalEducationsString.join(',');
            }

            const additionalExperienceString = additionalExperience.map((entry) => {
                if (entry.name && entry.file) {
                    return `${entry.name} - ${entry.file.name}`;
                } else {
                    return 'Experience or Certificate is Unavailable';
                }
            }).filter(entry => entry);

            let combinedExperience;
            if (formData.workExperience) {
                combinedExperience = [formData.workExperience, ...additionalExperienceString].join(',');
            } else {
                combinedExperience = additionalExperienceString.join(',');
            }

            const finalFormData = {
                ...formData,
                education: combinedEducation,
                specialities: combinedSpecialities,
                workExperience: combinedExperience,
                doctorCertificates: additionalEducations.map(entry => entry.doctorCertificates).join(','),
                specialityFiles: additionalSpecialities.map(entry => entry.file).join(','),
                experienceFiles: additionalExperience.map(experience => experience.file ? experience.file.name : 'No file').join(','),
                medicalID: additionalMedicalIDs.map(entry => `${entry.id} - ${entry.file ? entry.file.name : 'No file'}`).join(','),
            };

            const success = await submitProfile(finalFormData, setCompleteProfilePercenrtage);
            if (success) {
                history.push('/dashboard');
            } else {
                console.error("Profile submission failed");
            }
        } catch (validationErrors) {
            const formattedErrors = {};
            validationErrors.inner.forEach(error => {
                formattedErrors[error.path] = error.message;
            });
            setuseErrors(formattedErrors);
        }
    };

    const handleCountryDetail = async (e) => {
        e.preventDefault();
        await getCountry(setStoredCountry)
    }

    const handleStateDetail = async (e) => {
        e.preventDefault();
        await getState(storeCountry, setStoredState)
    }

    const handleDistrictDetail = async (e) => {
        e.preventDefault();
        await getDistrict(storeState, setStoredDistrict, formData)
    }

    const handleCityDetail = async (e) => {
        e.preventDefault();
        await getCity(storeDistrict, setStoredCity, formData)
    }

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleAdditionalFileUpload = (index) => {
        const fileInput = document.getElementById(`fileInput${index}`);
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleRemoveEducation = (index) => {
        const updatedEducations = additionalEducations.filter((_, i) => i !== index);
        setAdditionalEducations(updatedEducations);
    };

    const handleRemoveSpeciality = (index) => {
        const updatedSpecialities = additionalSpecialities.filter((_, i) => i !== index);
        setAdditionalSpecialities(updatedSpecialities);
    };

    const handleRemoveExperience = (index) => {
        const updatedExperiences = additionalExperience.filter((_, i) => i !== index);
        setAdditionalExperience(updatedExperiences);
    };

    const handleRemoveMedicalID = (index) => {
        const updatedMedicalIDs = additionalMedicalIDs.filter((_, i) => i !== index);
        setAdditionalMedicalIDs(updatedMedicalIDs);
    };

    return (
        <>

            <div className="containero">
                <Header />
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div className="container-fluid" style={{ marginTop: '4rem' }}>
                        <div className="row justify-content-center">
                            <div className="col-lg-6 custom-container d-flex justify-content-between OnboardProfile">
                                <h2>Complete your profile</h2>
                                <div className=''>
                                    <Link to="/dashboard" className='Skip'>Skip</Link>
                                    <button type="submit" className='Onboard-BTN' onClick={handleSubmit}>Complete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="form-group Li-Box">
                                    <label htmlFor="inputAddress">Link your LinkedIn profile</label>
                                    <input type="url" className="form-control" id="linkedIn" name="linkedIn" value={linkedIn} placeholder="Ex: www.linkedin.com/advik29393" onChange={handleInputChange} onClick={() => setuseErrors({ ...useErrors, linkedIn: "" })} />
                                    {useErrors.linkedIn && (
                                        <div className="error-message">{useErrors.linkedIn}</div>
                                    )}
                                </div>
                                <div className=' M-Box'>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text" className="form-control" id="firstName" placeholder="Enter First name" name="firstName" value={firstName} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={lastName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-row mt-3">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="contact">Contact</label>
                                            <input type="text" className="form-control" id="contact" placeholder="+91 937847484949" name="contact" value={phoneNumber} onChange={handleInputChange} />
                                        </div>


                                        <div className="form-group col-md-6">
                                            <label htmlFor="firstName">Preffered Name</label>
                                            <div className="Onboard-Salutation">
                                                <div>
                                                    <select
                                                        id="salutation"
                                                        value={salutation}
                                                        className="form-control"
                                                        name="salutation"
                                                        onChange={handleInputChange}
                                                        style={{ width: 'auto' }}
                                                    >
                                                        <option value={1}>Dr</option>
                                                        <option value={2}>Mr</option>
                                                        <option value={3}>Miss</option>
                                                    </select>
                                                </div>
                                                <div className="lp-parent-container-onboard">
                                                    <div className="ui transparent input">
                                                        <input
                                                            onChange={handleInputChange}
                                                            name="prefferedName"
                                                            value={prefferedName}
                                                            type="text"
                                                            placeholder="Enter Your Preferred Name Here"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row mt-3">
                                        <div className="form-group col-md-6" onClick={handleCountryDetail}>
                                            <label htmlFor="Country">Country</label>
                                            <select id="Country" value={Country} className="form-control" name="Country" onChange={(e) => handleInputChange(e)} onClick={() => setuseErrors({ ...useErrors, Country: "" })}>
                                                {storeCountry && storeCountry.map((c) => (
                                                    <option value={c.id} key={c.id}>{c.countryName}</option>
                                                ))}

                                            </select>
                                        </div>

                                        <div className="form-group col-md-6" onClick={handleStateDetail}>
                                            <label htmlFor="state">State</label>
                                            <select id="state" value={state} className="form-control" name="state" onChange={(e) => handleInputChange(e)}>
                                                {storeState && storeState.map((s) => (
                                                    <option value={s.id} key={s.id}>{s.stateName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group col-md-6" onClick={handleDistrictDetail}>
                                            <label htmlFor="District">District</label>
                                            <select id="District" value={District} className="form-control" name="District" onChange={(e) => handleInputChange(e)}>
                                                {storeDistrict && storeDistrict.map((d) => (
                                                    <option value={d.id} key={d.id}>{d.distName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group col-md-6" onClick={handleCityDetail}>
                                            <label htmlFor="state">City</label>
                                            <select id="City" value={city} className="form-control" name="city" onChange={(e) => handleInputChange(e)}>
                                                {storeCity && storeCity.map((city) => (
                                                    <option value={city.id} key={city.id}>{city.cityName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row mt-3">
                                        <div className="form-group col-md-9">
                                            <label htmlFor="address">Address Line 1</label>
                                            <input type="text" className="form-control" id="address" placeholder="Enter your location" name="address" value={address} onChange={handleInputChange} required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mt-1">
                                        <div className="form-group col-md-5">
                                            <label htmlFor="pinCode">Pin Code</label>
                                            <input type="text" className="form-control" id="pinCode" placeholder="Enter Your Zip Code" name="pinCode" value={pinCode} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="">
                                        <div className="L-Box mt-3">
                                            {additionalEducations.map((field, index) => (
                                                <div className="mt-3" key={index}>
                                                    <div className="form-group">
                                                        <label htmlFor={`education${index}`}>Education</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id={`education${index}`}
                                                            name="education"
                                                            placeholder="Enter additional education"
                                                            value={field.education}
                                                            onChange={(e) => handleAdditionalEducationChange(index, e)}
                                                        />
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div className="form-group" style={{ width: '40%' }}>
                                                            <label htmlFor={`doctorDegree${index}`}>Doctor's Degree</label>
                                                            <select
                                                                id={`doctorDegree${index}`}
                                                                name="doctorDegree"
                                                                className="form-control"
                                                                value={field.doctorDegree}
                                                                onChange={(e) => handleAdditionalEducationChange(index, e)}
                                                            >
                                                                <option value="">Select Degree</option>
                                                                <option value="Undergraduate">Undergraduate</option>
                                                                <option value="Postgraduate">Postgraduate</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group" style={{ marginLeft: '.5rem' }}>
                                                            <label htmlFor={`doctorCertificates${index}`}>Certificate</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id={`doctorCertificates${index}`}
                                                                onChange={(e) => handleAdditionalFileChange(index, e)}
                                                            />
                                                        </div>

                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleRemoveEducation(index)}
                                                        style={{ marginBottom: '1rem' }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ))}
                                            <div style={{ display: 'flex' }}>
                                                <label htmlFor="addMoreEducation" style={{ marginRight: '10px', color: '#254069' }}>
                                                    Add More
                                                </label>
                                                <AddOutlinedIcon onClick={handleAddEducation} style={{ color: '#254069', cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="L-Box mt-3">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            id="specialities"
                                            rows="3"
                                            placeholder="Enter Your Specialities"
                                            name="specialities"
                                            onChange={handleInputChange}
                                            required
                                            value={specialities}
                                            style={{ margin: '.6rem 0', display: 'none' }}
                                        />
                                        {additionalSpecialities.map((entry, index) => (
                                            <div key={index} className="form-group">
                                                <div style={{ display: 'flex', gap: '1rem' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <label htmlFor={`additionalSpeciality${index}`}>Specialities</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id={`additionalSpeciality${index}`}
                                                            name="specialities"
                                                            placeholder="Enter Your Specialities"
                                                            value={entry.name}
                                                            onChange={(event) => handleSpecialityChange(index, event.target.value)}
                                                        />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <label htmlFor={`specialityFileInput${index}`}>Certificate</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id={`specialityFileInput${index}`}
                                                            onChange={(event) => handleSpecialityFileChange(index, event)}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger mt-2"
                                                    onClick={() => handleRemoveSpeciality(index)}
                                                    style={{ marginBottom: '1rem' }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ))}

                                        <div style={{ display: 'flex', marginTop: '.6rem' }}>
                                            <label htmlFor="Specialities" style={{ color: '#254069' }}>
                                                Add More
                                            </label>
                                            <AddOutlinedIcon onClick={handleAddSpeciality} style={{ marginLeft: '.5rem', color: '#254069', cursor: 'pointer' }} />
                                        </div>
                                    </div>

                                    <div className="form-row mt-3" style={{ marginLeft: '.1rem', display: 'contents' }}>
                                        <input
                                            className="form-control"
                                            id="workExperience"
                                            rows="3"
                                            placeholder="Enter Your Work Experience"
                                            name="workExperience"
                                            onChange={handleInputChange}
                                            required
                                            value={formData.workExperience}
                                            style={{ display: 'none' }}
                                        />

                                        {additionalExperience.map((experience, index) => (
                                            <div key={index} className="form-group mt-2">
                                                <div style={{ display: 'flex', gap: '1rem' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <label htmlFor={`additionalWork${index}`}>Work Experience</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Additional Experience"
                                                            value={experience.name}
                                                            onChange={(e) => handleExperienceChange(index, e.target.value)}
                                                        />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <label htmlFor={`experienceFileInput${index}`}>Certificate</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id={`experienceFileInput${index}`}
                                                            onChange={(event) => handleExperienceFileChange(index, event)}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger mt-2"
                                                    onClick={() => handleRemoveExperience(index)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ))}

                                        <div style={{ display: 'flex', marginTop: '.6rem' }}>
                                            <label htmlFor="workExperience" style={{ color: '#254069' }}>
                                                Add More
                                            </label>
                                            <AddOutlinedIcon onClick={handleAddExperience} style={{ marginLeft: '.5rem', color: '#254069', cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                </div>


                                <div className="L-Box mt-3">

                                    <div className="form-row">
                                        <div className="mt-3">
                                            <div className="form-group">
                                                {additionalMedicalIDs.map((entry, index) => (
                                                    <div key={index} className="form-group mt-2">
                                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                                            <div style={{ flex: 1 }}>
                                                                <label htmlFor={`medicalID${index}`}>REG Number</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id={`medicalID${index}`}
                                                                    value={entry.id}
                                                                    onChange={(e) => handleMedicalIDChange(index, e.target.value)}
                                                                    placeholder="Enter Registration Number"
                                                                />
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                <label htmlFor={`medicalIDFile${index}`}>Certificate</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id={`medicalIDFile${index}`}
                                                                    onChange={(e) => handleMedicalIDFileChange(index, e)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger mt-2"
                                                            onClick={() => handleRemoveMedicalID(index)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ))}
                                                <div style={{ display: 'flex', marginTop: '.6rem' }}>
                                                    <label htmlFor="addMoreMedicalIDs" style={{ color: '#254069' }}>
                                                        Add More
                                                    </label>
                                                    <AddOutlinedIcon onClick={handleAddMedicalID} style={{ marginLeft: '.5rem', color: '#254069', cursor: 'pointer' }} />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="form-group col-md-6 mt-3">
                                            <label htmlFor="photoID">Photo ID</label>
                                            <div className="input-group">

                                                <input type="text" className="form-control" id="photoID" value={selectedFile ? selectedFile.name : ''} readOnly />


                                                <input ref={fileInputRef} type="file" className="form-control" id="photoID" style={{ display: 'none' }} onChange={handleFileInputChange} />


                                                <label htmlFor="photoID" className="input-group-text" style={{ backgroundColor: 'transparent', color: '#808495', cursor: 'pointer' }} onClick={handleUploadClick}>
                                                    <i className="fas fa-upload"></i>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}

const mapStatetoProps = (state) => {
    return {
        docDetails: state.login.doctorDetails
    };
};

export default connect(mapStatetoProps)(Onboard);






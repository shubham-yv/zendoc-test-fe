import React, { forwardRef } from 'react';
import '../../style/consultation/Print.css';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const PrintDocNote = forwardRef((props, ref) => {

    const { DoctorNoteDet, prescriptionData, patientInfo, ProfileDetails, userData } = props;

    const relationshipOptions = [
        { value: 1, name: 'Cousin' },
        { value: 2, name: 'Father' },
        { value: 3, name: 'Mother' },
    ];
    const doctorNote = DoctorNoteDet[0];
    const vitals = [
        { name: "BP", value: doctorNote.physicalExam_BP, unit: "mmHg" },
        { name: "Pulse", value: doctorNote.physicalExam_pulse, unit: "B/Min" },
        { name: "Weight", value: doctorNote.physicalExam_height, unit: "Kg" },
        { name: "Height", value: doctorNote.physicalExam_height, unit: "Cm" },
    ];

    const salutationOptions = [
        { value: 1, name: 'Dr' },
        { value: 2, name: 'Mr' },
        { value: 3, name: 'Mrs' },
    ];

    console.log(userData, "userData")

    const selectedSalutation = salutationOptions.find(option => option.value === parseInt(userData.salutation));

    const { drugs, habits, tasks, tools } = prescriptionData;

    const docNote = DoctorNoteDet[0] || DoctorNoteDet;
    const selectedRelationship = relationshipOptions.find(option => option.value === docNote.guardianRelation);


    return (
        <div className='DN-Container' ref={ref}>
            <div className='DN-Container-inner'>
                <h1>Doctor's Note</h1>
                <div className="patient-info-container1">
                    <div className="patient-info-row1">
                        <div className="patient-info-label1"><PeopleAltOutlinedIcon className='icon' />Guardian Name</div>
                        <div className="patient-info-label1"><PersonOutlinedIcon className='icon' />Relationship with patient</div>
                        <div className="patient-info-label1"><ContactMailIcon className='icon' />Problem</div>
                        <div className="patient-info-label1"><PeopleAltOutlinedIcon className='icon' />Duration of illness</div>
                    </div>
                    <div className="patient-info-row1">
                        <div className="patient-info-value1">{docNote.guardianName}</div>
                        <div className="patient-info-value1">    {selectedRelationship ? selectedRelationship.name : "N/A"}</div>
                        <div className="patient-info-value1">{docNote.provisionalDiagnosis}</div>
                        <div className="patient-info-value1">{docNote.illnessDurationNumber} {docNote.illnessDurationUnit === 1 ? 'Days' : 'Weeks'}</div>
                    </div>
                </div>

                <hr />
                <div className="patient-form-container">
                    <div className="patient-form-section">
                        <span className="circle-number">1</span>
                        <h3>Patient's Chief Complaints</h3>
                    </div>
                    <p>{docNote.patChiefComplaints}</p>

                    <hr />
                    <div className="patient-form-section">
                        <span className="circle-number">2</span>
                        <h3>Relevant History</h3>
                    </div>
                    <p>{docNote.relevantHistory}</p>

                    <hr />
                    <div className="patient-form-section">
                        <span className="circle-number">3</span>
                        <h3>Past History</h3>
                    </div>
                    <p>{docNote.pastHistory}</p>

                    <hr />
                    <div className="patient-form-section">
                        <span className="circle-number">4</span>
                        <h3>Personality / Temperament Traits</h3>
                    </div>
                    <p>{docNote.personaTemperTraits}</p>

                    <hr />
                    <div className="patient-form-section">
                        <span className="circle-number">5</span>
                        <h3>Mental Status Examination Findings (MSE)</h3>
                    </div>
                    <div className="patient-info-container">
                        <div className="patient-info-row">
                            <div className="patient-info-label"><span className="circle-number1"></span> GAB <div className="patient-info-sub-label">(General Appearance and Behaviour)</div></div>
                            <div className="patient-info-value">{docNote.MSE_GAB}</div>
                        </div>
                        <div className="patient-info-row">
                            <div className="patient-info-label"><span className="circle-number1"></span> PMA <div className="patient-info-sub-label">(Psychomotor Activity)</div></div>
                            <div className="patient-info-value">{docNote.MSE_PMA}</div>
                        </div>
                        <div className="patient-info-row">
                            <div className="patient-info-label"><span className="circle-number1"></span> Speech <span className="patient-info-sub-label"></span></div>
                            <div className="patient-info-value">
                                - Quantity: {docNote.MSE_speech_quantity}, Rate: {docNote.MSE_speech_rate}, Tone: {docNote.MSE_speech_tone}, Volume: {docNote.MSE_speech_volume}, Reaction Time: {docNote.MSE_speech_reactionTime}
                            </div>
                        </div>
                        <div className="patient-info-row">
                            <div className="patient-info-label"><span className="circle-number1"></span> Mood & Affect <span className="patient-info-sub-label"></span></div>
                            <div className="patient-info-value">{docNote.MSE_mood_affect}</div>
                        </div>
                        <div className="patient-info-row">
                            <div className="patient-info-label"><span className="circle-number1"></span> Thought <span className="patient-info-sub-label"></span></div>
                            <div className="patient-info-value">{docNote.MSE_thought_content}</div>
                        </div>
                        <div className="patient-info-row">
                            <div className="patient-info-label"><span className="circle-number1"></span> Perception <span className="patient-info-sub-label"></span></div>
                            <div className="patient-info-value">{docNote.MSE_perception}</div>
                        </div>
                        <div className="patient-info-row">
                            <div className="patient-info-label"><span className="circle-number1"></span> Higher Mental Functions / Cognition <span className="patient-info-sub-label"></span></div>
                            <div className="patient-info-value">{docNote.MSE_HMFCogn}</div>
                        </div>
                    </div>

                    <hr />
                    <div className="patient-form-section">
                        <span className="circle-number">6</span>
                        <h3>Provisional Diagnosis</h3>
                    </div>
                    <p>{docNote.provisionalDiagnosis}</p>

                    <hr />
                    <div className="patient-form-section">
                        <span className="circle-number">7</span>
                        <h3>Physical Examination</h3>
                    </div>
                    <div className="vitals-info-container">
                        <div className="vitals-info-item">
                            <span className="vitals-label">Blood Pressure</span>
                            <span className="vitals-value">{docNote.physicalExam_BP}</span>
                        </div>
                        <div className="vitals-info-item">
                            <span className="vitals-label">Pulse Rate</span>
                            <span className="vitals-value">{docNote.physicalExam_pulse}</span>
                        </div>
                        <div className="vitals-info-item">
                            <span className="vitals-label">Height</span>
                            <span className="vitals-value">{docNote.physicalExam_height}</span>
                        </div>
                        <div className="vitals-info-item">
                            <span className="vitals-label">Weight</span>
                            <span className="vitals-value">{docNote.physicalExam_weight}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Container-Print" style={{ marginTop: "10rem" }}>
                <hr className="blue-line" />
                <div className="Prescription-Print">
                    <div className="left-Print">
                        <p>
                            {selectedSalutation?.name} {userData.firstName + userData.lastName} ,      {ProfileDetails && ProfileDetails.education ? ProfileDetails.education.split(',')[0] : ''} <br />
                            {ProfileDetails ? ProfileDetails.regMedicalID : ''} <br />
                            {userData.phoneNumber}<br />
                            {userData.emailID} <br />

                        </p>
                    </div>
                    <div className="right-Print">
                        <p>
                            {ProfileDetails ? ProfileDetails.address : ''}
                        </p>
                    </div>
                </div>
                <div style={{ display: "flex", width: "95%", margin: "auto" }}>

                    <div className="Left-Card-Print">
                        <div className="Left-Card-inner">
                            ZEN ID: {patientInfo.patientid}
                        </div>
                        <h3>{patientInfo ? patientInfo.firstName + patientInfo.lastName : ' '}</h3>
                        <div className="Left-Card-inner">UHID: 17080</div>
                    </div>

                    {/* Right Card */}
                    <div className="Right-Card-Print">
                        <div className="Right-Card-inner">
                            Patient information
                        </div>
                        <div className="Right-Card-inner-detail">
                            <div>
                                <p><b>Age</b></p>
                                <p>{patientInfo ? patientInfo.age : ' '}Years</p>
                            </div>
                            <div>
                                <p><b>Gender</b></p>
                                <p>{patientInfo ? patientInfo.gender : ' '}</p>
                            </div>
                            <div>
                                <p><b>Mobile</b></p>
                                <p>{patientInfo ? patientInfo.phoneNumber : ' '}</p>
                            </div>
                            <div>
                                <p><b>Email</b></p>
                                <p>{patientInfo ? patientInfo.emailID : ' '}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="patient-data-Print">
                <div className="vitals">
                    <h3>Patient vitals</h3>
                    <table className="custom-table">
                        <tbody>
                            <tr>
                                {vitals.map((vital) => (
                                    <React.Fragment key={vital.name}>
                                        <td style={{ color: vital.name === "BP" ? "red" : "green" }}>
                                            <span style={{ color: "black" }}>{vital.name}</span>:{" "}
                                            <span>
                                                <span style={{ color: vital.name === "BP" ? "red" : "green" }}>
                                                    {vital.value} {vital.unit}
                                                </span>
                                            </span>
                                        </td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="history">
                    <h3>Patient history</h3>
                    <table>
                        <tbody>
                            {doctorNote.provisionalDiagnosis}
                        </tbody>
                    </table>
                </div>
            </div>

            <table className="table2">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Medicine name</th>
                        <th>Dosage</th>
                        <th>Intake</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Tea</th>
                        <th>Dinner</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {drugs?.map((drug, index) => {
                        const [breakfast, lunch, tea, dinner] = drug.repetition.split('-');
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{drug.drugName}</td>
                                <td> {drug.dosage ? `${drug.dosage} mg` : '-'}</td>
                                <td>{drug.intake}</td>
                                <td>{breakfast}</td>
                                <td>{lunch}</td>
                                <td>{tea}</td>
                                <td>{dinner}</td>
                                <td>{`${drug.duration} ${drug.durationType}`}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <table className="table2">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Therapy/Tool</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {tools?.map((tool, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{tool.toolName}</td>
                            <td>
                                {tool.toolMotivationMsg ? tool.toolMotivationMsg : (tool.toolDuration ? tool.toolDuration : '-')}
                            </td>

                        </tr>
                    ))}
                    {tasks?.map((tool, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{tool.taskName}</td>
                            <td>{tool.taskDate + tool.startTime + tool.endTime || '-'}</td>
                        </tr>
                    ))}
                    {habits?.map((tool, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{tool.habitCategory}</td>
                            <td>{tool.startDate + tool.endDate || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

  

        </div>
    );
});

export default PrintDocNote;

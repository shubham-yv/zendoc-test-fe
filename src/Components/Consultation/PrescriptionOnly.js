import React, { forwardRef } from 'react';
import '../../style/consultation/Print.css';

const PrescriptionOnly = forwardRef((props, ref) => {

    const { prescriptionData, patientInfo, ProfileDetails, userData } = props;

    const salutationOptions = [
        { value: 1, name: 'Dr' },
        { value: 2, name: 'Mr' },
        { value: 3, name: 'Mrs' },
    ];

    const selectedSalutation = salutationOptions.find(option => option.value === parseInt(userData.salutation));

    // const { drugs, habits, tasks, tools } = prescriptionData;

    return (
        <div ref={ref}>
            <div className="Container-Print">
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
                    {prescriptionData?.drugs?.map((drug, index) => {
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
                    {prescriptionData?.tools?.map((tool, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{tool.toolName}</td>
                            <td>
                                {tool.toolMotivationMsg ? tool.toolMotivationMsg : (tool.toolDuration ? tool.toolDuration : '-')}
                            </td>

                        </tr>
                    ))}
                    {prescriptionData?.tasks?.map((tool, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{tool.taskName}</td>
                            <td>{tool.taskDate + tool.startTime + tool.endTime || '-'}</td>
                        </tr>
                    ))}
                    {prescriptionData?.habits?.map((tool, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{tool.habitCategory}</td>
                            <td>{tool.startDate + tool.endDate || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="prescription-disclaimer">
                <div className="gudmed-logo"></div>
                <div className="disclaimer-text">
                    <p>
                        We are creating this prescription as per patient demands. GudMed is only recommending the Generics as per the prescription shared by the patient with their approval. GudMed is not responsible for any medicine dispensing. This transcription is not intended to diagnose, treat, cure, or prevent any disease. By availing this service, you agree to Gudmed's terms & conditions. To update your profile and other services please login to www.gudmed.in.
                    </p>
                    <p>
                        This is an Electronic Prescription generated by GudMed On 02-08-2023.
                    </p>
                </div>
            </div>
        </div>
    );
});

export default PrescriptionOnly;

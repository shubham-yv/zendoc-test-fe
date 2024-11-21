import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MedicationIcon from '@mui/icons-material/Medication';

const calculatePercentage = (savePatientPill) => {
    if (!savePatientPill || savePatientPill.length === 0) return 0;

    const totalPills = savePatientPill.length;
    const activePills = savePatientPill.filter(pill => pill.isActive === 1).length;
    return (activePills / totalPills) * 100;
};

const PillTracking = ({ savePatientPill = [], savePatientPillData = [] }) => {
    const percentage = calculatePercentage(savePatientPill);

    const parseDate = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    const startDate = parseDate(savePatientPillData[0]?.startDate);
    const endDate = parseDate(savePatientPillData[0]?.endDate);

    return (
        <div className='Pill-Container'>
            <div className='Pill-Tracking'>
                <div className='Pill-Container-Content'>
                    <h5>Pill Tracking</h5>
                    <div className="Pill-Container-label">
                        {savePatientPillData[0]?.pillName || 'No pill name available'} ({savePatientPillData[0]?.pillFrequency || 'No frequency available'})
                    </div>
                    <div className="Pill-Container-label">
                        Prescribed from {startDate ? startDate.toLocaleDateString() : 'N/A'}
                        to {endDate ? endDate.toLocaleDateString() : 'N/A'}
                    </div>
                </div>
                <div className='circle'>
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage.toFixed(0)}%`}
                        styles={{ path: { stroke: '#11aa5e' } }}
                    />
                </div>
            </div>

            {/* Display Each Pill's Data */}
            {savePatientPill.length > 0 ? (
                savePatientPill.map((pill, index) => (
                    <div key={index} className='Pill-Container-Sub-Content'>
                        <div className='Pill-Container-Sub-Content-P'>
                            <MedicationIcon style={{ height: '20px' }} />
                            <div>
                                <p style={{ marginBottom: '0rem' }}>
                                    {pill.pillName || 'Unnamed'} {pill.pillValue || ''}{pill.pillWeight || ''}
                                </p>
                                <label className='Habit-Container-label-Sub'>
                                    Taken at {pill.pillTime || 'No time available'}
                                </label>
                            </div>
                        </div>
                        <div className='Pill-Container-Sub-Content-P'>
                            {pill.isActive === 1 ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                ))
            ) : (
                <p>No pills data available</p>
            )}

            {/* Footer */}
            <div className="horizontal-line-activity"></div>
            <a href="" className="Previous">View all medication</a>
        </div>
    );
};

export default PillTracking;

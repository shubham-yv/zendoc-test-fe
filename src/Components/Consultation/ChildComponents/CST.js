import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { sendPrescriptionFromCST } from '../../../Actions/consultation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CST = ({ onBack, prescription, sendPrescriptionFromCST }) => {

    const dispatch = useDispatch();

    const handleSendPrescription = () => {
        dispatch(sendPrescriptionFromCST(prescription));
    };

    useEffect(() => {
        handleSendPrescription();
    }, []);

    const renderDrugTable = (drugs) => {
        if (!drugs || drugs.length === 0) {
            return (
                <div className='no-summary'>
                    <div className='label-basic'>Add any drug</div>
                    <div className='label-basic'>Or</div>
                    <div className='no-summary-cst label-basic'></div>
                    <div className='label-basic'>Click CST to add prescription from last session</div>
                </div>
            );
        }

        return (
            <div className='summary-list'>
                <div className='summary-list-header'>
                    <div className='label-basic'>S. No</div>
                    <div className='label-basic'>Drug Name</div>
                    <div className='label-basic'>Dose</div>
                    <div className='label-basic'>Repetition</div>
                    <div className='label-basic'>Intake</div>
                </div>
                {drugs?.map((drug, index) => (
                    <div className='summary-list-item' key={index}>
                        <div className='label-basic'>{index + 1}</div>
                        <div className='label-basic'>{drug.drugName}</div>
                        <div className='label-basic'>{drug.dosage}</div>
                        <div className='label-basic'>{drug.repetition}</div>
                        <div className='label-basic'>{drug.intake}</div>
                    </div>
                ))}
            </div>
        );
    };

    const renderHabitTaskTable = (habits, tasks, tools) => {
        const combinedData = [
            ...habits?.map(habit => ({ ...habit, type: 'habit' })) || [],
            ...tasks?.map(task => ({ ...task, type: 'task' })) || [],
            ...tools?.map(tool => ({ ...tool, type: 'tool' })) || []
        ];

        if (combinedData.length === 0) {
            return (
                <div className='no-summary'>
                    <div className='label-basic'>No habits, tasks, or tools to display</div>
                </div>
            );
        }

        return (
            <div className='summary-list'>
                <div className='summary-list-header-sub-2'>
                    <div className='label-basic'>S. No</div>
                    <div className='label-basic'>Therapy / Tool</div>
                    <div className='label-basic'>Details</div>
                </div>
                {combinedData?.map((item, index) => (
                    <div className='summary-list-item-sub-2' key={index}>
                        <div className='label-basic'>{index + 1}</div>
                        <div className='label-basic'>
                            {item.habitCategory || item.taskName || item.toolName}
                        </div>
                        <div className='label-basic'>
                            {item.startDate ? `${item.startDate} to ${item.endDate}` :
                                item.taskDate ? `${item.startTime} to ${item.endTime}` :
                                    item.toolMotivationMsg ? item.toolMotivationMsg : 'N/A'}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="w-100">
                <button className="button-basics medium-button transparent-button--blue w-100" onClick={onBack}>
                    <i className="fas fa-plus" style={{ marginRight: '15px' }}></i>
                    Go Back
                </button>
            </div>
            {prescription === "CST has exceeded 3 months limit" ? (
                <div className='no-summary'>
                    <div className='label-basic'>{prescription}</div>
                </div>
            ) : (
                <>
                    <div className='pres-summary'>
                        <div className='pres-summary-header label-basic'>Drug Summary</div>
                        {renderDrugTable(prescription.drugs)}
                    </div>
                    <div className='pres-summary'>
                        <div className='pres-summary-header label-basic'>Habit, Task, & Tool Summary</div>
                        {renderHabitTaskTable(prescription?.habits, prescription?.tasks, prescription?.tools)}
                    </div>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { sendPrescriptionFromCST })(CST);

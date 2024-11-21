import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const calculatePercentage = (startDate, endDate) => {
    const now = new Date();
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 0;
    if (now > end) return 100;

    const totalDuration = end - start;
    const elapsedDuration = now - start;
    const percentage = (elapsedDuration / totalDuration) * 100;

    return Math.round(percentage);
};

const Task = ({ confTaskData = [], taskData = [] }) => {
    console.log(confTaskData, "confTaskData");
    console.log(taskData, "taskData");

    const parseDate = (dateString) => {
        if (!dateString) return null;
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    const percentage = confTaskData.length > 0
        ? calculatePercentage(parseDate(confTaskData[0]?.startDate), parseDate(confTaskData[0]?.endDate))
        : 0;

    return (
        <>
            <div className='Common-Activity-Container'>
                <div className='Common-Tracking'>
                    <div className='Common-Container-Content'>
                        <h5>Task Tracking</h5>
                        <div className="Pill-Container-label">Task ({taskData.length})</div>
                        <div className="Pill-Container-label">
                            Created on {parseDate(confTaskData[0]?.startDate)?.toLocaleDateString() || 'N/A'} 
                            to {parseDate(confTaskData[0]?.endDate)?.toLocaleDateString() || 'N/A'}
                        </div>
                    </div>
                    <div className='circle-otherActivity'>
                        <CircularProgressbar 
                            value={percentage} 
                            text={`${percentage}%`} 
                            styles={{ path: { stroke: '#11aa5e' } }} 
                        />
                    </div>
                </div>

                {taskData.length > 0 ? (
                    taskData.map((task, index) => (
                        <div className='Common-Activity-Container-Sub-Content' key={index}>
                            <div className='Common-Activity-Container-Sub-Content-P'>
                                <span></span>
                                <p style={{ marginBottom: '0rem' }}>{task.taskCategory || 'No category'}</p>
                                <label htmlFor="" className='Habit-Container-label-Sub'>
                                    Last Updated - {task.created_at || 'N/A'}
                                </label>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No task data available</p>
                )}

                <div className="horizontal-line-activity"></div>
                <a href="" className="Previous">View Details</a>
            </div>
        </>
    );
};

export default Task;

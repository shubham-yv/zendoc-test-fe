import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const habitTracking = ({ habitData = [], getHabitConfData = [] }) => {
    const parseDate = (dateString) => {
        if (!dateString) return null;
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    const startDate = parseDate(getHabitConfData[0]?.startDate);
    const endDate = parseDate(getHabitConfData[0]?.endDate);

    return (
        <>
            <div className='Habit-Container'>
                <div className='Habit-Container-Content'>
                    <h5>Habit Tracking</h5>
                    <div className="Habit-Container-label">Active ({habitData.length})</div>
                    <div>
                        Created on {startDate ? startDate.toLocaleDateString() : 'N/A'}
                        to {endDate ? endDate.toLocaleDateString() : 'N/A'}
                    </div>
                </div>

                {habitData.length > 0 ? (
                    habitData.map((habit, index) => (
                        <div className='Habit-Container-Sub-Content' key={index}>
                            <div className='Habit-C'>
                                <div>
                                    <span>
                                        <AccessibilityNewIcon style={{ height: '20px' }} />
                                    </span>
                                </div>
                                <div>
                                    <p style={{ marginBottom: '0rem' }}>{habit.habitCategory || 'No category'}</p>
                                    <label className='Habit-Container-label-Sub'>
                                        Target - {habit.frequencyValue || 'N/A'} {habit.frequencyType || 'N/A'}
                                    </label>
                                </div>
                            </div>
                            <div className='Habit-Status'>
                                {habit.frequencyValue <= 7 ? "Poor" : habit.frequencyValue <= 14 ? "Average" : "Great"}
                            </div>
                            <div className='Habit-Status'>
                                {habit.frequencyValue || 'N/A'} {habit.frequencyType || 'N/A'}
                            </div>
                            <div style={{ width: 50, height: 50 }}>
                                <CircularProgressbar
                                    value={habit.frequencyValue ? (habit.frequencyValue / 21) * 100 : 0}
                                    text={`${habit.frequencyValue ? Math.round((habit.frequencyValue / 21) * 100) : 0}%`}
                                    strokeWidth={10}
                                    styles={{ path: { stroke: '#B49C1B' } }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No habit data available</p>
                )}

                <div className="horizontal-line-activity"></div>
                <a href="" className="Previous">View all Habits</a>
            </div>
        </>
    );
};

export default habitTracking;

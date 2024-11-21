import React from 'react';
import { connect } from 'react-redux';
import { addNewScheduleFlag } from '../../../Actions/schedule';
import Calender from './Calender';
import '../../../style/schedular/schedular-leftpanel.css'

const SchedularLeftPanel = ({ addNewScheduleFlag }) => {
    const openSchedulePopUp = () => {
        addNewScheduleFlag(true);
    };

    return (
        <div className='sc-leftpanel'>
            <div className='schedule-add'>
                <div className='label-basic'>
                    Add New Schedule
                </div>
                <div className='btn-add-new-schedule'>
                    <button onClick={openSchedulePopUp} className='button-basics medium-button transparent-button--blue'>Add Schedule</button>
                </div>
            </div>
            {/* <div className='schedule-calendar-parent'>
                <div className='label-basic'>
                    Select Date
                </div>
                <div className='schedule-calendar'>
                    < Calender />
                </div>
            </div> */}
            <div className='Effect-Parent'>
                <ul>
                    <li><span style={{ color: '#FF9241', marginRight: '.6rem', fontSize: '1.1rem' }}>&#9679;</span>Normal</li>
                    <li><span style={{ color: '#206FBF', marginRight: '.6rem', fontSize: '1.1rem' }}>&#9679;</span>Low</li>
                    <li><span style={{ color: '#E3AD33', marginRight: '.6rem', fontSize: '1.1rem' }}>&#9679;</span>Medium</li>
                    <li><span style={{ color: '#D64522', marginRight: '.6rem', fontSize: '1.1rem' }}>&#9679;</span> High</li>
                    <li style={{ marginLeft: '-.2rem' }}><span style={{ color: '#E33333', marginRight: '.4rem' }}>&#9650;</span>Side Effects</li>
                </ul>
            </div>
        </div>
    );
};

export default connect(null, {
    addNewScheduleFlag
})(SchedularLeftPanel);

import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const percentage = 80;

const deaddict = () => {
    return (
        <>
            <div className='Common-Activity-Container'>
                <div className='Common-Tracking'>
                    <div className='Common-Container-Content'>
                        <h5>De-Addict</h5>
                        <div className="Pill-Container-label">Stage - Action</div>
                        <div className="Pill-Container-label">Prescribed on 11/07/20</div>
                    </div>
                    <div className='circle-otherActivity'>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={{ path: { stroke: '#11aa5e' } }} />
                    </div>
                </div>

                <div className='Common-Activity-Container-Sub-Content'>
                    <div className='Common-Activity-Container-Sub-Content-P'>
                        <span></span>
                        <p style={{ marginBottom: '0rem' }}>Progress</p>
                        <label htmlFor="" className='Habit-Container-label-Sub'>Last Updated - 15/07/2020</label>
                    </div>
                    <div className='Pill-Container-Sub-Content-P'>
                        Poor
                    </div>
                </div>

                <div className='Common-Activity-Container-Sub-Content'>
                    <div className='Common-Activity-Container-Sub-Content-P'>
                        <span></span>
                        <p style={{ marginBottom: '0rem' }}>Severity</p>
                        <label htmlFor="" className='Habit-Container-label-Sub'>Last Updated - 15/07/2020</label>
                    </div>
                    <div className='Pill-Container-Sub-Content-P'>
                        High
                    </div>
                </div>

                <div className="horizontal-line-activity"></div>
                <a href="" className="Previous">View Details</a>
            </div>
        </>
    )
}

export default deaddict
import React, { useState } from 'react';
import '../../../../style/managePatients/mp-activity.css'
import '../../../../style/managePatients/mp-otheractivities.css'
import '../../../../style/managePatients/mp-journals.css'
import PillTracking from './HealthTrackingTools/pill-tracking'
import HabitTracking from './HealthTrackingTools/habit-tracking'
import Task from './HealthTrackingTools/depression';
import ThoughtJournal from '../Journals/PatientJournal';


const PatientInforActivity = ({ onArrowClick, habitData, moodData, taskData, pillData, congPillData, getHabitConfData, confTaskData }) => {

  const handleArrowClick = () => {
    onArrowClick();
  };

  return (
    <>
      <div className='PatientInforActivity'>
        <h4>All health tracking tools</h4>
      </div>
      <div className='pill-habit-container'>
        <PillTracking savePatientPill={pillData || ''} savePatientPillData={congPillData || ''} />
        <HabitTracking habitData={habitData || ''} getHabitConfData={getHabitConfData || ''} />
      </div>
      {/* <div className='mood-tracking-container'>
        <MoodTracking moodData={moodData} />
      </div> */}
      <div className='horizontal-line-mid'></div>

      <div className="Other-Activities">
        <div className='Depression'>
          <Task confTaskData={confTaskData || ''} taskData={taskData || ''} />
        </div>
      </div>

      {/* <div className='horizontal-line-mid'></div>
      <div className="Journals">
        <ThoughtJournal onArrowClick={handleArrowClick} />
      </div> */}
    </>
  );
};

export default PatientInforActivity;
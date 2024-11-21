import React from 'react';
import { connect } from 'react-redux';
import AddTools from './addTools-view';
import '../../../../style/consultation/addtools-view.css';

const AddPharmaPres = ({ handleAddTask, handleAddHabit, handleAddTimeDuration, handleSessionDetails }) => {
    return (
        <div className='add-ph-parent'>
            <AddTools handleAddTask={handleAddTask} handleAddHabit={handleAddHabit} handleAddTimeDuration={handleAddTimeDuration} handleSessionDetails={handleSessionDetails} />
        </div>
    );
}

export default connect()(AddPharmaPres);

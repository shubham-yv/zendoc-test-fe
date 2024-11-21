import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const ToolTimeDuration = ({ handleAddTimeDuration, tool, handleClose }) => {
    const [state, setState] = useState({
        SelectTime: dayjs(),
        Duration: '',
        taskName: '',
        selectedTimes: [],
        repetition: []
    });

    const handleTimeChange = (time) => {
        setState(prevState => ({ ...prevState, SelectTime: time }));
    };

    const handleDurationChange = (e) => {
        setState(prevState => ({ ...prevState, Duration: e.target.value }));
    };

    const handleRepetitionChange = (value) => {
        // Toggle the selected repetition option
        if (state.repetition.includes(value)) {
            setState(prevState => ({
                ...prevState,
                repetition: prevState.repetition.filter(time => time !== value)
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                repetition: [...prevState.repetition, value]
            }));
        }
    };

    const handleSaveTask = () => {

        const repetition = ['Morning', 'Noon', 'Evening', 'Night'].map(time =>
            state.repetition.includes(time) ? '1' : '0'
        ).join('-');

        const toolDetails = {
            toolName: tool.title,
            toolRepetition: repetition,
            toolDuration: state.Duration,
            toolMotivationMsg: null,
            toolSupportContact: null
        };

        handleAddTimeDuration({ toolDetails });

        setState({ SelectTime: null, Duration: null });
        handleClose();
    };

    return (
        <div className='tool-time-duration' style={{ width: '100%' }}>
            <div className='Tool-Time-Sub'>
                <div className="right-section ns-starttime-parent">
                    <label className="label-basic">Select repetition</label>
                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={state.repetition.includes('Morning')} onChange={() => handleRepetitionChange('Morning')} style={{ color: state.repetition.includes('Morning') ? '#FF9241' : '#707070' }} />}
                            label="Morning"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.repetition.includes('Noon')} onChange={() => handleRepetitionChange('Noon')} style={{ color: state.repetition.includes('Noon') ? '#FF9241' : '#707070' }} />}
                            label="Noon"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.repetition.includes('Evening')} onChange={() => handleRepetitionChange('Evening')} style={{ color: state.repetition.includes('Evening') ? '#FF9241' : '#707070' }} />}
                            label="Evening"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.repetition.includes('Night')} onChange={() => handleRepetitionChange('Night')} style={{ color: state.repetition.includes('Night') ? '#FF9241' : '#707070' }} />}
                            label="Night"
                        />
                    </div>
                </div>
                <div className="ns-starttime-parent tools-duration-parent" >
                    <label htmlFor='duration'>Duration</label>
                    <input type='number' id='duration' name='duration' className='form-control' placeholder='Minutes' value={state.Duration} onChange={handleDurationChange} style={{ marginTop: '.3rem' }} />
                </div>
            </div>
            <div className="ToolDetailBTNG" style={{ marginTop: '1rem' }}>
                <button className='' onClick={handleClose}>Close</button>
                <button className='' onClick={handleSaveTask}>
                    <i className="fas fa-plus" style={{ marginRight: '15px' }}></i>
                    Add Task</button>
            </div>
        </div>
    );
};

export default ToolTimeDuration;

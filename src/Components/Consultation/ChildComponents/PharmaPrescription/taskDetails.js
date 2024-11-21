import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { FormControl, MenuItem, Select } from '@mui/material';

const TaskDetails = ({ handleAddTask, handleClose }) => {
    const [state, setState] = useState({
        scheduleDate: dayjs(),
        startTime: dayjs(),
        endTime: dayjs().add(1, 'hour'),
        priority: 0,
        taskName: '',
        taskCategory: ''
    });

    const categories = [
        "Medication", "Track Pill", "Social", "Health", "Nutrition",
        "Study", "Outdoor", "Wake Up", "Sleep", "Running",
        "No Junk Food", "Sports"
    ];

    const handleDateChange = (date) => {
        setState(prevState => ({ ...prevState, scheduleDate: date }));
    };

    const handleStartTimeChange = (time) => {
        setState(prevState => ({ ...prevState, startTime: time }));
    };

    const handleEndTimeChange = (time) => {
        setState(prevState => ({ ...prevState, endTime: time }));
    };

    const handlePriorityChange = (event) => {
        setState(prevState => ({ ...prevState, priority: event.target.value }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSaveTask = (event) => {
        event.preventDefault();

        const formattedDate = state.scheduleDate.format('YYYY-MM-DD');
        const startTime = state.startTime.format('HH:mm');
        const endTime = state.endTime.format('HH:mm');

        const taskDetails = {
            taskName: state.taskName,
            taskCategory: state.taskCategory,
            taskPriority: state.priority,
            taskDate: formattedDate,
            taskStartTime: startTime,
            taskEndTime: endTime,
            taskActive: 1
        };

        handleAddTask({ taskDetails });
        handleClose();
    };

    return (
        <div>
            <div className="form-group">
                <label className="label-basic task-header">Task Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="taskName"
                    value={state.taskName}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label className="label-basic task-header">Task Category</label>
                <select
                    className="form-control"
                    name="taskCategory"
                    value={state.taskCategory}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="ns-msg-parent" style={{ display: 'flex', alignItems: 'baseline' }}>
                <label className="label-basic">Priority</label>
                <FormControl style={{ marginLeft: '.4rem' }}>
                    <Select
                        className="custom-select-priority"
                        onChange={handlePriorityChange}
                        value={state.priority}
                        style={{
                            color:
                                state.priority == 0
                                    ? "#FF9241"
                                    : state.priority == 1
                                        ? "#206FBF"
                                        : state.priority == 2
                                            ? "#E3AD33"
                                            : state.priority == 3
                                                ? "#D64522"
                                                : "#E3AD33",
                        }}
                    >
                        <MenuItem value={0} style={{ color: "#FF9241" }}>
                            &#8226; Normal
                        </MenuItem>
                        <MenuItem value={1} style={{ color: "#206FBF" }}>
                            &#8226; Low
                        </MenuItem>
                        <MenuItem value={2} style={{ color: "#E3AD33" }}>
                            &#8226; Medium
                        </MenuItem>
                        <MenuItem value={3} style={{ color: "#D64522" }}>
                            &#8226; High
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className='Task-Date-Container'>
                <div className="ns-time-parent">
                    <div className="ns-date-parent">
                        <label className="label-basic">Date</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={state.scheduleDate}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="ns-starttime-parent">
                        <label className="label-basic">Start Time</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                value={state.startTime}
                                onChange={handleStartTimeChange}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="ns-endtime-parent">
                        <label className="label-basic">End Time</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                value={state.endTime}
                                onChange={handleEndTimeChange}
                            />
                        </LocalizationProvider>
                    </div>
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



export default TaskDetails;

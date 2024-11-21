import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const HabitDetails = ({ handleAddHabit, handleClose }) => {
    const [state, setState] = useState({
        habitCategory: '',
        habitUnit: '',
        achieveValue: '',
        startDate: dayjs(),
        endDate: dayjs()
    });

    const categories = [
        "Medication", "Track Pill", "Social", "Health", "Nutrition",
        "Study", "Outdoor", "Wake Up", "Sleep", "Running",
        "No Junk Food", "Sports"
    ];

    const units = ["KM", "M"];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleStartDateChange = (date) => {
        setState(prevState => ({ ...prevState, startDate: date }));
    };

    const handleEndDateChange = (date) => {
        setState(prevState => ({ ...prevState, endDate: date }));
    };

    const handleSaveHabit = () => {
        const startDate = state.startDate.format('YYYY-MM-DD');
        const endDate = state.endDate.format('YYYY-MM-DD');

        const habitData = {
            habitCategory: state.habitCategory,
            habitUnit: state.unit,
            achieveValue: state.value,
            startDate: startDate,
            endDate: endDate,
            isActive: "1"
        };

        handleAddHabit({ habitData });
        handleClose();
    };

    return (
        <div>
            <div className="form-group">
                <label className="label-basic task-header">Habit Category</label>
                <select
                    className="form-control"
                    name="habitCategory"
                    value={state.habitCategory}
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

            <div className="form-group">
                <label className="label-basic task-header">Select Unit</label>
                <select
                    className="form-control"
                    name="unit"
                    value={state.unit}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>Select a unit</option>
                    {units.map(unit => (
                        <option key={unit} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="label-basic task-header">Value to Achieve</label>
                <input
                    type="text"
                    className="form-control"
                    name="value"
                    value={state.value}
                    onChange={handleInputChange}
                />
            </div>

            <div className='Task-Date-Container'>
                <div className="ns-time-parent">
                    <div className="ns-date-parent">
                        <label className="label-basic">From Date</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={state.startDate}
                                onChange={handleStartDateChange}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="ns-endtime-parent">
                        <label className="label-basic">To Date</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={state.endDate}
                                onChange={handleEndDateChange}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            </div>
            <div className="ToolDetailBTNG" style={{ marginTop: '1rem' }}>
                <button className='' onClick={handleClose}>Close</button>
                <button className='' onClick={handleSaveHabit}>
                    <i className="fas fa-plus" style={{ marginRight: '15px' }}></i>
                    Add Habit</button>
            </div>
        </div>
    );
};

export default HabitDetails;

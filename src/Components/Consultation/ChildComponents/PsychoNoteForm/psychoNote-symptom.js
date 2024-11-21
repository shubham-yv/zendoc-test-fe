import React, { useState } from 'react';

// External Imports
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PsychoNoteSession = (props) => {
    const [unit, setUnit] = useState('minutes');

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
        props.handleChange(e); // If you need to propagate the change to the parent component
    };

    return (
        <>
            <div className='dis-input-gr'>
                <div className='dis-input-guardian'>
                    <label className='Common_Note_Headings'>Session number</label>
                    <input 
                        value={props.Session.sessionNumber} 
                        name='sessionNumber' 
                        onChange={(e) => props.handleChange(e)} 
                        className='form-control' 
                        placeholder='Enter Session Number' 
                    />
                </div>
                <div className='dis-input-guardian'>
                    <label className='Common_Note_Headings'>Duration of session</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                            value={props.Session.sessionDuration} 
                            name='sessionDuration' 
                            onChange={(e) => props.handleChange(e)} 
                            className='form-control' 
                            placeholder='Enter Duration' 
                            style={{ height: '35px' }} 
                        />
                        <FormControl className="zenquip-select" fullWidth style={{ minWidth: 120, marginLeft: '10px' }}>
                            <Select
                                name="unit"
                                labelId="unit-select-label"
                                id="unit-select"
                                label="Unit"
                                value={unit}
                                onChange={handleUnitChange}
                            >
                                <MenuItem value="minutes">Minutes</MenuItem>
                                <MenuItem value="hours">Hours</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <label className='label-basic gray-label'>Select the duration unit</label>
                </div>
            </div>
        </>
    );
};

export default PsychoNoteSession;

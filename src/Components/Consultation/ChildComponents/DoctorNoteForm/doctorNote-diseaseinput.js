import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText'; // Import FormHelperText for error messages
import '../../../../style/consultation/doctorNote-info.css'

const DoctorNoteDiseaseInput = ({ info, handleDiseaseInputChange, useErrors }) => {

  return (
    <>
      <div className='dis-input-gr'>
        <div className='dis-input-guardian'>
          <label className='Common_Note_Headings'>Guardian Name</label>
          <input
            value={info.guardianName}
            name='guardianName'
            onChange={(e) => handleDiseaseInputChange(e)}
            className='form-control placeholder-small'
            placeholder='Enter Guardian Name'
          />
          {useErrors.guardianName && ( // Display error message if there's an error
            <FormHelperText error>{useErrors.guardianName}</FormHelperText>
          )}
          <label className='label-basic gray-label'>If there is no guardian leave blank</label>
        </div>
        <div className='dis-input-rel'>
          <label className='Common_Note_Headings'>Relationship</label>
          <FormControl className="zenquip-select" fullWidth error={Boolean(useErrors.guardianRelation)}>
            <Select
              name="guardianRelation"
              labelId="relation-select-label"
              id="relation-select"
              value={info.guardianRelation}
              onChange={(e) => handleDiseaseInputChange(e)}
            >
              <MenuItem value={1}>Cousin</MenuItem>
              <MenuItem value={2}>Father</MenuItem>
              <MenuItem value={3}>Mother</MenuItem>
            </Select>
            {useErrors.guardianRelation && ( // Display error message if there's an error
              <FormHelperText error>{useErrors.guardianRelation}</FormHelperText>
            )}
          </FormControl>
          <label className='label-basic gray-label'>Select the relationship of Guardian with patient</label>
        </div>
      </div>

      <div className='dis-input-illness'>
        <div className='dis-input-illness-dur'>
          <label className='Common_Note_Headings'>Duration of Illness</label>
          <div className='illness-duration-selects'>
            <FormControl className="zenquip-select halfWidth" error={Boolean(useErrors.illnessDurationUnit)}>
              <Select
                labelId="illness-dur-select-label"
                id="illness-dur-select"
                label="Illness"
                name="illnessDurationUnit"
                value={info.illnessDurationUnit}
                onChange={(e) => handleDiseaseInputChange(e)}
              >
                <MenuItem value={1}>Day</MenuItem>
                <MenuItem value={2}>Week</MenuItem>
                <MenuItem value={3}>Month</MenuItem>
              </Select>
            </FormControl>
            <input
              value={info.illnessDurationNumber}
              onChange={(e) => handleDiseaseInputChange(e)}
              name='illnessDurationNumber'
              className="form-control ml10"
              placeholder="0"
            />
          </div>
          <label className='label-basic gray-label'>E.g. For 3 weeks, select Week and enter 3</label>
          {useErrors.illnessDurationUnit && ( // Display error message if there's an error
            <FormHelperText error>{useErrors.illnessDurationUnit}</FormHelperText>
          )}
          {useErrors.illnessDurationNumber && ( // Display error message if there's an error
            <FormHelperText error>{useErrors.illnessDurationNumber}</FormHelperText>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorNoteDiseaseInput;

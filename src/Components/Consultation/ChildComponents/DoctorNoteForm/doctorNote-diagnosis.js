import { FormHelperText } from '@mui/material';
import React from 'react';

const DoctorNoteDiagnosis = ({ diagnosis, handleDiseaseInputChange, useErrors }) => {
  return (
    <>
      <div className='dnc-diagnosis6'>
        <div className='dn-body-number-parent'>
          <div className='dn-body-number-sub2'>6</div>
          <label className='Common_Note_Headings'>Provisional Diagnosis</label>
        </div>
        <textarea
          onChange={(e) => handleDiseaseInputChange(e)}
          name="provisionalDiagnosis"
          value={diagnosis.provisionalDiagnosis}
          className='form-control'
          placeholder="Provisional Diagnosis"
        />
        {useErrors.provisionalDiagnosis && ( // Display error message if there's an error
          <FormHelperText error>{useErrors.provisionalDiagnosis}</FormHelperText>
        )}
      </div>

      <div className='dnc-pe'>
        <div className='dn-body-number-parent'>
          <div className='dn-body-number-sub2'>7</div>
          <label className='Common_Note_Headings'>Physical Examination</label>
        </div>
        <div className='dnc-pe-inputs'>
          <div>
            <label className='labelA'>Blood Pressure (mmHg)</label>
            <input
              name="physicalExam_BP"
              value={diagnosis.physicalExam_BP}
              onChange={(e) => handleDiseaseInputChange(e)}
              className='form-control DrugP-Form'
            />
            {useErrors.physicalExam_BP && ( // Display error message if there's an error
              <FormHelperText error>{useErrors.physicalExam_BP}</FormHelperText>
            )}
          </div>
          <div>
            <label className='labelA'>Pulse rate (BPM)</label>
            <input
              name="physicalExam_pulse"
              value={diagnosis.physicalExam_pulse}
              onChange={(e) => handleDiseaseInputChange(e)}
              className='form-control DrugP-Form'
            />
            {useErrors.physicalExam_pulse && ( // Display error message if there's an error
              <FormHelperText error>{useErrors.physicalExam_pulse}</FormHelperText>
            )}
          </div>
          <div>
            <label className='labelA'>Height (cm)</label>
            <input
              name="physicalExam_height"
              value={diagnosis.physicalExam_height}
              onChange={(e) => handleDiseaseInputChange(e)}
              className='form-control DrugP-Form'
            />
            {useErrors.physicalExam_height && ( // Display error message if there's an error
              <FormHelperText error>{useErrors.physicalExam_height}</FormHelperText>
            )}
          </div>
          <div>
            <label className='labelA'>Weight (kg)</label>
            <input
              name="physicalExam_weight"
              value={diagnosis.physicalExam_weight}
              onChange={(e) => handleDiseaseInputChange(e)}
              className='form-control DrugP-Form'
            />
            {useErrors.physicalExam_weight && ( // Display error message if there's an error
              <FormHelperText error>{useErrors.physicalExam_weight}</FormHelperText>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorNoteDiagnosis;

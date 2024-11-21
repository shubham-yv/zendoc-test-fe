import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PsychoNoteCurrentDiagnosis = (props) => {
    return (
        <Accordion
            classes={{
                root: '',
                rounded: '',
                elevation: '',
            }}
            style={{
                boxShadow: 'none',
                borderRadius: 0,
                borderTop: '1px solid #CECFD0',
                padding: '0'
            }}
            defaultExpanded={true}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                <div className='dn-body-number-parent'>
                    <div className='dn-body-number'>2</div>
                    <label className='Common_Note_Headings'>Primary Diagnosis/Provisional Diagnosis</label>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{ marginTop: '-1rem' }}>
                <div className='pn-current-symptom'>
                    <textarea className="form-control" name="primaryDiagnosis" onChange={props.handleChange} onClick={() => props.setUseErrors({ ...props.useErrors, primaryDiagnosis: "" })} placeholder='' value={props.primaryDiagnosis}></textarea>
                    {props.useErrors.primaryDiagnosis && <div className="error-message">{props.useErrors.primaryDiagnosis}</div>}
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default PsychoNoteCurrentDiagnosis;

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../../../style/consultation/psycho-note.css';

const PsychoNoteGoalsProgress = (props) => {

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
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className='dn-body-number-parent'>
                    <div className='dn-body-number'>5</div>
                    <label className='Common_Note_Headings'>Progress of the patient</label>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{ marginTop: '-1rem', marginBottom: '-1rem' }}>
                <div className='pn-diagnosis'>
                    <textarea className="form-control" name="patientProgress" onChange={props.handleChange} onClick={() => props.setUseErrors({ ...props.useErrors, patientProgress: "" })} placeholder='' value={props.patientProgress}></textarea>
                    {props.useErrors.patientProgress && <div className="error-message">{props.useErrors.patientProgress}</div>}
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default PsychoNoteGoalsProgress;

import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const PsychoNoteGoalAssignment = (props) => {
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
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                <div className='dn-body-number-parent'>
                    <div className='dn-body-number'>4</div>
                    <label className='Common_Note_Headings'>Intervention/Goal Assignment/Techniques used in the session</label>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{ marginTop: '-1rem', marginBottom: '-1rem' }}>
                <div className='pn-safety'>
                    <textarea value={props.interventionAndTechniques} name="interventionAndTechniques" onChange={props.handleChange}
                        onClick={() => props.setUseErrors({ ...props.useErrors, interventionAndTechniques: "" })} className="form-control" placeholder=""></textarea>
                    {props.useErrors.interventionAndTechniques && <div className="error-message">{props.useErrors.interventionAndTechniques}</div>}
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default PsychoNoteGoalAssignment;

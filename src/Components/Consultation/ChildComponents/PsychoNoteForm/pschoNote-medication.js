import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const PsychoNoteMedication = (props) => {
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
                    <div className='dn-body-number'>5</div>
                    <label className='label-basic'>Medication</label>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{marginTop:'-1rem',marginBottom:'-1rem'}}>
                <div className='pn-medication'>
                    <RadioGroup row
                        aria-label="gender"
                        name="medication"
                        value={props.medication}
                        onChange={props.handleChange}
                    >
                        <FormControlLabel value="Compliance" control={<Radio style={{ color: props.medication === "Compliance" ? '#FF9241' : '#808080' }} />} label="Compliance" />
                        <FormControlLabel value="Non-Compliance" control={<Radio style={{ color: props.medication === "Non-Compliance" ? '#FF9241' : '#808080' }} />} label="Non-Compliance" />
                        <FormControlLabel value="Side Effects" control={<Radio style={{ color: props.medication === "Side Effects" ? '#FF9241' : '#808080' }} />} label="Side Effects" />
                        <FormControlLabel value="Instructed to contact Psychiatrist" control={<Radio style={{ color: props.medication === "Instructed to contact Psychiatrist" ? '#FF9241' : '#808080' }} />} label="Instructed to contact Psychiatrist" />
                        <FormControlLabel value="N/A" control={<Radio style={{ color: props.medication === "N/A" ? '#FF9241' : '#808080' }} />} label="N/A" />
                    </RadioGroup>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default PsychoNoteMedication;

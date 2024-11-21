import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../../../style/consultation/consultation-view.css'

const PsychoNoteChiefComplaints = (props) => {
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
            <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />}
                aria-controls="panel1a-content"
            >
                <div className='dn-body-number-parent'>
                    <div className='dn-body-number'>1</div>
                    <label className='Common_Note_Headings'>Chief Complaints/Presenting Complaint</label>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{ marginLeft: '1rem', marginTop: '-1rem', marginBottom: '-1rem' }}>

                <textarea name="chiefComplaints" value={props.chiefComplaints.chiefComplaints} onChange={props.handleChange} className="form-control" onClick={() => props.setUseErrors({ ...props.useErrors, chiefComplaints: "" })} />

                {props.useErrors.chiefComplaints && <div className="error-message">{props.useErrors.chiefComplaints}</div>}
            </AccordionDetails>
        </Accordion>
    );
};

export default PsychoNoteChiefComplaints;

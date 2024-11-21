import React, { useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PsychoNoteProgress = (props) => {
    const myRef = useRef(null);

    const getSelectClass = (id, selectedId) => {
        let className = "pn-progress-btn";
        if (id === selectedId) {
            return className + " selectedprogress";
        }
        return className;
    };

    const handleClick = (event) => {
        let e = {
            target: {}
        };
        e.target.name = event.target.name;
        e.target.value = event.target.value;
        props.handleChange(e);
    };

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
                    <div className='dn-body-number'>7</div>
                    <label className='Common_Note_Headings'>Any other finding/comments</label>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{ marginTop: '-1rem', marginBottom: '-1rem' }}>
                <div className='pn-diagnosis'>
                    <textarea className="form-control" name="otherFindings" onChange={props.handleChange} onClick={() => props.setUseErrors({ ...props.useErrors, otherFindings: "" })} placeholder='' value={props.otherFindings}></textarea>
                    {props.useErrors.otherFindings && <div className="error-message">{props.useErrors.otherFindings}</div>}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default PsychoNoteProgress;

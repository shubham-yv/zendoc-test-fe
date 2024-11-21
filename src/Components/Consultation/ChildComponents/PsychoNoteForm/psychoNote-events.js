// PsychoNoteSessionContent.js

import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PsychoNoteSessionContent = ({ sessionContent, handleChange }) => {
    const { generalAppearance, rapport, sessionAgenda, moodAndAffect, miscellaneousFindings } = sessionContent;

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
                    <div className='dn-body-number'>3</div>
                    <label className='Common_Note_Headings'>Session Content</label>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{ marginTop: '-1rem', marginBottom: '-1rem' }}>
                <div className='pn-events'>
                    <label htmlFor="" className='label-diagnosis'>General appearance, attitude, and behavior of the client including Psychomotor activity, eye to eye contact</label>
                    <textarea value={generalAppearance} name="generalAppearance" onChange={handleChange} className="form-control" placeholder=""></textarea>
                    <label htmlFor="" className='label-diagnosis'>Rapport</label>
                    <textarea value={rapport} name="rapport" onChange={handleChange} className="form-control" placeholder=""></textarea>
                    <label htmlFor="" className='label-diagnosis'>Agenda of the session/Topic Discussed</label>
                    <textarea value={sessionAgenda} name="sessionAgenda" onChange={handleChange} className="form-control" placeholder=""></textarea>
                    <label htmlFor="" className='label-diagnosis'>Client’s Mood and Affect</label>
                    <textarea value={moodAndAffect} name="moodAndAffect" onChange={handleChange} className="form-control" placeholder=""></textarea>
                    <label htmlFor="" className='label-diagnosis'>Miscellaneous findings</label>
                    <textarea value={miscellaneousFindings} name="miscellaneousFindings" onChange={handleChange} className="form-control" placeholder=""></textarea>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default PsychoNoteSessionContent;

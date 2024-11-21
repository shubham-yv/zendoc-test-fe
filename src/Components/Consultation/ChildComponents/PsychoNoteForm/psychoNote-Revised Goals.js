import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RevisedGoals = (props) => {
    const { diagnosisInfo, handleChange } = props;
    const isDiagnosticChange = diagnosisInfo ? diagnosisInfo.isDiagnosticChange : "0";
    const diagnosis = diagnosisInfo ? diagnosisInfo.diagnosis : "";

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
                    <div className='dn-body-number'>6</div>
                    <label className='Common_Note_Headings'>Plans/Goals/Agenda for the next session</label>
                </div>
            </AccordionSummary>
            <AccordionDetails style={{ marginTop: '-1rem', marginBottom: '-1rem' }}>
                <div className='pn-diagnosis'>

                    <textarea className="form-control" name="plansAndGoals" onChange={handleChange} placeholder='' value={props.plansAndGoals} onClick={() => props.setUseErrors({ ...props.useErrors, plansAndGoals: "" })} ></textarea>
                    {props.useErrors.plansAndGoals && <div className="error-message">{props.useErrors.plansAndGoals}</div>}

                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default RevisedGoals;

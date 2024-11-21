import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FormHelperText } from '@mui/material';

const DoctorNoteComplaints = ({ complaints, handleDiseaseInputChange, useErrors }) => {
  const [isExpandedSub, setIsExpandedSub] = useState(false);
  const [isExpandedSub2, setIsExpandedSub2] = useState(false);
  const [isExpandedSub3, setIsExpandedSub3] = useState(false);
  const [isExpandedSub4, setIsExpandedSub4] = useState(false);
  const [isExpandedSub5, setIsExpandedSub5] = useState(false);
  const [isExpandedSub6, setIsExpandedSub6] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(true);
  const [isExpanded3, setIsExpanded3] = useState(true);
  const [isExpanded4, setIsExpanded4] = useState(true);
  const [isExpanded5, setIsExpanded5] = useState(true);

  const toggleAccordion1 = () => {
    setIsExpanded1(!isExpanded1);
  };

  const toggleAccordion2 = () => {
    setIsExpanded2(!isExpanded2);
  };

  const toggleAccordion3 = () => {
    setIsExpanded3(!isExpanded3);
  };

  const toggleAccordion4 = () => {
    setIsExpanded4(!isExpanded4);
  };

  const toggleAccordionSub = () => {
    setIsExpandedSub(!isExpandedSub);
  };

  const toggleAccordionSub2 = () => {
    setIsExpandedSub2(!isExpandedSub2);
  };

  const toggleAccordionSub3 = () => {
    setIsExpandedSub3(!isExpandedSub3);
  };

  const toggleAccordionSub4 = () => {
    setIsExpandedSub4(!isExpandedSub4);
  };

  const toggleAccordionSub5 = () => {
    setIsExpandedSub5(!isExpandedSub5);
  };

  const toggleAccordionSub6 = () => {
    setIsExpandedSub6(!isExpandedSub6);
  };


  const toggleAccordion5 = () => {
    setIsExpanded5(!isExpanded5);
  };

  return (
    <>

      <div className='dnc-complaints'>
        <div className='dn-body-number-parent'>
          <div className='dn-body-number'>1</div>
          <label className='Common_Note_Headings'>Patient's Chief Complaints</label>
        </div>
        <textarea
          onChange={(e) => handleDiseaseInputChange(e)}
          name="patChiefComplaints"
          value={complaints.patChiefComplaints}
          className='form-control'
          placeholder="Patient's Chief Complaints"
        ></textarea>
        {useErrors.patChiefComplaints && ( // Display error message if there's an error
          <FormHelperText error>{useErrors.patChiefComplaints}</FormHelperText>
        )}
      </div>

      <div className='dnc-history'>
        <div className='dn-body-number-parent'>
          <div className='dn-body-number'>2</div>
          <label className='Common_Note_Headings'>Relevant History</label>
        </div>
        <textarea
          onChange={(e) => handleDiseaseInputChange(e)}
          name="relevantHistory"
          value={complaints.relevantHistory}
          className='form-control'
          placeholder="Relevant History"
        ></textarea>
        {useErrors.relevantHistory && ( // Display error message if there's an error
          <FormHelperText error>{useErrors.relevantHistory}</FormHelperText>
        )}

      </div>


      <Accordion
        className="custom-accordion"
        expanded={isExpanded3}
        onChange={toggleAccordion3}
        classes={{
          root: '',
          rounded: '',
          elevation: '',
        }}
        style={{
          boxShadow: 'none',
          borderRadius: 0,
          borderTop: '1px solid #dfdddd',
          padding: '0'
        }}
      >
        <AccordionSummary id="panel-header-3" aria-controls="panel-content-3" style={{ color: 'black', borderTop: '1px solid #dfdddd' }} className='w-100'>
          <div className='d-flex w-100 justify-content-between'>
            <div className='dn-body-number-parent'>
              <div className='dn-body-number-sub'>3</div>
              <label className='Common_Note_Headings'>Past History</label>
            </div>
            <span className=''>
              {isExpanded3 ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails className=''>
          <textarea
            onChange={(e) => handleDiseaseInputChange(e)}
            name="pastHistory"
            value={complaints.pastHistory}
            className='form-control'
            placeholder="Past History"
          ></textarea>
          {useErrors.pastHistory && ( // Display error message if there's an error
            <FormHelperText error>{useErrors.pastHistory}</FormHelperText>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="custom-accordion"
        expanded={isExpanded4}
        onChange={toggleAccordion4}
        classes={{
          root: '',
          rounded: '',
          elevation: '',
        }}
        style={{
          boxShadow: 'none',
          borderRadius: 0,
          border: 'none',
          padding: '0'
        }}
      >
        <AccordionSummary id="panel-header-4" aria-controls="panel-content-4" style={{ color: 'black' }} className='w-100'>
          <div className='d-flex w-100 justify-content-between'>
            <div className='dn-body-number-parent'>
              <div className='dn-body-number-sub-mse'>4</div>
              <label className='Common_Note_Headings'>Personality / Temperament Traits</label>
            </div>
            <span className=''>
              {isExpanded4 ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails className=''>


          <textarea
            onChange={(e) => handleDiseaseInputChange(e)}
            name="personaTemperTraits"
            value={complaints.personaTemperTraits}
            className='form-control'
            placeholder="Personality / Temperament Traits"
          ></textarea>
          {useErrors.personaTemperTraits && ( // Display error message if there's an error
            <FormHelperText error>{useErrors.personaTemperTraits}</FormHelperText>
          )}
          {/* <label htmlFor="" className='Accordian-Label'>Write patient chief complaints</label> */}
        </AccordionDetails>
      </Accordion>

      <Accordion className="custom-accordion" expanded={isExpanded5} onChange={toggleAccordion5}
        classes={{
          root: '',
          rounded: '',
          elevation: '',
        }}
        style={{
          boxShadow: 'none',
          borderRadius: 0,
          border: 'none',
          padding: '0'
        }}>

        <AccordionSummary id="panel-header" aria-controls="panel-content" style={{ color: 'black' }} className='w-100'>
          <div className='d-flex w-100 justify-content-between'>
            <div className='dn-body-number-parent'>
              <div className='dn-body-number-sub-mse'>5</div>
              <label className='Common_Note_Headings'>Mental status Examination findings (MSE)</label>
            </div>
            <span className=''>
              {isExpanded5 ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
            </span>
          </div>
        </AccordionSummary >

        <AccordionDetails className='d-flex justify-content-between custom-flex-column' style={{ borderBottom: '1px solid #CECFD0' }}>

          <Accordion
            expanded={isExpandedSub2}
            onChange={toggleAccordionSub2}

            className='w-100 p-0'
            classes={{
              root: '',
              rounded: '',
              elevation: '',
            }}
            style={{
              boxShadow: 'none',
              borderRadius: 0,
              border: 'none',
              padding: '0px'
            }}
          >

            <AccordionSummary className="d-flex justify-content-between w-100 p-0 custom-flex-column">
              <span className="flex-grow-1">    GAB (General Appearance and behaviour ) </span>
              <AddCircleOutlineIcon style={{ color: '#1E64CC' }} />
            </AccordionSummary>

            <AccordionDetails>

              <div className='right1Sub'>
                <label className="">GAB</label>
                <textarea className='form-control'
                  onChange={(e) => handleDiseaseInputChange(e)}
                  name="MSE_GAB"
                  value={complaints.MSE_GAB}
                >
                </textarea>
                {useErrors.MSE_GAB && ( // Display error message if there's an error
                  <FormHelperText error>{useErrors.MSE_GAB}</FormHelperText>
                )}
              </div>
            </AccordionDetails>
          </Accordion>

        </AccordionDetails>

        <AccordionDetails className='d-flex justify-content-between custom-flex-column' style={{ borderBottom: '1px solid #CECFD0' }}>

          <Accordion
            expanded={isExpandedSub3}
            onChange={toggleAccordionSub3}

            className='w-100 p-0'
            classes={{
              root: '',
              rounded: '',
              elevation: '',
            }}
            style={{
              boxShadow: 'none',
              borderRadius: 0,
              border: 'none',
              padding: '0px'
            }}
          >

            <AccordionSummary className="d-flex justify-content-between w-100 p-0 custom-flex-column">
              <span className="flex-grow-1">      PMA (Psychomotor activity ) </span>
              <AddCircleOutlineIcon style={{ color: '#1E64CC' }} />
            </AccordionSummary>

            <AccordionDetails>

              <div className='right1Sub'>
                <label className="">PMA</label>
                <select className="duration-dropdown"
                  onChange={(e) => handleDiseaseInputChange(e)}
                  name="MSE_PMA"
                  value={complaints.MSE_PMA}
                >
                  <option value={1}>Increase</option>
                  <option value={2}>Decrease</option>
                  <option value={3}>Normal</option>
                </select>
              </div>
            </AccordionDetails>
          </Accordion>

        </AccordionDetails>



        <AccordionDetails className='d-flex justify-content-between' style={{
          marginTop: '-8px',
          marginBottom: '-15px',
        }}>

          <Accordion
            expanded={isExpandedSub}
            onChange={toggleAccordionSub}

            className='w-100 p-0'
            classes={{
              root: '',
              rounded: '',
              elevation: '',
            }}
            style={{
              boxShadow: 'none',
              borderRadius: 0,
              border: 'none',
              padding: '0px'
            }}
          >

            <AccordionSummary className="d-flex justify-content-between w-100 p-0 custom-flex-column">
              <span className="flex-grow-1">Speech</span>
              <AddCircleOutlineIcon style={{ color: '#1E64CC' }} />
            </AccordionSummary>

            <AccordionDetails>
              <div className="right1">
                <div className='right1Sub'>
                  <label className="">Quantity</label>
                  <select className="duration-dropdown"
                    onChange={(e) => handleDiseaseInputChange(e)}
                    name="MSE_speech_quantity"
                    value={complaints.MSE_speech_quantity}
                  >
                    <option value={1}>Increase</option>
                    <option value={2}>Decrease</option>
                    <option value={3}>Normal</option>
                  </select>
                </div>
                <div className='right1Sub'>
                  <label className="">Rate</label>
                  <select className="duration-dropdown duration-drop-w"
                    onChange={(e) => handleDiseaseInputChange(e)}
                    name="MSE_speech_rate"
                    value={complaints.MSE_speech_rate}
                  >
                    <option value={1}>Increase</option>
                    <option value={2}>Decrease</option>
                    <option value={3}>Normal</option>
                  </select>
                </div>
              </div>
              <div className='right1Sub'>
                <label className="">Tone</label>
                <textarea className="duration-dropdown duration-drop-w form-control"
                  onChange={(e) => handleDiseaseInputChange(e)}
                  name="MSE_speech_tone"
                  value={complaints.MSE_speech_tone}
                >
                </textarea>
                {useErrors.MSE_speech_tone && ( // Display error message if there's an error
                  <FormHelperText error>{useErrors.MSE_speech_tone}</FormHelperText>
                )}
              </div>
              <div className='right1Sub'>
                <label className="">Volume</label>
                <select className="duration-dropdown duration-drop-w"
                  onChange={(e) => handleDiseaseInputChange(e)}
                  name="MSE_speech_volume"
                  value={complaints.MSE_speech_volume}
                >
                  <option value={1}>Low</option>
                  <option value={2}>High</option>
                  <option value={3}>Normal</option>
                </select>
              </div>
              <div className='right1Sub'>
                <label className="">Reaction Time</label>
                <select className="duration-dropdown duration-drop-w"
                  onChange={(e) => handleDiseaseInputChange(e)}
                  name="MSE_speech_reactionTime"
                  value={complaints.MSE_speech_reactionTime}
                >
                  <option value={1}>Increase</option>
                  <option value={2}>Decrease</option>
                  <option value={3}>Normal</option>
                </select>
              </div>
            </AccordionDetails>
          </Accordion>


        </AccordionDetails>

        <AccordionDetails className='d-flex justify-content-between custom-flex-column' style={{ borderBottom: '1px solid #CECFD0', borderTop: '1px solid #CECFD0' }}>

          <Accordion
            expanded={isExpandedSub4}
            onChange={toggleAccordionSub4}

            className='w-100 p-0'
            classes={{
              root: '',
              rounded: '',
              elevation: '',
            }}
            style={{
              boxShadow: 'none',
              borderRadius: 0,
              border: 'none',
              padding: '0px'
            }}
          >

            <AccordionSummary className="d-flex justify-content-between w-100 p-0 custom-flex-column">
              <span className="flex-grow-1">      Mood & Affect </span>
              <AddCircleOutlineIcon style={{ color: '#1E64CC' }} />
            </AccordionSummary>

            <AccordionDetails>

              <div className='right1Sub'>
                <label className="">  Mood & Affect</label>
                <textarea className='form-control'
                  onChange={(e) => handleDiseaseInputChange(e)}
                  name="MSE_mood_affect"
                  value={complaints.MSE_mood_affect}
                >
                </textarea>
              </div>
              {useErrors.MSE_mood_affect && ( // Display error message if there's an error
                <FormHelperText error>{useErrors.MSE_mood_affect}</FormHelperText>
              )}
            </AccordionDetails>
          </Accordion>


        </AccordionDetails>

        <AccordionDetails className='d-flex justify-content-between custom-flex-column' style={{ borderBottom: '1px solid #CECFD0' }}>


          <Accordion
            expanded={isExpandedSub5}
            onChange={toggleAccordionSub5}

            className='w-100 p-0'
            classes={{
              root: '',
              rounded: '',
              elevation: '',
            }}
            style={{
              boxShadow: 'none',
              borderRadius: 0,
              border: 'none',
              padding: '0px'
            }}
          >

            <AccordionSummary className="d-flex justify-content-between w-100 p-0 custom-flex-column">
              <span className="flex-grow-1">Thought</span>
              <AddCircleOutlineIcon style={{ color: '#1E64CC' }} />
            </AccordionSummary>

            <AccordionDetails >

              <div className='right1Sub'>
                <label className="">Thought</label>

                <textarea className='form-control'
                  onChange={(e) => handleDiseaseInputChange(e)}
                  name="MSE_thought_content"
                  value={complaints.MSE_thought_content}
                >
                </textarea>
                {useErrors.MSE_thought_content && ( // Display error message if there's an error
                  <FormHelperText error>{useErrors.MSE_thought_content}</FormHelperText>
                )}
              </div>

            </AccordionDetails>
          </Accordion>

        </AccordionDetails>



        <AccordionDetails className='d-flex justify-content-between custom-flex-column' style={{ borderBottom: '1px solid #CECFD0' }}>


          <Accordion
            expanded={isExpandedSub6}
            onChange={toggleAccordionSub6}

            className='w-100 p-0'
            classes={{
              root: '',
              rounded: '',
              elevation: '',
            }}
            style={{
              boxShadow: 'none',
              borderRadius: 0,
              border: 'none',
              padding: '0px'
            }}
          >

            <AccordionSummary className="d-flex justify-content-between w-100 p-0 custom-flex-column">
              <span className="flex-grow-1">Perception</span>
              <AddCircleOutlineIcon style={{ color: '#1E64CC' }} />
            </AccordionSummary>

            <AccordionDetails>

              <div className='right1Sub'>
                <label className="">Perception</label>
                <textarea className='form-control'
                  onChange={(e) => handleDiseaseInputChange(e)}
                  name="MSE_perception"
                  value={complaints.MSE_perception}
                >
                </textarea>
                {useErrors.MSE_perception && ( // Display error message if there's an error
                  <FormHelperText error>{useErrors.MSE_perception}</FormHelperText>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DoctorNoteComplaints;

import React from 'react';

const PsychoNoteGuardian = (props) => {
    return (
        <>
            <div className='dis-input-gr'>
                <div className='dis-input-guardian'>
                    <label className='Common_Note_Headings'>Guardian Name</label>
                    <input value={props.info.guardianName} name='guardianName' onChange={(e) => props.handleChange(e)} className='form-control' placeholder='Enter Guardian Name' />
                    <label className='label-basic gray-label'>If there is no guardian leave blank</label>
                </div>
                <div className='dis-input-rel'>
                    <label className='Common_Note_Headings'>Relationship</label>
                    <input value={props.info.relationship} name='relationship' onChange={(e) => props.handleChange(e)} className='form-control' placeholder='Enter Relationship With patient' />
                </div>

            </div>
        </>
    );
};

export default PsychoNoteGuardian;

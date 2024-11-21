import React from 'react';

import DrugPrescription from './mp-drugPrescription';
import ToolPrescription from './mp-toolPrescription';

const DoctorPrescription = ({ drugs, tools }) => {
    return (
        <div className='mp-drug-parent'>
            <div className='label-basic dp-title'>
                Prescription - Drug
            </div>
            <DrugPrescription drugs={drugs} canEdit={false}/>
            <div className='label-basic dp-title'>
                Prescription - Therapy Tasks
            </div>
            <ToolPrescription tools={tools} canEdit={false}/>
        </div>
    );
}


export default DoctorPrescription;

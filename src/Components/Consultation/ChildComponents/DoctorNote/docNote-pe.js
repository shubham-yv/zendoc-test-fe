import React from "react";

const DoctorNotePE = ({ info, LastNote }) => {

    return (
        <div className='doc-note-pe'>
            <div className='dct-num'>
                7
            </div>
            <div className='doc-pe-body'>
                <div className='label-basic'>
                    Physical Examination
                </div>
                <div className='doc-note-pe-label'>
                    <div className='label-basic'>
                        Blood Pressure
                    </div>
                    <div className='label-basic label-numbers data-sn'>
                        {info.physicalExam_BP}
                        {LastNote?.body2.physicalExam_BP}
                    </div>
                    <div className='label-basic'>
                        Pulse Rate
                    </div>
                    <div className='label-basic label-numbers data-sn'>
                        {info.physicalExam_pulse}
                        {LastNote?.body2.physicalExam_pulse}
                    </div>
                    <div className='label-basic'>
                        Height
                    </div>
                    <div className='label-basic label-numbers data-sn'>
                        {info.physicalExam_height}
                        {LastNote?.body2.physicalExam_height}
                    </div>
                    <div className='label-basic'>
                        Weight
                    </div>
                    <div className='label-basic label-numbers data-sn'>
                        {info.physicalExam_weight}
                        {LastNote?.body2.physicalExam_weight}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorNotePE;
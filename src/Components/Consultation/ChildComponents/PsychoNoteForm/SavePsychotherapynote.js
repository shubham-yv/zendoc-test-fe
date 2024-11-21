import React from 'react';
import '../../../../style/consultation/SavePsychoNote.css'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const SavePsychotherapynote = () => {
    return (
        <>
            <div className='Guardian-Container'>
                <div className='mt-2'>
                    <div className='dn-body-number-parent3'>
                        <div className='dn-body-number'>
                            <PeopleAltIcon/>
                        </div>
                        <div className='Guardian-Container-Sub1'>
                            <label className='label-basic-psych mt-2'>Guardian Name</label>
                            <span>Akram Malik</span>
                        </div>
                    </div>
                </div>
                <div >
                    <div className='dn-body-number-parent3'>
                        <div className='dn-body-number'>
                            <PersonAddAltIcon/>
                        </div>
                        <div className='Guardian-Container-Sub2'>
                            <label className='label-basic-psych mt-2'>Relationship</label>
                            <span>Friend</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>1</div>
                    <label className='Psyco-Note-label'>Symptom status</label>
                </div>
                <p className='PsycNote-P'>The core symptom of depressio</p>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>2</div>
                    <label className='Psyco-Note-label'>Diagnostic Change</label>
                </div>
                <p className='PsycNote-P'>Depressed mood is a symptom of some mood disorders such as major depressive disorder or dysthymia.</p>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>3</div>
                    <label className='Psyco-Note-label'>List Current Symptoms</label>
                </div>
                <p className='PsycNote-P'>Depressed mood is a symptom of some mood disorders such as major depressive disorder or dysthymia.</p>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>4</div>
                    <label className='Psyco-Note-label'>Life Events</label>
                </div>
                <p className='PsycNote-P'>Depressed mood is a symptom of some mood disorders such as major depressive disorder or dysthymia.</p>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>5</div>
                    <label className='Psyco-Note-label'>Medication</label>
                </div>
                <p className='PsycNote-P'>The core symptom of depressio</p>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>6</div>
                    <label className='Psyco-Note-label'>Safety</label>
                </div>
                <p className='PsycNote-P'>The core symptom of depressio</p>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>7</div>
                    <label className='Psyco-Note-label'>Goals/Objectives</label>
                </div>
                <ul style={{ listStyleImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%231E64CC\' viewBox=\'0 0 24 24\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'8\'/%3E%3C/svg%3E")' }}>
                    <div className='PsycNoteLi'>
                        <li>The core symptom of depression is said to be anhedonia, which refers to loss of interest or a loss of feeling of pleasure in certain activities that usually bring joy to people.</li>
                        <p>-</p>
                        <p>Yes</p>
                    </div>

                    <div className='PsycNoteLi'>
                        <li>The core symptom of depression is said to be anhedonia, which refers to loss of interest or a loss of feeling of pleasure in certain activities that usually bring joy to people.</li>
                        <p>-</p>
                        <p>Yes</p>
                    </div>

                    <div className='PsycNoteLi'>
                        <li>The core symptom of depression is said to be anhedonia, which refers to loss of interest or a loss of feeling of pleasure in certain activities that usually bring joy to people.</li>
                        <p>-</p>
                        <p>Yes</p>
                    </div>

                    <div className='PsycNoteLi'>
                        <li>The core symptom of depression is said to be anhedonia, which refers to loss of interest or a loss of feeling of pleasure in certain activities that usually bring joy to people.</li>
                        <p>-</p>
                        <p>Yes</p>
                    </div>
                </ul>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>8</div>
                    <label className='Psyco-Note-label'>Safety</label>
                </div>
                <p className='PsycNote-P'>Depressed mood is a symptom of some mood disorders such as major depressive disorder or dysthymia.</p>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>9</div>
                    <label className='Psyco-Note-label'>Overall progress towards goals</label>
                </div>
                <div className='IMAX'>
                    <p style={{ color: '#808495' }}>IMAX</p>
                    <p style={{ color: '#808495' }}>4</p>
                </div>
            </div>
            <div className="PsycNote">
                <div className='dn-body-number-parent2'>
                    <div className='dn-body-number'>10</div>
                    <label className='Psyco-Note-label'>Revised Goals/Objectives</label>
                </div>
                <ul style={{listStyle:'none'}} className='UL2'> 
                    <div className='PsycNoteLi2'>
                        <label htmlFor="" className='label-basic-psych'>Goal</label>
                        <li>Depressed mood is a symptom of some mood disorders such as major depressive disorder or dysthymia.</li>
                    </div>

                    <div className='PsycNoteLi2 mt-2'>
                        <label htmlFor="" className='label-basic-psych'>New Goal 1</label>
                        <li>Depressed mood is a symptom of some mood disorders such as major depressive disorder or dysthymia.</li>
                    </div>

                    <div className='PsycNoteLi2 mt-2'>
                        <label htmlFor="" className='label-basic-psych'>New Goal 2</label>
                        <li>Depressed mood is a symptom of some mood disorders such as major depressive disorder or dysthymia.</li>
                    </div>
                 
                </ul>
            </div>
        </>
    )
}

export default SavePsychotherapynote;
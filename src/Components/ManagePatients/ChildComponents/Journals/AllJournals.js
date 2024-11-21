// NewComponent.js
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../../../style/managePatients/mp-journals.css'
import SearchIcon from '@mui/icons-material/Search';

const NewComponent = ({ goBack }) => {
    return (
        <>
            <div className='Back-BTN'>
                <ArrowBackIcon onClick={goBack} />
            </div>
            <div className='JournalsSection-Container'>
                <div className='All-Journals'>
                    <div className='JournalsSection-Sub'>
                        <div>All Journals</div>
                        <div>
                            <SearchIcon />
                        </div>
                    </div>
                    <div className='ALL-Journals-Container-Main'>
                        <div className='All-Journals-Content'>
                            <div className='All-Journals-Main-Heading' >School Incident</div>
                            <div className='All-Journal-Date' >3/08/2020</div>
                        </div>
                        <div>The core symptom of depression …….</div>
                    </div>
                    <div className='ALL-Journals-Container-Main' style={{ margin: '1rem 0rem' }}>
                        <div className='All-Journals-Content'>
                            <div className='All-Journals-Main-Heading' >1st Breakup</div>
                            <div className='All-Journal-Date' >3/08/2020</div>
                        </div>
                        <div>The core symptom of depression …….</div>
                    </div>
                    <div className='ALL-Journals-Container-Main'>
                        <div className='All-Journals-Content'>
                            <div className='All-Journals-Main-Heading' >Future thoughts</div>
                            <div className='All-Journal-Date' >3/08/2020</div>
                        </div>
                        <div>The core symptom of depression …….</div>
                    </div>
                </div>
                <div className='JournalDescription'>
                    <div>
                        <div className='All-Journals-Content'>
                            <div className='All-Journals-Main-Heading' >School Incident</div>
                            <div className='All-Journal-Date' >Created - 13/08/2020</div>
                        </div>
                        <div className='All-Journal-Date'>
                            Last edited - 13/08/2020
                        </div>
                    </div>
                    <div className='JournalDescriptionContent'>
                        <h6>Thoughts</h6>
                        <p>When you were a teenager, you might have kept a diary hidden under your mattress. It was a place to confess your struggles and When you were a teenager, you might have kept a diary hidden under your mattress. It was a place to confess your struggles and</p>
                    </div>
                    <div className='JournalDescriptionContent'>
                        <h6>Pre - Situation</h6>
                        <p>When you were a teenager, you might have kept a diary hidden under your mattress. It was a place to confess your struggles and</p>
                    </div>
                    <div className='JournalDescriptionContent'>
                        <h6>Thoughts and emotions</h6>
                        <p>When you were a teenager, you might have kept a diary hidden under your mattress. It was a place to confess your struggles and</p>
                    </div>
                    <div className='JournalDescriptionContent'>
                        <h6>Physical / Mental symptoms</h6>
                        <p>Confess your struggles and</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewComponent;

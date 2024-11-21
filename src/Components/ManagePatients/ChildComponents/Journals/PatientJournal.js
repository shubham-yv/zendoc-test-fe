import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArticleIcon from '@mui/icons-material/Article';

const ThoughtJournal = ({ onArrowClick }) => {

    return (
        <>
            <div>
                <div className='Journal-Container'>
                    <h5 className='Journal-Heading'>Thought Journal</h5>
                    <p>New(4)</p>
                    <p>Modified on on 11/07/20</p>
                </div>
                <div className='Journal-Section' style={{ marginTop: '2rem' }}>
                    <div className='JournalContainer'>
                        <span className="JournalLogo">
                            <ArticleIcon style={{height:'20px'}}/>
                        </span>
                        <div className='SubJournalContent'>
                            <h6>School Incident</h6>
                            <p>Created on - 11/08/2020</p>
                        </div>
                    </div>
                    <div>
                        Last edited - 13/08/2020
                    </div>
                    <div>
                        43 pages
                    </div>
                    <div>
                        <ArrowForwardIosIcon onClick={onArrowClick} />
                    </div>
                </div>
                <div className='Journal-Section'>
                    <div className='JournalContainer'>
                        <span className="JournalLogo">
                            <ArticleIcon style={{height:'20px'}}/>
                        </span>
                        <div className='SubJournalContent'>
                            <h6>School Incident</h6>
                            <p>Created on - 11/08/2020</p>
                        </div>
                    </div>
                    <div>
                        Last edited - 13/08/2020
                    </div>
                    <div>
                        43 pages
                    </div>
                    <div>
                        <ArrowForwardIosIcon />
                    </div>
                </div>
                <div className='Journal-Section'>
                    <div className='JournalContainer'>
                        <span className="JournalLogo">
                            <ArticleIcon style={{height:'20px'}}/>
                        </span>
                        <div className='SubJournalContent'>
                            <h6>School Incident</h6>
                            <p>Created on - 11/08/2020</p>
                        </div>
                    </div>
                    <div>
                        Last edited - 13/08/2020
                    </div>
                    <div>
                        43 pages
                    </div>
                    <div>
                        <ArrowForwardIosIcon />
                    </div>
                </div>
                <div className='horizontal-line-activity'></div>
                <a href="" className="Previous">View all journals</a>
            </div>

        </>
    )
}

export default ThoughtJournal
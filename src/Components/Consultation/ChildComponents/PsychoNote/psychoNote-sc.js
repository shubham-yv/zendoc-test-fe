
import React from "react";


const PsychoNoteSessionContent = (props) => {
    const { SessionContent, ViewLastNoteSessionContent } = props;

    return (
        <div className='doc-note-tile'>
            <div className='dct-num'>
                3
            </div>
            <div className='dct-body'>
                <div className='label-basic'>
                    <b>
                        sessionContent
                    </b>
                </div>

                <div className='data-sn'>
                    <label htmlFor="" className='label-diagnosis'>General appearance, attitude, and behavior of the client</label>
                    <span style={{ marginLeft: '1rem' }}>
                        {SessionContent.generalAppearance}
                        {ViewLastNoteSessionContent.generalAppearance}
                    </span>
                </div>
                <div className='data-sn'>
                    <label htmlFor="" className='label-diagnosis'>Rapport</label>
                    <span style={{ marginLeft: '1rem' }}>
                        {SessionContent.rapport}
                        {ViewLastNoteSessionContent.rapport}
                    </span>
                </div>
                <div className='data-sn'>
                    <label htmlFor="" className='label-diagnosis'>Agenda of the session/Topic Discussed</label>
                    <span style={{ marginLeft: '1rem' }}>
                        {SessionContent.sessionAgenda}
                        {ViewLastNoteSessionContent.sessionAgenda}
                    </span>

                </div>
                <div className='data-sn'>
                    <label htmlFor="" className='label-diagnosis'>Client’s Mood and Affect</label>
                    <span style={{ marginLeft: '1rem' }}>
                        {SessionContent.moodAndAffect}
                        {ViewLastNoteSessionContent.moodAndAffect}
                    </span>


                </div>
                <div className='data-sn'>
                    <label htmlFor="" className='label-diagnosis'>Miscellaneous findings</label>
                    <span style={{ marginLeft: '1rem' }}>
                        {SessionContent.miscellaneousFindings}
                        {ViewLastNoteSessionContent.miscellaneousFindings}
                    </span>


                </div>
                {/* <div className='data-sn'>
                    {props.info.body2}
                </div> */}
            </div>
        </div>
    )
}

export default PsychoNoteSessionContent;
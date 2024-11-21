import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PsychoNoteInput from '../PsychoNoteForm/psychoNote-input';
import { writePsychoNote as PsycNote, getPsychoNoteDetails as fetchPsychoNoteDetails } from '../../../../Actions/consultation';
import { getUserIDFromIndexedDB } from '../../../../Actions/indexedDB';

const PsychoNoteForm = ({ patientID }) => {

    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const userID = await getUserIDFromIndexedDB();
                setUserID(userID);
            } catch (error) {
                console.error("Error fetching userID from IndexedDB:", error);
            }
        };
        fetchUserID();
    }, []);

    const dispatch = useDispatch();

    const writePsychoNote = () => {
        dispatch(PsycNote(false));
    }

    const getPsychoNoteDetails = () => {
        dispatch(fetchPsychoNoteDetails({
            patID: patientID,
            userID: userID
        }));
    }

    return (
        <div className='doc-note-form'>
            <div className='dnf-header2'>
                <div className='fas fa-arrow-left dnf-back' onClick={writePsychoNote}></div>
                <div className='dnf-header-text'><b>Psychotherapy note</b></div>
                <div onClick={getPsychoNoteDetails} className='dnf-last-note'>View Last Note</div>
            </div>
            <div className='dnf-body'>
                <PsychoNoteInput />
            </div>
        </div>
    );
}


const mapStatetoProps = (state) => {

    const patientID = state.patientDetails.patientInfo.patientid ? state.patientDetails.patientInfo.patientid : null;

    return {
        patientID: patientID,
    };
};

export default connect(mapStatetoProps)(PsychoNoteForm);

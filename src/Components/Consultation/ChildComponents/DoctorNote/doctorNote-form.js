import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import DoctorNoteInput from '../DoctorNoteForm/doctorNote-input';
import { writeDoctorNote as DocNote, getDoctorNoteDetails as fetchDoctorNoteDetails } from '../../../../Actions/consultation';
import '../../../../style/consultation/doctorNote-form.css'
import { getUserIDFromIndexedDB } from '../../../../Actions/indexedDB';
import { navigateBack } from '../../../../Actions/consultation'


const DoctorNoteForm = ({ patientID }) => {

    const [userID, setUserID] = useState(null);
    const navigateBackFlag = useSelector(state => state.patientDetails.navigateBack);

    useEffect(() => {
        if (navigateBackFlag) {
            dispatch(DocNote(false));
        }
    }, [navigateBackFlag, dispatch]);

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

    const writeDoctorNote = () => {
        dispatch(DocNote(false));
    }

    const getDoctorNoteDetails = () => {
        dispatch(fetchDoctorNoteDetails({
            patID: patientID,
            userID: userID
        }));
    }

    return (
        <div className='doc-note-form'>
            <div className='dnf-header2'>
                <div className='fas fa-arrow-left dnf-back' onClick={writeDoctorNote}></div>
                <div className='dnf-header-text'><b>Doctor's Note</b></div>
                <div onClick={getDoctorNoteDetails} className='dnf-last-note'>View Last Note</div>
            </div>
            <div className='dnf-body'>
                <DoctorNoteInput />
            </div>
        </div>
    );
}

const mapStatetoProps = (state) => {

    const patientID = state.patientDetails.patientInfo.patientid ? state.patientDetails.patientInfo.patientid : null;

    return {
        patientID: patientID
    };
};

export default connect(mapStatetoProps)(DoctorNoteForm);

import React from 'react';
import { useDispatch } from 'react-redux';
import { writePsychoNote, getPsychoNoteDetails } from '../../../../Actions/consultation';
import PsychoNoteForm from '../PsychoNoteForm/psychoNote-input';
import '../../../../style/consultation/psycho-note.css';

const PsychoNote = () => {


    let myDate = new Date();
    let hrs = myDate.getHours();

    let greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hours = today.getHours() % 12;
    var time = hours + ":" + today.getMinutes() + " " + (today.getHours() > 12 ? "PM" : "AM");
    today = mm + '/' + dd + '/' + yyyy + "   " + time;


    const dispatch = useDispatch();

    const writePsychoNote = () => {
        dispatch(writePsychoNote(false));
    }

    const getPsychoNoteDetails = () => {
        dispatch(getPsychoNoteDetails({
            patID: '_asllskk',
            userID: '_aslsasa'
        }));
    }

    return (
        <div className='psy-note-form'>
            <div className='pnf-header'>
                <div className='pnf-back fas fa-arrow-left' onClick={writePsychoNote}></div>
                <div className='pnf-header-text'>Psychotherapy Note</div>
               {/* <div className='pnf-header-time'>{today}</div>  */}
                <div onClick={getPsychoNoteDetails} className='pnf-last-note'>View Last Note</div>
            </div>
            <div className='pnf-body'>
                <PsychoNoteForm />
            </div>
        </div>
    );
}

export default PsychoNote;

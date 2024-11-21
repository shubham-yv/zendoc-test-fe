import React from "react";

import PatientNoteBody from "./mp-patientNote";

const PatientHistory = ({ patientHistory }) => {

  if (!patientHistory || !patientHistory.doctorNotes || patientHistory.doctorNotes.length === 0 || !patientHistory.drugs) {
    return <div>No history available</div>;
  }

  const getNotesList = (notes) => {
    return notes.map((note) => (
      <PatientNoteBody
        key={note.docNoteID}
        doctorNote={note}
        drugs={patientHistory.drugs || []}
        tools={patientHistory.tools || []}
      />
    ));
  };

  const getNotesListmv = (notes) => {
    return notes.map((note) => (
      <React.Fragment key={note.docNoteID}>
        <div className="mp-ph-bodymv">
          <div className="mp-ph-notes-headermv">
            <div>Session</div>
            <div>Date / Time</div>
            <div>Patient Name / Guardian</div>
            <div>Consulted By</div>
            <div>Reason to Visit</div>
            <div></div>
          </div>
          <PatientNoteBody
            doctorNote={note}
            drugs={patientHistory.drugs || []}
            tools={patientHistory.tools || []}
          />
        </div>
      </React.Fragment>
    ));
  };

  const notesList = getNotesList(patientHistory.doctorNotes);
  const notesListmv = getNotesListmv(patientHistory.doctorNotes);

  return (
    <>
      <div className="mp-patientHistory">
        <div className="mp-ph-header">
          <label className="label-basic">Doctor's Notes</label>
          <div className="mp-ph-buttons">

            <div className='SelectDoctor'>
              <select id="selectDoctorDropdown">
                <option value="doctor1">Select Doctor</option>
                <option value="doctor2">Doctor 2</option>
                <option value="doctor3">Doctor 3</option>
              </select>
            </div>

            <div className='latestfirst' >
              <select id="latestFirstDropdown">
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

          </div>
        </div>
        <div className="mp-ph-body">
          <div className="mp-ph-notes-header">
            <div className="mp-nh-session">Session</div>
            <div className="mp-nh-date">Date / Time</div>
            <div className="mp-nh-patient">Guardian Name</div>
            <div className="mp-nh-doctor">Consulted By</div>
            <div className="mp-nh-visit">Reason to Visit</div>
            <div className="mp-nh-icon"></div>
          </div>
          <div className="mp-ph-notes-body">{notesList}</div>
        </div>
      </div>
      {notesListmv}
    </>
  );
};

export default PatientHistory;

import React from 'react';;
import DoctorNoteMSE from '../../../Consultation/ChildComponents/DoctorNote/docNote-mse.js';
import DoctorNoteTile from '../../../Consultation/ChildComponents/DoctorNote/docNote-tile.js';
import DoctorNotePE from '../../../Consultation/ChildComponents/DoctorNote/docNote-pe.js';

const SelectedDoctorNote = ({ doctorNoteDetail }) => {

    const getIllnessDurationText = () => {
        let illnessDuration = doctorNoteDetail.illnessDurationNumber;
        switch (doctorNoteDetail.illnessDurationUnit) {
            case "1":
                illnessDuration += " week(s)";
                break;
            case "2":
                illnessDuration += " day(s)";
                break;
            default:
                break;
        }
        return illnessDuration;
    }

    const getIllnessText = () => {
        let illnessText = "";
        switch (doctorNoteDetail.illnessType) {
            case "1":
                illnessText += " week(s)";
                break;
            case "2":
                illnessText += " day(s)";
                break;
            default:
                break;
        }
        return illnessText;
    }

    const illnessDuration = getIllnessDurationText();
    const illnessText = getIllnessText();

    const { patChiefComplaints, relevantHistory, pastHistory, personaTemperTraits, provisionalDiagnosis, physicalExam_BP, physicalExam_pulse, physicalExam_height, physicalExam_weight, MSE_GAB, MSE_PMA, MSE_mood_affect, MSE_thought_content, MSE_perception, MSE_HMFCogn, MSE_speech_quantity, MSE_speech_rate, MSE_speech_reactionTime, MSE_speech_tone, MSE_speech_volume
    } = doctorNoteDetail;

    return (
        <div className='doc-info-parent'>
            <div className='dci-header'>
                <div className='doc-note-head-main'>Doctor's Note</div>
                <div className='label-basic'>Date</div>
            </div>
            <div className='dci-body'>
                <div className='dci-pinfo'>
                    <div className='dci-pinfo-row'>
                        <div className='label-basic'>Guardian Name</div>
                        <div className='label-basic'>Guardian Name</div>
                    </div>
                    <div className='dci-pinfo-row'>
                        <div className='label-basic'>Relationship with Patient</div>
                        <div className='label-basic'>Guardian Name</div>
                    </div>
                    <div className='dci-pinfo-row'>
                        <div className='label-basic'>Problem</div>
                        <div className='label-basic'>{illnessText}</div>
                    </div>
                    <div className='dci-pinfo-row'>
                        <div className='label-basic'>Duration of illness</div>
                        <div className='label-basic'>{illnessDuration}</div>
                    </div>
                </div>
                <React.Fragment>
                    <DoctorNoteTile number="1" info={{ title: "Patient Chief Complaint", body: patChiefComplaints }} />
                    <DoctorNoteTile number="2" info={{ title: "Relevant History", body: relevantHistory }} />
                    <DoctorNoteTile number="3" info={{ title: "Past History", body: pastHistory }} />
                    <DoctorNoteTile number="4" info={{ title: "Personality / Temperament Traits", body: personaTemperTraits }} />
                    <DoctorNoteMSE number="5" info={{ MSE_GAB, MSE_PMA, MSE_mood_affect, MSE_thought_content, MSE_perception, MSE_HMFCogn, MSE_speech_quantity, MSE_speech_rate, MSE_speech_reactionTime, MSE_speech_tone, MSE_speech_volume }} />
                    <DoctorNoteTile number="6" info={{ title: "Provisional Diagnosis", body: provisionalDiagnosis }} />
                    <DoctorNotePE number="7" info={{ physicalExam_BP, physicalExam_pulse, physicalExam_height, physicalExam_weight }} />
                </React.Fragment>
            </div>
        </div>
    );
}

export default SelectedDoctorNote;

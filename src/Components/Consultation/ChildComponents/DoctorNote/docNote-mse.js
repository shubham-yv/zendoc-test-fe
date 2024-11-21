import React from "react";

const DoctorNoteMSE = (props) => {
    const { LastNote, info } = props;
    const MSEOption = [
        { value: 1, name: 'Increase' },
        { value: 2, name: 'Decrease' },
        { value: 3, name: 'Normal' },
    ];

    const MSEVolumeOption = [
        { value: 1, name: 'High' },
        { value: 2, name: 'Low' },
        { value: 3, name: 'Normal' },
    ];

    const MSEPMA = MSEOption.find(option => option.value == (props.info.MSE_PMA) || (props.LastNote?.body2.MSE_PMA));

    const MSEQuantity = MSEOption.find(option => option.value == (props.info.MSE_speech_quantity) || (props.LastNote?.body2.MSE_speech_quantity));

    const MSERate = MSEOption.find(option => option.value == (props.info.MSE_speech_rate) || (props.LastNote?.body2.MSE_speech_rate));

    const MSEReactionTime = MSEOption.find(option => option.value == (props.info.MSE_speech_reactionTime) || (props.LastNote?.body2.MSE_speech_reactionTime));

    const MSEVolume = MSEVolumeOption.find(option => option.value == (props.info.MSE_speech_volume) || (props.LastNote?.body2.MSE_speech_volume));


    return (
        <div className='doc-note-mse'>
            <div className='dct-num'>
                5
            </div>
            <div className='doc-mse-body'>
                <div className='label-basic'>
                    Mental Status Examination findings (MSE)
                </div>
                <div className='doc-mse-info'>
                    <ul>
                        <li>
                            <div className='label-basic'>
                                GAB (General Appearance and Behavior)
                            </div>
                            <div className='data-sn'>
                                {info.MSE_GAB}
                                {LastNote?.body2.MSE_GAB}
                            </div>
                        </li>
                        <li>
                            <div className='label-basic'>
                                PMA (Psychomotor Activity)
                            </div>
                            <div className='data-sn'>
                                {MSEPMA ? MSEPMA.name : null}
                            </div>
                        </li>
                        <li className="speechdiv">
                            <div className='label-basic'>
                                Speech
                            </div>
                            <div className="msequantity">
                                <div className='label-basic MSE-speech-sub' >
                                    <div className="MSESpeech" >
                                        <span >
                                            Quantity
                                        </span>
                                        <span className="MSE-Span">
                                            {MSEQuantity ? MSEQuantity.name : null}
                                        </span>
                                    </div>
                                    <div className="MSESpeech">
                                        <span  >
                                            Rate
                                        </span >
                                        <span className="MSE-Span">
                                            {MSERate ? MSERate.name : null}
                                        </span>
                                    </div>

                                    <div className="MSESpeech">
                                        <span  >
                                            Tone
                                        </span>
                                        <span className="MSE-Span">
                                            {info.MSE_speech_tone}
                                            {LastNote?.body2.MSE_speech_tone}
                                        </span>
                                    </div>
                                </div>
                                <div className="MSE-speech-sub">
                                    <div className="MSESpeech">
                                        <span className="MSESpeech">
                                            Volume
                                        </span>
                                        <span className="MSE-Span">

                                            {MSEVolume ? MSEVolume.name : null}

                                        </span>
                                    </div>
                                    <div className="MSESpeech">
                                        <span  >
                                            Reaction time
                                        </span>
                                        <span className="MSE-Span">
                                            {MSEReactionTime ? MSEReactionTime.name : null}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='label-basic'>
                                Mood and Effect
                            </div>
                            <div className='data-sn'>
                                {info.MSE_mood_affect}
                                {LastNote?.body2.MSE_mood_affect}
                            </div>
                        </li>
                        <li>
                            <div className='label-basic'>
                                Thought
                            </div>
                            <div className='data-sn'>
                                {info.MSE_thought_content}
                                {LastNote?.body2.MSE_thought_content}
                            </div>
                        </li>
                        <li>
                            <div className='label-basic'>
                                Perception
                            </div>
                            <div className='data-sn'>
                                {info.MSE_perception}
                                {LastNote?.body2.MSE_perception}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DoctorNoteMSE;

import React from "react";

const DoctorNoteTile = (props) => {

    const { LastNote } = props;

    const body2 = LastNote && LastNote.body2;

    return (
        <div className='doc-note-tile'>
            <div className='dct-num'>
                {props.number}
            </div>
            <div className='dct-body'>
                <div className='label-basic'>
                    <b>
                        {props.info.title}
                    </b>
                </div>
                <div className='data-sn'>
                    {props.info.body}

                    {body2 && body2}
                </div>
            </div>
        </div>
    )
}

export default DoctorNoteTile;

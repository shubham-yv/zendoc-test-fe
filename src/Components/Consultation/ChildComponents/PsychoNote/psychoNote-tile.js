
import React from "react";


const PsychoNoteTile = (props) => {

    const { viewLastNote } = props;
    const body2 = viewLastNote && viewLastNote.body2;

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
                {/* <div className='data-sn'>
                    {props.selectedRelationship2 ? props.selectedRelationship2.name : null}
                    {props.selectedRelationship3 ? props.selectedRelationship3.name : null}
                </div> */}
                <div className='data-sn'>
                    {props.info.body}
                    {body2 && body2}
                </div>
                {/* <div className='data-sn'>
                    {props.info.body2}
                </div> */}
            </div>
        </div>
    )
}

export default PsychoNoteTile;
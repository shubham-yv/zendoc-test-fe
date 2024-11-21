import React from 'react';
import SpecializedIcon from '../../../style/images/Spec.svg';

const Specialized = ({ specializedArray }) => {
    return (
        <>
            <div className="SpecializedContainer">
                <div>
                    <img src={SpecializedIcon} alt="Specialized Icon" />
                </div>
                <div className='SpecializedContainerSub2'>
                    <h6><b>Specialized</b></h6>
                    <ul>
                        {specializedArray.length > 0 ? (
                            specializedArray.map((spec, index) => (
                                <li key={index}>{spec}</li>
                            ))
                        ) : (
                            <li>No specialized information available</li>
                        )}
                    </ul>
                    {/* <button>+ Add New</button> */}
                </div>
            </div>
        </>
    );
};

export default Specialized;

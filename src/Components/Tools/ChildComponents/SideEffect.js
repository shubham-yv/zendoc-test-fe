import React from 'react';
import '../../../style/Tools/SideEffect.css';

const SideEffect = ({ sideEffects }) => {
    const renderSideEffects = () => {
        if (!sideEffects || !sideEffects.sideEffects || !Array.isArray(sideEffects.sideEffects) || sideEffects.sideEffects.length === 0) {
            return (
                <div className="no-side-effects-message">
                    No side effects Available
                </div>
            );
        }

        return (
            <div className="drug-details">
                {sideEffects.sideEffects.map((effects, index) => (
                    <div key={index}>
                        {effects.map((effect, subIndex) => (
                            <div key={subIndex}>
                                <h6 className='Side-Effect-H6'>Interaction Side Effects</h6>
                                <p>{effect.interactionSideEffect}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='Side-Effects-Main-Container'>
            <div className="Search_Drug_Main_Container">
                <div className="Side-Effects">
                    <h5 className="Side-Effect-H5">Side Effects</h5>
                    {renderSideEffects()}
                </div>
            </div>
        </div>
    );
}

export default SideEffect;

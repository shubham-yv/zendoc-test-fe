import React from 'react';
import ExperienceIcon from '../../../style/images/ExperienceIcon.svg';

const Experience = ({ experienceArray }) => {
    return (
        <>
            <div className="ExperienceContainer">
                <div>
                    <img src={ExperienceIcon} alt="Experience Icon" />
                </div>
                <div className='ExperienceContainerSub2'>
                    <h6><b>Experience</b></h6>
                    <ul>
                        {experienceArray.length > 0 ? (
                            experienceArray.map((exp, index) => (
                                <li key={index}>{exp}</li>
                            ))
                        ) : (
                            <li>No experience information available</li>
                        )}
                    </ul>
                    {/* <button>+ Add New</button> */}
                </div>
            </div>
        </>
    );
};

export default Experience;

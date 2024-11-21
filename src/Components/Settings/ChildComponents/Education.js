import React from 'react';
import EducationGroup from '../../../style/images/EducationGroup.svg';

const Education = ({ educationArray }) => {
    return (
        <>
            <div className="EducationContainer">
                <div>
                    <img src={EducationGroup} alt="Education Group" />
                </div>
                <div className='EducationContainerSub2'>
                    <h6><b>Education</b></h6>
                    <ul>
                        {educationArray.length > 0 ? (
                            educationArray.map((edu, index) => (
                                <li key={index}>{edu}</li>
                            ))
                        ) : (
                            <li>No education information available</li>
                        )}
                    </ul>
                    {/* <button>+ Add New</button> */}
                </div>
            </div>
        </>
    );
};

export default Education;

import React from 'react'
import Forgot from './Forgot';
import '../../style/authentication/authenticationPage.css';

const ForgotPassowrdPage = () => {
    return (
        <div className='landing-page-container'>
            <div className='lp_left-pane3'>
                <h1 className='lp_left-pane-h12'>
                    Store all your patient data <br /> in one place
                </h1>
            </div>
            <div className='lp_right-pane'>
                <div className='lp_body'>
                    <Forgot />
                </div>
            </div>
        </div>
    );
}

export default ForgotPassowrdPage
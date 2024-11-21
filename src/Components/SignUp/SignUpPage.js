import React from 'react';
import SignUp from './signup';
import '../../style/authentication/authenticationPage.css';

const SignUpPage = () => {
    return (
        <div className='landing-page-signup-container'>
            <div className='lp_left-pane2'>
                <h1 className='lp_left-pane-h12'>
                    Tracking your patient’s activity <br /> is now Easy !
                </h1>
            </div>
            <div className='lp_right-pane'>
                <div className='lp_body2'>
                    <SignUp />
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;

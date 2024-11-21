import React from 'react';
import SignIn from './signin';
import '../../style/authentication/authenticationPage.css';

const AuthenticationPage = () => {
    return (
        <div className='landing-page-container'>
            <div className='lp_left-pane'>
                <h1 className='lp_left-pane-h1'>
                    We make your procress <br /> simple and Easy
                </h1>
            </div>
            <div className='lp_right-pane'>
                <div className='lp_body'>
                    <SignIn />
                </div>
            </div>
        </div>
    );
};

export default AuthenticationPage;

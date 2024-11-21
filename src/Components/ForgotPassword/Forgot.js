import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../Actions/authentication';

const Forgot = ({ login }) => {
    const [formData, setFormData] = useState({ useremail: '' });

    const { useremail } = formData;

    const loginHandler = () => {
        login(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginHandler();
    };

    return (
        <div className='sign-up-container'>
            <div className='sign-up-controls'>
                <div className='lp-parent-container-image-parent'>
                    <div className='lp-parent-container-image fas fa-head-side-virus'></div>
                    <div className='lp-parent-container-image-text'>
                        ZenDoc
                    </div>
                </div>
                <div className='lp-parent-container-choose'>
                    <span className='label-forgot'>Enter your email and we send you a password reset link.</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='lp-parent-container'>
                        <div className="ui transparent input">
                            <input name='useremail' type='email' onChange={handleChange} value={useremail} placeholder='Email Address' required />
                        </div>
                    </div>

                    <div className='lp-parent-container-signup'>
                        <div className='no-border'>
                            <input className='avg-button no-border-btn btn--border-radius pa-btn ui button mini btn--padding-lr d-block mx-auto' type='submit' value='Send Request' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { login })(Forgot);

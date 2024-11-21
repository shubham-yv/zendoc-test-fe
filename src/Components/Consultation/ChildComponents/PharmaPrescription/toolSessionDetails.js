import React, { useState } from 'react';

const ToolSessionDetails = ({ handleSessionDetails, tool, handleClose }) => {
    const [state, setState] = useState({
        motivationalMessage: '',
        supportContact: '',
    });

    const handleMotivationalMessageChange = (e) => {
        setState({ ...state, motivationalMessage: e.target.value });
    };

    const handleSupportContactChange = (e) => {
        setState({ ...state, supportContact: e.target.value });
    };

    const handleSaveTask = () => {

        const toolDetails = {
            toolName: tool.title,
            toolRepetition: "",
            toolDuration: state.Duration,
            toolMotivationMsg: state.motivationalMessage,
            toolSupportContact: state.supportContact
        };

        handleSessionDetails({ toolDetails });

        handleClose()
        setState({ motivationalMessage: '', supportContact: '' });
    };

    return (
        <div className='tool-session-details' style={{ width: '100%' }}>

            <div className='ToolSesseion-Con'>
                <label>Motivational Message</label>
                <textarea
                    className='form-control'
                    value={state.motivationalMessage}
                    onChange={handleMotivationalMessageChange}
                />
            </div>
            <div className='ToolSesseion-Con'>
                <label>Support Person Contact</label>
                <input
                    type='text'
                    className='form-control'
                    value={state.supportContact}
                    onChange={handleSupportContactChange}
                />
            </div>
            <div className="ToolDetailBTNG" style={{ marginTop: '1rem' }}>
                <button className='' onClick={handleClose}>Close</button>
                <button className='' onClick={handleSaveTask}>
                    <i className="fas fa-plus" style={{ marginRight: '15px' }}></i>
                    Add Task</button>
            </div>
        </div>
    );
};

export default ToolSessionDetails;

import React, { useState } from 'react'
import '../../../style/consultation/VerifyPatient.css'

const VerifyPatient = () => {

    const [showModalOne, setShowModalOne] = useState(false);
    const [showModalTwo, setShowModalTwo] = useState(false);

    const handleCloseModalOne = () => {
        setShowModalOne(false);
        setShowModalTwo(true);
    };

    const handleCloseModalOneCross = () => {
        setShowModalOne(false);
        setShowModalTwo(false);
    };

    return (
        <div>
            <Modal show={showModalOne} onHide={handleCloseModalOneCross} centered
                style={{ maxWidth: '800px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{
                            width: "100%",
                            fontSize: "34px",
                        }}
                    >
                        Patient Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div className='d-flex'>
                        <div className="VerifyImage"></div>
                        <br />
                        <div className='d-flex flex-direction-column'>
                            <p>Visitor Name</p>
                            <p>  Adams Will</p>
                        </div>
                        <div className='d-flex flex-direction-column'>
                            <p>Age</p>
                            <p>29</p>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <p>+91-8384494992</p>
                            <p>itsmeexample001@gmail.com</p>
                        </div>
                    </div>


                    <hr />
                    <div
                        style={{ display: "flex", justifyContent: "center", gap: "10px", padding: '1rem' }}
                    >
                        <label htmlFor="">Confirm Patient through OTP verification</label>
                        <Button onClick={handleCloseModalOne} variant="primary"
                            style={{
                                backgroundColor: '#FF9241',
                                color: 'white',
                                width: '150px',
                                height: '50px',
                                border: 'none'
                            }}>
                            Request OTP
                        </Button>

                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showModalTwo} centered onHide={handleCloseModalOneCross}
                style={{ maxWidth: '600px', width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Verify Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div className="ModelImage2"></div>
                    <br />
                    <h3 style={{ color: '#257D79', fontWeight: 'bold', textAlign: 'center' }}>
                        Enter OTP
                    </h3>
                    <input type="text" />
                    <label htmlFor="">OTP will be sent to patient’s registered mobile number</label>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Button onClick={handleOpenModalThree} variant="light" style={{ backgroundColor: '#EDF4FD', color: '#1E64CC', borderRadius: '1px', width: '150px' }}>
                            Re-send OTP
                        </Button>
                    </div>
                    <Button onClick={handleCloseModalOne} variant="primary"
                        style={{
                            backgroundColor: '#FF9241',
                            color: 'white',
                            width: '150px',
                            height: '50px',
                            border: 'none'
                        }}>
                        Confirm
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default VerifyPatient

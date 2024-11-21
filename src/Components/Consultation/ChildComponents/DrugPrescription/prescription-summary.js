import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../../../style/consultation/prescript-view.css'; // Import CSS file
import { getDrugSdeEffectsForPres } from "../../../../Actions/tools";
import Warninng from '../../../../style/images/Icon material-warning.svg'
import CloseIcon from '@mui/icons-material/Close';

function PrescriptionSummary({ patientID, userID, onAddPrescription, sideEffect, getDrugSdeEffectsForPres, localPrescriptions, setLocalPrescriptions }) {
    // const [localPrescriptions, setLocalPrescriptions] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedDrug, setEditedDrug] = useState({});
    const [sideEffectNotifications, setSideEffectNotifications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Alert, setAlert] = useState(true)
    const [SecondAlert, SecondsetAlert] = useState(true)
    const [drugLimitReached, setDrugLimitReached] = useState(false);

    useEffect(() => {
        if (!patientID) return;
        const storedDrugs = JSON.parse(localStorage.getItem('prescriptionDrugs')) || [];
        const filteredDrugs = storedDrugs
            .filter(item => item.UsrInfo.patientID === patientID)
            .flatMap(item => item.drug);

        // Using a Set to avoid duplicate drugs
        const uniqueDrugs = [...new Map(filteredDrugs.map(drug => [drug.drugName, drug])).values()];

        setLocalPrescriptions(uniqueDrugs);
        setDrugLimitReached(uniqueDrugs.length >= 10);
        fetchSideEffects(uniqueDrugs);
    }, [patientID]);

    const Close = () => {
        setAlert(false)
    }

    const ClosePrescriptionWarning = () => {
        SecondsetAlert(false)
    }

    useEffect(() => {
        if (localPrescriptions.length > 0) {
            fetchSideEffects(localPrescriptions);
        }
    }, [localPrescriptions]);

    const fetchSideEffects = async (drugs) => {
        if (drugs.length > 0) {
            const firstDrug = drugs[0];
            const latestDrug = drugs[drugs.length - 1];
            if (firstDrug && latestDrug) {
                const data = {
                    getdrugName: firstDrug.drugName,
                    getDrugInteraction: latestDrug.drugName
                };
                const response = await getDrugSdeEffectsForPres(data);
                if (response) {
                    setSideEffectNotifications(response);
                    setIsModalOpen(true);
                }
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleAddDrugClick = () => {
        onAddPrescription();

        const storedDrugs = JSON.parse(localStorage.getItem('prescriptionDrugs')) || [];
        const filteredDrugs = storedDrugs.filter(item => item.UsrInfo.patientID === patientID).map(item => item.drug);
        setLocalPrescriptions(filteredDrugs);
        setDrugLimitReached(filteredDrugs.length >= 10);
        if (filteredDrugs.length > 0) {
            fetchSideEffects(filteredDrugs);
        }
    };


    const handleDeleteDrug = (index) => {
        const updatedDrugs = JSON.parse(localStorage.getItem('prescriptionDrugs')) || [];
        const filteredDrugs = updatedDrugs.filter(item => item.UsrInfo.patientID === patientID);
        filteredDrugs.splice(index, 1);
        localStorage.setItem('prescriptionDrugs', JSON.stringify(filteredDrugs));
        setLocalPrescriptions(filteredDrugs.map(item => item.drug));
        setDrugLimitReached(filteredDrugs.length >= 10);
    };

    const handleEditDrug = (index) => {
        setEditingIndex(index);
        setEditedDrug({ ...localPrescriptions[index] });
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedDrug((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSaveEdit = () => {
        const updatedDrugs = JSON.parse(localStorage.getItem('prescriptionDrugs')) || [];
        const filteredDrugs = updatedDrugs.filter(item => item.UsrInfo.patientID === patientID);
        filteredDrugs[editingIndex].drug = editedDrug;
        updatedDrugs.forEach((item, index) => {
            if (item.UsrInfo.patientID === patientID) {
                updatedDrugs[index] = filteredDrugs[index];
            }
        });
        localStorage.setItem('prescriptionDrugs', JSON.stringify(updatedDrugs));
        setLocalPrescriptions(filteredDrugs.map(item => item.drug));
        setEditingIndex(null);
        setEditedDrug({});
        setDrugLimitReached(filteredDrugs.length >= 10);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditedDrug({});
    };

    return (
        <>
            <div className="w-100">
                <button className="button-basics medium-button transparent-button--blue w-100" onClick={handleAddDrugClick}>
                    <i className="fas fa-plus" style={{ marginRight: '15px' }}></i>
                    Add Drug
                </button>
            </div>
            <div className='pres-summary'>
                <div className='pres-summary-header label-basic'>Summary</div>
                {localPrescriptions && localPrescriptions.length > 0 ? (
                    <div className='summary-list'>
                        <div className='summary-list-header'>
                            <div className='label-basic'>S. No</div>
                            <div className='label-basic'>Drug Name</div>
                            <div className='label-basic'>Dose</div>
                            <div className='label-basic'>Repetition</div>
                            <div className='label-basic'>Intake</div>
                            <div className='label-basic summary-icons'></div>
                            <div className='label-basic summary-icons'></div>
                        </div>

                        {localPrescriptions.map((drug, index) => (
                            <div key={index} className="summary-list-item">
                                {editingIndex === index ? (
                                    <>
                                        <div className="label-basic">{index + 1}</div>
                                        <input className="label-basic" name="drugName" value={editedDrug.drugName} onChange={handleEditChange} />
                                        <input className="label-basic" name="dosage" value={editedDrug.dosage} onChange={handleEditChange} />
                                        <input className="label-basic" name="repetition" value={editedDrug.repetition} onChange={handleEditChange} />
                                        <select className="label-basic" name="afterFood" value={editedDrug.intake} onChange={handleEditChange} style={{ padding: '4px' }}>
                                            <option value="1">After Food</option>
                                            <option value="0">Empty</option>
                                        </select>
                                        <button className="summary-btn" onClick={handleSaveEdit}>Save</button>
                                        <button className="summary-btn" onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <div className="label-basic">{index + 1}</div>
                                        <div className="label-basic">{drug.drugName}</div>
                                        <div className="label-basic">{drug.dosage} mg</div>
                                        <div className="label-basic">{drug.repetition}</div>
                                        <div className="label-basic">{drug.intake}</div>
                                        <div className="label-basic summary-icons">
                                            <EditIcon onClick={() => handleEditDrug(index)} />
                                        </div>
                                        <div className="label-basic summary-icons">
                                            <DeleteIcon onClick={() => handleDeleteDrug(index)} />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                        {/* <div className="button-container-new" >
                            <hr className="line" />
                            <button className="styled-button-new" onClick={handleAddDrugClick}>
                                <i className="fas fa-plus"></i>
                            </button>
                            <hr className="line" />
                        </div> */}
                        {/* <div className="button-label-new" onClick={handleAddDrugClick}>Add Drug</div> */}

                        {Alert &&
                            <div className="side-effect-notifications">

                                {sideEffect && sideEffect.length > 0 && sideEffect[0] !== null ? (
                                    <div className="side-effect-pres-container">
                                        <div className="side-effect-pres-container-div">
                                            <div> <img src={Warninng} alt="" />
                                                <span>Side effects</span></div>
                                            <div className="close-ide-effect" onClick={Close}><CloseIcon /></div>
                                        </div>
                                        <div className="side-effect-pres-container-div-2">Side effects Found, Please Check Drug Interaction Reaction For more information</div>
                                    </div>
                                ) : (
                                    <span></span>
                                )}

                            </div>
                        }
                        {SecondAlert &&
                            <div className="side-effect-notifications">
                                {drugLimitReached && (
                                    <div className="side-effect-pres-container">
                                        <div className="side-effect-pres-container-div">
                                            <div> <img src={Warninng} alt="" />
                                                <span>Prescription Limit</span></div>
                                            <div className="close-ide-effect" onClick={ClosePrescriptionWarning}><CloseIcon /></div>
                                        </div>
                                        <div className="side-effect-pres-container-div-2">You Can Prescribe Only 10 Drugs in a Single Prescription</div>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                ) : (
                    <div className='no-summary'>
                        <div className='label-basic'>Add any drug</div>
                        <div className='label-basic'>Or</div>
                        <div className='no-summary-cst label-basic'></div>
                        <div className='label-basic'>Click CST to add prescription from last session</div>
                    </div>
                )}

            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    patientID: state.patientDetails?.patientInfo?.patientid,
    sideEffect: state.toolsreducer.sideEffect
});

const mapDispatchToProps = {
    getDrugSdeEffectsForPres
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionSummary);

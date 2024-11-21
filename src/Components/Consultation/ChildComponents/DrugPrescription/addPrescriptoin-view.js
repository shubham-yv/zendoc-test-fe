import React, { useState, useCallback, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash'; // Import lodash for debounce
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getDrugDetailsList, getDrugDetailsListByBrand, getDrugInteractionList, GetPrescription, SavePrescription } from "../../../../Actions/consultation";
import { getDrugSdeEffects } from "../../../../Actions/tools"
import { Modal, Button } from "react-bootstrap";
import PrescriptionSummary from "./prescription-summary";
import { getUserIDFromIndexedDB } from "../../../../Actions/indexedDB";
import { setActiveTab } from "../../../../Actions/landingPage";

const AddPrescription = ({ onAddprescription, getDrugDetailsList, drugList, SavePrescription, prescription, patientID, GetPrescription, ActiveTabHandler, activeTab, setActiveTab, getDrugDetailsListByBrand, BrandList, getDrugInteractionList, compoundList, sideEffect, getDrugSdeEffects }) => {
    const [prescriptionDrugData, setPrescriptionDrugData] = useState({
        dosage: 1,
        MedicineAdvise: '',
        selectedTimes: [],
        intake: '',
        searchString: '',
        selectedDrug: '',
        userID: '',
        isDrugListOpen: false,
        durationType: 'Day',
        duration: ''
    });
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);

    const dispatch = useDispatch();

    const handleDrugReactionClick = () => {
        dispatch(setActiveTab('5'));
    };

    const handleChange = (event) => {
        setPrescriptionDrugData({
            ...prescriptionDrugData,
            dosage: event.target.value
        });
    }

    const handleMedicineChange = (event) => {
        setPrescriptionDrugData({
            ...prescriptionDrugData,
            MedicineAdvise: event.target.value
        });
    }

    const debouncedFn = useCallback(
        _.debounce((value) => {
            getDrugDetailsList(value);
            getDrugDetailsListByBrand(value);
            getDrugInteractionList(value);
        }, 300),
        []
    );

    const handleDrugChange = (event) => {
        event.persist();
        setPrescriptionDrugData({
            ...prescriptionDrugData,
            searchString: event.target.value,
            isDrugListOpen: event.target.value !== ''
        });
        debouncedFn(event.target.value);
    };

    const handleTimeSelect = (time) => {
        setPrescriptionDrugData((prevState) => {
            const isSelected = prevState.selectedTimes.includes(time);
            const selectedTimes = isSelected
                ? prevState.selectedTimes.filter(t => t !== time)
                : [...prevState.selectedTimes, time];
            return {
                ...prevState,
                selectedTimes
            };
        });
    };

    const handleIntakeChange = (event) => {
        setPrescriptionDrugData({
            ...prescriptionDrugData,
            intake: event.target.value
        });
    }

    const selectDrug = (drugName) => {
        const brand = BrandList.find(brand => brand.drugBrandName === drugName);

        let dosage = prescriptionDrugData.dosage;
        if (brand) {
            dosage = brand.dose1 || brand.dose2 || brand.dose3 || brand.dose4 || brand.dose5 || brand.dose6 || prescriptionDrugData.dosage;
        }
        setPrescriptionDrugData({
            ...prescriptionDrugData,
            selectedDrug: drugName,
            searchString: drugName,
            isDrugListOpen: false,
            dosage
        });
    }

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const userId = await getUserIDFromIndexedDB();
                setPrescriptionDrugData(prevState => ({
                    ...prevState,
                    userID: userId
                }));
            } catch (error) {
                console.error("Error fetching userID from IndexedDB:", error);
            }
        };
        fetchUserID();
    }, []);

    const handleAddDrug = () => {

        const storedDrugs = JSON.parse(localStorage.getItem('prescriptionDrugs')) || [];
        const filteredDrugs = storedDrugs.filter(item => item.patientID === patientID);

        if (filteredDrugs.length >= 10) {
            alert("You can add a maximum of 10 drugs in a single prescription.");
            return;
        }

        if (!patientID) {
            setShowAddPatientModal(true);
            return;
        }

        const drugToAdd = prescriptionDrugData.selectedDrug || prescriptionDrugData.searchString;
        const repetition = ['Morning', 'Noon', 'Evening', 'Night'].map(time =>
            prescriptionDrugData.selectedTimes.includes(time) ? '1' : '0'
        ).join('-');

        const drug = {
            drugName: drugToAdd,
            dosage: prescriptionDrugData.dosage,
            repetition,
            intake: prescriptionDrugData.intake,
            durationType: prescriptionDrugData.durationType,
            duration: prescriptionDrugData.duration,
            medicineAdvice: prescriptionDrugData.MedicineAdvise,
            recordedVoice: "URL"
        };

        const UsrInfo = {
            patientID: patientID,
            userID: prescriptionDrugData.userID
        };

        console.log(UsrInfo, "UsrInfo")

        const existingDrugs = JSON.parse(localStorage.getItem('prescriptionDrugs')) || [];
        existingDrugs.push({ drug, UsrInfo });
        localStorage.setItem('prescriptionDrugs', JSON.stringify(existingDrugs));

        onAddprescription();
    };


    const renderDrugsAndBrands = () => {
        if (!prescriptionDrugData.isDrugListOpen || !drugList) {
            return null;
        }

        return (
            <div className="drug-list">
                {drugList && drugList.map((drug, index) => (
                    <div className="drug-item" key={index} onClick={() => selectDrug(drug.drugName)}>
                        <div className="drug-name">{drug.drugName}</div>
                        <hr />
                    </div>
                ))}
                {BrandList && BrandList.map((brand, index) => {

                    let dosageString = '';
                    if (brand.dose1 || brand.dose2 || brand.dose3 || brand.dose4 || brand.dose5) {
                        const doses = [brand.dose1, brand.dose2, brand.dose3, brand.dose4, brand.dose5, brand.dose6].filter(dose => dose);
                        dosageString = doses.join(', ') + ' ' + brand.dose_unit;
                    }

                    return (
                        <div className="drug-item" key={index} onClick={() => selectDrug(brand.drugBrandName)}>
                            <div className="drug-name">
                                {brand.drugBrandName}
                                <span style={{ fontSize: ".9rem", color: 'grey' }}>
                                    {` `} ({brand.drugBrandCompanyName})
                                    {dosageString && ` (${dosageString})`}
                                </span>
                            </div>
                            <hr />
                        </div>
                    );
                })}
                {compoundList && compoundList.map((interaction, index) => (
                    <div className="drug-item" key={index} onClick={() => selectDrug(interaction.drugInteractionCompound)}>
                        <div className="drug-name" >
                            {interaction.drugInteractionCompound}
                        </div>
                        <hr />
                    </div>
                ))}

            </div>
        );
    };

    return (
        <>
            <div className='add-drug'>
                <div className='search-drug'>
                    <div className='search-drug-labels'>
                        <div className='label-basic'>
                            Search Drug
                        </div>
                        <span className='label-basic anchor-basic' style={{ fontSize: '12px' }}
                            onClick={handleDrugReactionClick}
                        >
                            Check Drug Reaction
                        </span>
                    </div>
                    <div className='search-drug-input'>
                        <input
                            className='form-control'
                            placeholder='Type the medicine name or brand name to select'
                            style={{ border: '1px solid #707070' }}
                            onChange={handleDrugChange}
                            type="text"
                            value={prescriptionDrugData.searchString}
                        />
                        <label className='info-label label-basic'>If not listed in the suggestion just type the drug name</label>
                    </div>
                    {renderDrugsAndBrands()}
                </div>

                <div className="drug-dose-container">
                    <div className="left-section">
                        <label className="label-basic">Dosage (mg)</label>
                        <input
                            className='form-control'
                            placeholder='Dosage'
                            style={{ border: '1px solid #707070' }}
                            value={prescriptionDrugData.dosage}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="right-section">
                        <label className="label-basic">Select repetition</label>
                        <div className="time-options">
                            <div
                                className={`time-option ${prescriptionDrugData.selectedTimes.includes('Morning') ? 'selected' : ''}`}
                                onClick={() => handleTimeSelect('Morning')}
                            >
                                Morning
                            </div>
                            <div
                                className={`time-option ${prescriptionDrugData.selectedTimes.includes('Noon') ? 'selected' : ''}`}
                                onClick={() => handleTimeSelect('Noon')}
                            >
                                Noon
                            </div>
                            <div
                                className={`time-option ${prescriptionDrugData.selectedTimes.includes('Evening') ? 'selected' : ''}`}
                                onClick={() => handleTimeSelect('Evening')}
                            >
                                Evening
                            </div>
                            <div
                                className={`time-option ${prescriptionDrugData.selectedTimes.includes('Night') ? 'selected' : ''}`}
                                onClick={() => handleTimeSelect('Night')}
                            >
                                Night
                            </div>
                        </div>
                    </div>
                </div>

                <div className="intake-duration-container">
                    <div className="left1">
                        <label className="label-basic">Intake</label>
                        <div className="MT">
                            <RadioGroup
                                aria-label="Intake"
                                name="Intake"
                                value={prescriptionDrugData.intake}
                                onChange={handleIntakeChange}
                                style={{ display: 'flex', flexDirection: 'row' }}
                            >
                                <FormControlLabel
                                    value="Empty"
                                    control={<Radio style={{ color: prescriptionDrugData.intake === "Empty" ? '#FF9241' : '#808080' }} />}
                                    label="Empty"
                                />
                                <FormControlLabel
                                    value="After Food"
                                    control={<Radio style={{ color: prescriptionDrugData.intake === "After Food" ? '#FF9241' : '#808080' }} />}
                                    label="After Food"
                                />
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="right1">
                        <label className="label-basic">Select duration</label>
                        <div>
                            <select className="duration-dropdown"
                                value={prescriptionDrugData.durationType}
                                onChange={(e) => setPrescriptionDrugData({ ...prescriptionDrugData, durationType: e.target.value })}
                            >
                                <option value="Day">Day</option>
                                <option value="Week">Week</option>
                                <option value="Month">Month</option>
                            </select>
                            <input type="number" className="duration-number" min="1" max="31" list="day-options"
                                value={prescriptionDrugData.duration}
                                onChange={(e) => setPrescriptionDrugData({ ...prescriptionDrugData, duration: e.target.value })}
                            />
                            <datalist id="day-options">
                                {Array.from({ length: 31 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </datalist>
                        </div>
                    </div>
                </div>

                <div className='medicine-advice'>
                    <div className='medicine-advice-labels'>
                        <div className='lable basic'>
                            Medicine Advice
                        </div>
                        <div className='label-basic record-voice'>
                            Record Voice
                            <i className="fas fa-microphone" style={{ marginLeft: '5px' }}></i>
                        </div>
                    </div>
                    <div className='advice-text'>
                        <textarea className='form-control' placeholder='Write medicine advice for patients to follow' style={{ border: '1px solid #707070' }} value={prescriptionDrugData.MedicineAdvise} onChange={handleMedicineChange}></textarea>
                        <label className='info-label label-basic'>Eg. What to follow while taking the medicine and write about side effects of medicine.</label>
                    </div>
                    <button className="button-basics medium-button transparent-button--blue" onClick={handleAddDrug}>
                        <i className="fas fa-plus" style={{ marginRight: '15px' }}></i>
                        Add Drug
                    </button>
                </div>
            </div>
            <div className='no-summary'>
                <div className='label-basic'>Add any drug</div>
                <div className='label-basic'>Or</div>
                <div className='no-summary-cst label-basic'></div>
                <div className='label-basic'>Click CST to add prescription from last session</div>
            </div>
            <Modal show={showAddPatientModal} onHide={() => setShowAddPatientModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Please Add Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please add a patient and start the consultation to add prescriptions or drugs</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowAddPatientModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



const mapStateToProps = (state) => ({
    drugList: state.patientDetails.DrugList,
    BrandList: state.patientDetails.BrandList,
    prescription: state.patientDetails.getPrescription,
    patientID: state.patientDetails?.patientInfo?.patientid,
    compoundList: state.patientDetails.compoundList,
    sideEffect: state.toolsreducer.sideEffect
});

const mapDispatchToProps = {
    getDrugDetailsList,
    SavePrescription,
    GetPrescription,
    setActiveTab,
    getDrugDetailsListByBrand,
    getDrugInteractionList,
    getDrugSdeEffects
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPrescription);

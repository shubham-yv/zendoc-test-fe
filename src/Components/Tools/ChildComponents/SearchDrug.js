import { connect } from "react-redux";
import { clearBrandList, clearSideEffectList, getDrugDetailsList, getDrugInteractionList, getDrugSdeEffects } from "../../../Actions/tools";
import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import SideEffect from "./SideEffect";
import AlternativeDrug from "./AlternativeDrug";

const SearchDrug = ({ getDrugDetailsList, drugList, getDrugInteractionList, compoundList, getDrugSdeEffects, sideEffects, clearBrandList, clearSideEffectList }) => {
    const [searchString, setSearchString] = useState('');
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [secondDrug, setSecondDrug] = useState(null);
    const [showDrugList, setShowDrugList] = useState(false);
    const [showCompoundList, setShowCompoundList] = useState(false);
    const [firstDrugAdded, setFirstDrugAdded] = useState(false);
    const [secondDrugAdded, setSecondDrugAdded] = useState(false);

    const debouncedFn = useCallback(
        _.debounce((value) => {
            if (value.trim() !== '' && !firstDrugAdded) {
                getDrugDetailsList(value);
                setShowDrugList(true);
                setShowCompoundList(false);
            } else if (value.trim() !== '' && firstDrugAdded) {
                getDrugInteractionList(value);
                setShowCompoundList(true);
                setShowDrugList(false);
            }
        }, 300),
        [firstDrugAdded, getDrugDetailsList, getDrugInteractionList]
    );

    useEffect(() => {
        if (!searchString) {
            clearBrandList();
            clearSideEffectList();
            setShowDrugList(false);
            setShowCompoundList(false);
        }
    }, [searchString, clearBrandList, clearSideEffectList]);

    const handleDrugChange = (event) => {
        event.persist();
        setSearchString(event.target.value);
        debouncedFn(event.target.value);
    };

    const handleSelectFirstDrug = (drug) => {
        setSelectedDrug(drug.drugName);
        setSearchString(drug.drugName);
        setShowDrugList(false);
        // setFirstDrugAdded(true);
    };

    const handleSelectSecondDrug = (drug) => {
        setSecondDrug(drug.drugInteractionCompound);
        setSearchString(drug.drugInteractionCompound);
        setShowCompoundList(false);
        // setSecondDrugAdded(true);
    };

    const handleAddDrug = () => {
        setSearchString('');
        if (selectedDrug && !secondDrug) {
            setFirstDrugAdded(true);
            setShowDrugList(false);
        } else if (selectedDrug && secondDrug) {
            setSecondDrugAdded(true);
            setShowCompoundList(false);
        }
    };

    const handleCheck = () => {
        if (selectedDrug && secondDrug) {
            const data = {
                getdrugName: selectedDrug,
                getDrugInteraction: secondDrug
            };
            getDrugSdeEffects(data);
        }
    };

    const handleClear = () => {
        setSearchString('');
        setSelectedDrug(null);
        setSecondDrug(null);
        setShowDrugList(false);
        setShowCompoundList(false);
        setFirstDrugAdded(false);
        setSecondDrugAdded(false);
        clearBrandList();
        clearSideEffectList();
    };

    const renderDrugs = () => {
        if (!showDrugList && !showCompoundList) {
            return null;
        }

        if (showDrugList && !firstDrugAdded) {
            return (
                <div className="drug-details">
                    {drugList && drugList.map((drug, index) => (
                        <div className="drug-list-tools" key={index}>
                            <div className="drug-item" onClick={() => handleSelectFirstDrug(drug)}>
                                <div className="drug-name">{drug.drugName}</div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (showCompoundList && firstDrugAdded) {
            return (
                <div className="drug-details">
                    {compoundList && compoundList.map((interaction, index) => (
                        <div className="drug-list-tools" key={index}>
                            <div className="drug-item" onClick={() => handleSelectSecondDrug(interaction)}>
                                <div className="interaction-compound">{interaction.drugInteractionCompound}</div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <>
            <div className="Search_Drug_Main_Container">
                <h6 className="search-drug-heading">Search Drug</h6>
                <div className="search-drug-content">
                    <div className="search-drug-contentsearch-bar">
                        <input
                            type="text"
                            placeholder="Enter Drug name"
                            onChange={handleDrugChange}
                            value={searchString}
                        />
                        <button type="submit" className='search-drug-submit-button' onClick={handleAddDrug}>
                            <span className='search-drug-span'></span>
                            <span style={{ marginRight: '5px' }}>+</span> Add
                        </button>
                    </div>
                    <button className="search-drug-add-patient" onClick={handleCheck}>Check</button>
                </div>
                {renderDrugs()}
                <div className='search-bar-button-container'>
                    {firstDrugAdded && <input className='First-Drug' value={selectedDrug} readOnly />}
                    {secondDrugAdded && <input className='Second-Drug' value={secondDrug} readOnly />}
                </div>
                {(firstDrugAdded || secondDrugAdded) && <button type="submit" className='clear-drug-add-patient' onClick={handleClear}>Clear</button>}
                <h4 className='search-drug-heading-h4'>Select to view side effect for each drug</h4>
            </div>
            <SideEffect sideEffects={sideEffects} />
            {selectedDrug && <AlternativeDrug />}
        </>
    );
};

const mapStateToProps = (state) => ({
    drugList: state.toolsreducer.DrugList,
    BrandList: state.toolsreducer.BrandList,
    compoundList: state.toolsreducer.compoundList,
    sideEffects: state.toolsreducer.sideEffects
});

export default connect(
    mapStateToProps,
    { getDrugDetailsList, getDrugInteractionList, getDrugSdeEffects, clearBrandList, clearSideEffectList }
)(SearchDrug);

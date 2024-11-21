import React from 'react';
import '../../style/Tools/Tools.css'
import SearchDrug from './ChildComponents/SearchDrug';
import DrugHeader from './ChildComponents/DrugHeader'
import SideEffect from './ChildComponents/SideEffect';
import AlternativeDrug from './ChildComponents/AlternativeDrug';

const DrugTool = () => {
    return (
        <>
            <DrugHeader />
            <SearchDrug />

        </>
    );
};

export default DrugTool;

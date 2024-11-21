import React from 'react';

const DrugPrescription = ({ canEdit, drugs, deletePres, editPres }) => {
    const deletePrescription = (event) => {
        if (canEdit) {
            deletePres(event);
        }
    }

    const editPrescription = (event) => {
        if (canEdit) {
            editPres(event);
        }
    }

    const getDrugsList = () => {
        let no = 0;
        const editClassName = canEdit ? 'icons label-basic' : 'icons label-basic zqhide';
        const toolsList = drugs.map(drug => {
            no++;

            return (
                <div key={drug.drugID} className='dp-body-row'>
                    <div className='numWidth label-basic'>
                        {no}
                    </div>
                    <div className='label-basic width30pc'>
                        {drug.drugName}
                    </div>
                    <div className='label-basic width15pc'>
                        {drug.dosage + 'mg'}
                    </div>
                    <div className='label-basic width15pc'>
                        {drug.repetition}
                    </div>
                    <div className='label-basic width15pc'>
                        {drug.intake}
                    </div>
                    <div className={editClassName}>

                    </div>
                    <div className={editClassName}>

                    </div>
                </div>
            );
        });
        return toolsList;
    }

    const editClassName = canEdit ? 'icons label-basic' : 'icons label-basic zqhide';

    return (
        <div className='dp-parent'>
            <div className='dp-header'>
                <div className='numWidth label-basic'>
                    S.No.
                </div>
                <div className='label-basic width30pc'>
                    Drug Name
                </div>
                <div className='label-basic width15pc'>
                    Dose
                </div>
                <div className='label-basic width15pc'>
                    Repeatition
                </div>
                <div className='label-basic width15pc'>
                    Intake
                </div>
                <div className={editClassName}>

                </div>
                <div className={editClassName}>

                </div>
            </div>
            <div className='dp-body'>
                {getDrugsList()}
            </div>
        </div>
    );
}

export default DrugPrescription;

import React from 'react'
import PillImg from '../../../style/images/Icon awesome-pills.svg'

function Box({ brand }) {
    return (
        <>
            <div className='Alternative-Drug-Box-Container'>
                <div className="Alternative-Drug-Box">
                    <div>
                        <img src={PillImg} alt="Pills Icon" />
                    </div>
                    <div>
                        <p>{brand.drugBrandName} <br /> <span className='Alternative-Drug-Span' style={{ fontWeight: 'lighter' }}>Dosage {brand.dose1 + ' ' + brand.dose_unit}</span></p>
                    </div>
                </div>

            </div>

        </>
    );
}
export default Box;
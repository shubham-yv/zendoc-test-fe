import React from 'react'
import Box from './AlternativeDrugBox'
import '../../../style/Tools/AlternativeDrug.css'
import { connect } from 'react-redux'
import { getDrugDetailsList } from '../../../Actions/consultation'

const AlternativeDrug = ({ BrandList }) => {

    return (
        <div className='Search_AlternativeDrug_Container'>
            <div className='Search_AlternativeDrug_SubContainer'>
                <h5 className="Side-Effect-H5">Alternative Drug</h5>

                <div className='Box-Container'>
                    {BrandList && BrandList && BrandList.map((brand, index) => (
                        <Box key={index} brand={brand} />
                    ))}
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    BrandList: state.toolsreducer.BrandList
});

export default connect(
    mapStateToProps,
    { getDrugDetailsList }
)(AlternativeDrug);

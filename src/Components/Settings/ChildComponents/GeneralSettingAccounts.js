import React from 'react'
import Remove from '../../../style/images/Remove.svg'
import Edit from '../../../style/images/BtnEdi.svg'

const GeneralSettingAccounts = () => {
    return (
        <>
            <div className="GeneralSettingAccounts">

                <div className='AccoutContainer'>
                    <h5 className="setting-linked"><b>Linked Accounts</b></h5>
                </div>

                <div className="AccountContainer">

                    <div className='setting-google'>
                        <div className="setting-text">Google Account</div>
                        <div>Ashokan.varma@gmail.com</div>
                    </div>
                    <div className="">
                        <button type="button" className="btn btn-link">   <img src={Edit} alt="" className='GeneralSettingBTNContainerimg' />Edit</button>
                        <button type="button" className="btn btn-link">
                            <img src={Remove} alt="" className='GeneralSettingBTNContainerimg' />
                            Remove</button>
                    </div>

                </div>

                <div className="AccountContainer">

                    <div className='setting-google'>
                        <div className="setting-text">Linkdin Account</div>
                        <div>www.linkedin.com/Ashokan</div>
                    </div>
                    <div className="">
                        <button type="button" className="btn btn-link">   <img src={Edit} alt="" className='GeneralSettingBTNContainerimg' />Edit</button>
                        <button type="button" className="btn btn-link">
                            <img src={Remove} alt="" className='GeneralSettingBTNContainerimg' />
                            Remove</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default GeneralSettingAccounts
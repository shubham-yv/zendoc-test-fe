// import React from 'react';
// import '../../style/landingPage/leftMenu.css';

// const LeftMenu = ({ menuItemClickHandler, activeTab }) => {
//     const handleMenuItemClick = (event) => {
//         const name = event.currentTarget.getAttribute('data-name');
//         menuItemClickHandler(name);
//     };

//     return (
//         <div className='left-menu'>
//             <div className='left-menu-icon-container'>
//                 <div
//                     data-name=''
//                     onClick={handleMenuItemClick}
//                     className={`left-menu__item left-menu__item--home ${activeTab === '' ? 'active' : ''}`}
//                 >
//                     <div className='left-menu-item-text'>Home</div>
//                 </div>
//                 <div
//                     data-name='2'
//                     onClick={handleMenuItemClick}
//                     className={`left-menu__item left-menu__item--schedule ${activeTab === '2' ? 'active' : ''}`}
//                 >
//                     <div className='left-menu-item-text'>Schedule</div>
//                 </div>
//                 <div
//                     data-name='3'
//                     onClick={handleMenuItemClick}
//                     className={`left-menu__item left-menu__item--patients ${activeTab === '3' ? 'active' : ''}`}
//                 >
//                     <div className='left-menu-item-text'>Patients</div>
//                 </div>
//                 <div
//                     data-name='4'
//                     onClick={handleMenuItemClick}
//                     className={`left-menu__item left-menu__item--Appointments ${activeTab === '4' ? 'active' : ''}`}
//                 >
//                     <div className='left-menu-item-text'>Appointments</div>
//                 </div>
//                 <div
//                     data-name='5'
//                     onClick={handleMenuItemClick}
//                     className={`left-menu__item left-menu__item--Tools ${activeTab === '5' ? 'active' : ''}`}
//                 >
//                     <div className='left-menu-item-text'>Tools</div>
//                 </div>
//                 <div
//                     data-name='6'
//                     onClick={handleMenuItemClick}
//                     className={`left-menu__item left-menu__item--blog ${activeTab === '6' ? 'active' : ''}`}
//                 >
//                     <div className='left-menu-item-text'>Blog</div>
//                 </div>
//                 <div
//                     data-name='7'
//                     onClick={handleMenuItemClick}
//                     className={`left-menu__item left-menu__item--settings ${activeTab === '7' ? 'active' : ''}`}
//                 >
//                     <div className='left-menu-item-text'>Settings</div>
//                 </div>
//             </div>
//             <div
//                 data-name='help'
//                 onClick={handleMenuItemClick}
//                 className={`left-menu__item left-menu__item--help ${activeTab === 'help' ? 'active' : ''}`}
//             >
//                 <div className='left-menu-item-text'>Help</div>
//             </div>
//         </div>
//     );
// };

// export default LeftMenu;



import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../style/landingPage/leftMenu.css';

const LeftMenu = ({ menuItemClickHandler, activeTab }) => {
    const history = useHistory();

    console.log("Active Tab in leftMenu:::", activeTab);

    const handleMenuItemClick = (event) => {
        const name = event.currentTarget.getAttribute('data-name');
        menuItemClickHandler(name);

        const routeMapping = {
            '': '/dashboard',
            '2': '/schedule-calender',
            '3': '/manage-patients',
            '4': '/notifications',
            '5': '/tools',
            '6': '/blogs',
            '7': '/profile',
            'help': '/help'
        };

        history.push(routeMapping[name]);
    };

    return (
        <div className='left-menu'>
            <div className='left-menu-icon-container'>
                <div
                    data-name=''
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--home ${activeTab === '' ? 'active' : ''}`}
                >
                    <div className='left-menu-item-text'>Home</div>
                </div>
                <div
                    data-name='2'
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--schedule ${activeTab === 'schedule-calender' ? 'active' : ''}`}
                >
                    <div className='left-menu-item-text'>Schedule</div>
                </div>
                <div
                    data-name='3'
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--patients ${activeTab === 'manage-patients' ? 'active' : ''}`}
                >
                    <div className='left-menu-item-text'>Patients</div>
                </div>
                <div
                    data-name='4'
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--Appointments ${activeTab === 'notifications' ? 'active' : ''}`}
                >
                    <div className='left-menu-item-text'>Appointments</div>
                </div>
                <div
                    data-name='5'
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--Tools ${activeTab === 'tools' ? 'active' : ''}`}
                >
                    <div className='left-menu-item-text'>Tools</div>
                </div>
                <div
                    data-name='6'
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--blog ${activeTab === 'blogs' ? 'active' : ''}`}
                >
                    <div className='left-menu-item-text'>Blog</div>
                </div>
                <div
                    data-name='7'
                    onClick={handleMenuItemClick}
                    className={`left-menu__item left-menu__item--settings ${activeTab === 'profile' ? 'active' : ''}`}
                >
                    <div className='left-menu-item-text'>Settings</div>
                </div>
            </div>
            <div
                data-name='help'
                onClick={handleMenuItemClick}
                className={`left-menu__item left-menu__item--help ${activeTab === 'help' ? 'active' : ''}`}
            >
                <div className='left-menu-item-text'>Help</div>
            </div>
        </div>
    );
};

export default LeftMenu;

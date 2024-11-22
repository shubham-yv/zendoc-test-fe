// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import LandingPage from './landingPage-view';
// import LeftMenu from '../leftMenu';
// import LoadComponentPage from './childComponents/loadComponent';
// import Header from '../header';
// import { setActiveTab } from '../../Actions/landingPage';
// import MobileMenu from '../leftMenu/Mobile-menu';

// const LandingPageContainer = () => {
//     const activetab = useSelector(state => state.activetab);
//     const dispatch = useDispatch();

//     const setActiveTabHandler = (tab) => {
//         dispatch(setActiveTab(tab));
//     };

//     return (
//         <>
//             {activetab === "" ? (
//                 <LandingPage tileClickHandler={setActiveTabHandler} />
//             ) : (
//                 <div className='component-container'>
//                     <div className='component-header'>
//                         <Header menuItemClickHandler={setActiveTabHandler} activeTab={activetab} />
//                     </div>
//                     <div className='component-body'>
//                         <LeftMenu menuItemClickHandler={setActiveTabHandler} activeTab={activetab} />
//                         <div className='component-page-container'>
//                             <div>
//                                 <LoadComponentPage activeTab={activetab} setActiveTabHandler={setActiveTabHandler} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default LandingPageContainer;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import LandingPage from './landingPage-view';
import { setActiveTab } from '../../Actions/landingPage';
import LoadComponentPage from './childComponents/loadComponent';
import LeftMenu from '../leftMenu';
import Header from '../header';

const LandingPageContainer = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const activetab = useSelector(state => state.activetab);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
        }

        const newActiveTab = pathname.split('/')[1];
        if (newActiveTab && newActiveTab !== activetab) {
            dispatch(setActiveTab(newActiveTab));
        }
    }, [pathname, activetab, dispatch, initialLoad]);

    const handleTileClick = (tileId) => {
        history.push(`/${tileId}`);
    };

    console.log("Active Tab:::", activetab);

    return (
        <>
            {pathname === '/dashboard' || initialLoad ? (
                <LandingPage />
            ) : (
                <div className="component-container">
                    <div className="component-header">
                        <Header activeTab={activetab} />
                    </div>
                    <div className="component-body">
                        <LeftMenu menuItemClickHandler={handleTileClick} activeTab={activetab} />
                        <div className="component-page-container">
                            <div>
                                <LoadComponentPage route={pathname} activeTab={activetab} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LandingPageContainer;

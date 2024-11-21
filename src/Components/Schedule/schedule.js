import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SchedularControl from './ChildComponents/schedularControl';
import SchedularLeftPanel from './ChildComponents/schedular-leftPanel';
import AddNewSchedule from './ChildComponents/addNewSchedule';
import { getScheduleDetail } from '../../Actions/schedule';
import { getUserIDFromIndexedDB } from '../../Actions/indexedDB';

const Schedule = ({ addNewSchedule, meetingList, getScheduleDetail }) => {

    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const userID = await getUserIDFromIndexedDB();
                setUserID(userID);
            } catch (error) {
                console.error("Error fetching userID from IndexedDB:", error);
            }
        };
        fetchUserID();
    }, []);

    useEffect(() => {
        getScheduleDetail(userID);
    }, [userID, getScheduleDetail]);


    return (
        <div className='schedular-component'>
            <SchedularLeftPanel />
            {meetingList && <SchedularControl meetingList={meetingList || []} />}
            {addNewSchedule && <AddNewSchedule />}
        </div>
    );
};


const mapStateToProps = (state) => ({
    addNewSchedule: state.schedular.addNewSchedule,
    meetingList: state.schedular?.meetingList || [],
});



export default connect(mapStateToProps, {
    getScheduleDetail
})(Schedule);

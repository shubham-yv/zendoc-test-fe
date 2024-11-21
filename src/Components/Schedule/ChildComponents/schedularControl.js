import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../../style/schedular/schedular-control.css';
import '../../../style/schedular/calender.css';
import ScheduleProfile from '../../../style/images/Schedule-Profile.svg'
import ScheduleCalander from '../../../style/images/Schedule-Calender.svg'
import ScheduleVideo from '../../../style/images/Schedule-Video.svg'
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AppointmentDetailsModal from './AppointmentDetailsModal';
import { connect } from 'react-redux';

const SchedularControl = ({ meetingList = [], patientInfo }) => {

    const [events, setEvents] = useState([]);
    const [eventDetails, setEventDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 0:
                return '#FF9241'; // Normal
            case 1:
                return '#206FBF'; // Low
            case 2:
                return '#E3AD33'; // Medium
            case 3:
                return '#D64522'; // High
            default:
                return '#1E64CC'; // Default color
        }
    };

    const hexColors = {
        '#FF9241': 'rgb(255, 146, 65)', // Normal
        '#206FBF': 'rgb(32, 111, 191)', // Low
        '#E3AD33': 'rgb(227, 173, 51)', // Medium
        '#D64522': 'rgb(214, 69, 34)'   // High
    };

    useEffect(() => {
        const uniqueMeetingList = Array.from(new Set(meetingList.map(meeting => meeting.scheduleID)))
            .map(scheduleID => {
                return meetingList.find(meeting => meeting.scheduleID === scheduleID);
            });

        const fetchedEvents = uniqueMeetingList.map((meeting) => ({
            id: meeting.scheduleID,
            start: meeting.scheduleDate + 'T' + meeting.startTime,
            end: meeting.scheduleDate + 'T' + meeting.endTime,
            allDay: false,
            backgroundColor: hexColors[getPriorityColor(meeting.priority)],
            extendedProps: {
                startTime: meeting.startTime,
                endTime: meeting.endTime,
                message: meeting.message,
                title: meeting.appointmentTitle,
                firstName: meeting.firstName,
                lastName: meeting.lastName,
                scheduleDate: meeting.scheduleDate,
                inviteeMobileNumber: meeting.inviteeMobileNumber,
                inviteeEmailId: meeting.inviteeEmailId,
                priority: meeting.priority,
                isVirtualMeeting: meeting.isVirtualMeeting,
                problem: meeting.problem,
                patientID: meeting.patientID
            }
        }));
        setEvents(fetchedEvents);

        return () => setEvents([]);
    }, [meetingList, patientInfo, eventDetails]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEventClick = (clickInfo) => {
        const { title, problem, isVirtualMeeting, startTime, endTime, firstName, scheduleDate, inviteeEmailId, inviteeMobileNumber, priority, patientID, lastName } = clickInfo.event.extendedProps;

        const posX = clickInfo.jsEvent.clientX;
        const posY = clickInfo.jsEvent.clientY;

        if (clickInfo.view.type === 'dayGridMonth') {
            setEventDetails({
                title,
                patientID,
                lastName,
                startTime,
                endTime,
                firstName,
                scheduleDate,
                showPopup: true,
                scheduleID: clickInfo.event.id,
                inviteeEmailId,
                inviteeMobileNumber,
                priority,
                isVirtualMeeting,
                position: { x: posX, y: posY },
                problem
            });
        }
    }

    useEffect(() => {
    }, [eventDetails]);
    useEffect(() => {
    }, [events]);

    const handleClosePopup = () => {
        setEventDetails(null);
    }

    const handleSaveChanges = (editedObject) => {
        const updatedEvents = events.map(event => {
            if (event.id === editedObject.scheduleID) {
                return {
                    ...event,
                    start: editedObject.scheduleDate + 'T' + editedObject.startTime,
                    end: editedObject.scheduleDate + 'T' + editedObject.endTime,
                    extendedProps: {
                        ...event.extendedProps
                    }
                };
            }
            return event;
        });
        setEvents(updatedEvents);
        handleCloseModal();
    };


    const getClassNames = (arg) => {
        const priority = arg.event.extendedProps.priority;
        switch (priority) {
            case 0:
                return 'event-normal';
            case 1:
                return 'event-low';
            case 2:
                return 'event-medium';
            case 3:
                return 'event-high';
            default:
                return 'event-default';
        }
    };

    const getHeaderClass = (priority) => {
        switch (priority) {
            case 0:
                return 'popup-header-normal';
            case 1:
                return 'popup-header-low';
            case 2:
                return 'popup-header-medium';
            case 3:
                return 'popup-header-high';
            default:
                return 'popup-header-default';
        }
    };

    return (
        <div className='sc-parent'>
            <div className='sc-header'>
                Schedule Calendar
            </div>
            <div className='sc-body'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'timeGridDay,timeGridWeek,dayGridMonth',
                        center: 'title',
                        right: 'prev,next today'
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    editable={true}
                    dayHeaderContent={(args) => (
                        <div className="custom-day-header" style={{ width: '25%' }}>
                            {args.dayNumberText}
                        </div>
                    )}
                    weekHeaderContent={(args) => (
                        <div className="custom-week-header" style={{ width: '100%' }}>
                            {args.dayHeader.text}
                        </div>
                    )}
                    eventContent={renderEventContent}
                    eventClassNames={getClassNames}

                />
            </div>
            {eventDetails && (
                <div className="popup" style={{ top: eventDetails.position.y, left: eventDetails.position.x, marginTop: '12rem' }}>
                    <div className={`popup-header ${eventDetails ? getHeaderClass(eventDetails.priority) : ''}`}>
                        <div className='popup-header-first'>
                            <ReportProblemIcon style={{ color: "#FFFFFF" }} />
                            <span style={{ color: "#FFFFFF" }} >Schedule Details</span>
                            <DriveFileRenameOutlineIcon onClick={handleShowModal} style={{ color: "#FFFFFF" }} /></div>

                        <AppointmentDetailsModal showModal={showModal} handleCloseModal={handleCloseModal} meetingDetails={eventDetails} onSaveChanges={handleSaveChanges} scheduleID={eventDetails.scheduleID} />

                        <div>
                            <CloseIcon onClick={handleClosePopup} style={{ color: "#FFFFFF" }} />
                        </div>
                    </div>
                    <div className="popup-content">

                        <div className="popup-details">

                            <p><img src={ScheduleProfile} alt="" /> <span>{eventDetails.firstName} {eventDetails.lastName}</span></p>


                            <p><img src={ScheduleCalander} alt="" /> <span>{eventDetails.scheduleDate}{" "}{eventDetails.startTime}-{eventDetails.endTime}</span></p>

                            <p><img src={ScheduleVideo} alt="" /> <span>Virtual consulting</span> {" "}
                                <span style={{ color: eventDetails.isVirtualMeeting === 1 ? '#3C9D00' : '#D64522' }}>
                                    {eventDetails.isVirtualMeeting === 1 ? 'Active' : 'Inactive'}
                                </span>
                            </p>

                            <p style={{ color: '#102646', fontSize: '14px' }} >Details: <br />
                                <div className='Inner-border-popup'><span>{eventDetails.title}</span></div>
                            </p>

                            {eventDetails.inviteeEmailId && (
                                <p>
                                    <img src={ScheduleProfile} alt="" /> <span>{eventDetails.inviteeEmailId}</span>
                                </p>
                            )}
                            {eventDetails.inviteeMobileNumber && (
                                <p>
                                    <img src={ScheduleProfile} alt="" /> <span>{eventDetails.inviteeMobileNumber}</span>
                                </p>
                            )}
                        </div>
                        <div className='view-details' onClick={handleShowModal}>View details</div>
                    </div>
                </div>
            )}
        </div >
    );
};

const renderEventContent = (eventInfo) => {
    const { title, startTime, endTime, firstName, scheduleDate, lastName, problem } = eventInfo.event.extendedProps;

    const convertTo12HourFormat = (time) => {
        let [hours, minutes, seconds] = time.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    const formattedStartTime = convertTo12HourFormat(startTime);
    const formattedEndTime = convertTo12HourFormat(endTime);

    if (eventInfo.view.type === 'dayGridMonth') {
        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="event-title">{title}</div>
                    <div className="event-title">{formattedStartTime}-{formattedEndTime}</div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="event-container">
                    <div className="event-title">Appoitment Title: <br /> {firstName + lastName}</div>
                    <div className="event-details">Details <br /> {problem}</div>
                    <div>
                        <span>{scheduleDate}</span>
                        <br />
                        <span>{startTime}-{endTime}</span>
                    </div>
                </div>
            </>
        );
    }
};

const mapStateToProps = (state) => ({
    patientInfo: state.patientDetails.patientInfo
});

export default connect(mapStateToProps, {
})(SchedularControl);


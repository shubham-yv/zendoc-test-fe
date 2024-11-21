import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from 'react-redux';

const NonPharmaSummary = ({ tasks, habits, timeDurations, sessionDetails, setTasks, setHabits, setTimeDurations, setSessionDetails, patientID }) => {
    const [storedData, setStoredData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const patientId = patientID;

    useEffect(() => {
        const combinedData = [...tasks, ...habits, ...timeDurations, ...sessionDetails];
        const filteredData = combinedData.filter(item => item.patientId === patientId);
        setStoredData(filteredData);
    }, [tasks, habits, timeDurations, sessionDetails, patientID]);

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedItem({ ...storedData[index] });
    };

    const handleDelete = (index) => {
        const itemToDelete = storedData[index];
        const updatedData = storedData.filter((_, i) => i !== index);
        setStoredData(updatedData);
    
        if (itemToDelete.taskType === 'tool') {
            if (itemToDelete.hasOwnProperty('toolDetails')) {
                // Handle timeDurations deletion
                const updatedTimeDurations = timeDurations.filter(duration => duration !== itemToDelete);
                setTimeDurations(updatedTimeDurations);
                localStorage.setItem('tool', JSON.stringify(updatedTimeDurations));
            } else if (itemToDelete.hasOwnProperty('sessionDetails')) {
                // Handle sessionDetails deletion
                const updatedSessionDetails = sessionDetails.filter(session => session !== itemToDelete);
                setSessionDetails(updatedSessionDetails);
                localStorage.setItem('sessionDetails', JSON.stringify(updatedSessionDetails));
            }
        } else {
            switch (itemToDelete.taskType) {
                case 'task':
                    const updatedTasks = tasks.filter(task => task !== itemToDelete);
                    setTasks(updatedTasks);
                    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                    break;
                case 'habit':
                    const updatedHabits = habits.filter(habit => habit !== itemToDelete);
                    setHabits(updatedHabits);
                    localStorage.setItem('habits', JSON.stringify(updatedHabits));
                    break;
                default:
                    break;
            }
        }
    };
    
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedItem((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSaveEdit = () => {
        const updatedData = [...storedData];
        updatedData[editingIndex] = editedItem;

        setStoredData(updatedData);
        setEditingIndex(null);
        setEditedItem({});

        switch (editedItem.taskType) {
            case 'task':
                const updatedTasks = tasks.map(task => task === storedData[editingIndex] ? editedItem : task);
                setTasks(updatedTasks);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                break;
            case 'habit':
                const updatedHabits = habits.map(habit => habit === storedData[editingIndex] ? editedItem : habit);
                setHabits(updatedHabits);
                localStorage.setItem('habits', JSON.stringify(updatedHabits));
                break;
            case 'tool':
                const updatedTimeDurations = timeDurations.map(duration => duration === storedData[editingIndex] ? editedItem : duration);
                setTimeDurations(updatedTimeDurations);
                localStorage.setItem('timeDurations', JSON.stringify(updatedTimeDurations));
                break;
            case 'tool':
                const updatedSessionDetails = sessionDetails.map(session => session === storedData[editingIndex] ? editedItem : session);
                setSessionDetails(updatedSessionDetails);
                localStorage.setItem('sessionDetails', JSON.stringify(updatedSessionDetails));
                break;
            default:
                break;
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditedItem({});
    };

    const getTypeLabel = (item) => {
        return item.taskType === 'task' ? 'Task' : item.taskType === 'habit' ? 'Habit' : item.taskType === 'tool' ? 'Tool' : item.taskType === 'tool' ? 'Tool' : '';
    };

    const formatDuration = (item) => {
        if (item.taskType === 'task') {
            const { taskDetails } = item;
            const { taskCategory, taskDate, taskStartTime, taskEndTime } = taskDetails;
            if (taskStartTime && taskEndTime && taskDate) {
                return `${taskDate} ${taskStartTime} - ${taskEndTime}`;
            }
        } else if (item.taskType === 'habit') {
            const { habitData } = item;
            const { startDate, endDate } = habitData;
            if (startDate && endDate) {
                return `${startDate} - ${endDate}`;
            }
        } else if (item.taskType === 'tool') {
            const { toolDetails } = item;
            const { toolDuration } = toolDetails;
            if (toolDuration) {
                return `${toolDuration} Minutes`;
            }
        } else if (item.taskType === 'tool') {
            const { toolDetails } = item;
        }
        return '-';
    };

    return (
        <div className='pres-summary'>
            <div className='pres-summary-header label-basic'>Summary</div>
            {storedData.length === 0 ? (
                <div className='no-summary'>
                    <div className='label-basic'>No data available</div>
                    <div className='no-summary-cst label-basic'></div>
                    <div className='label-basic'>Click CST to add prescription from the last session</div>
                </div>
            ) : (
                <div className='summary-list-sub'>
                    <div className='summary-list-header-sub'>
                        <div className='label-basic'>S. No</div>
                        <div className='label-basic'>Therapy / Tool</div>
                        <div className='label-basic' style={{ marginLeft: "2.5rem" }}>Duration</div>
                        <div className="label-basic summary-icons">Actions</div>
                    </div>
                    {storedData.map((item, index) => (
                        <div key={index} className='summary-list-item-sub'>
                            {editingIndex === index ? (
                                <>
                                    <div className="label-basic">{index + 1}</div>
                                    <input className="label-basic" name="taskName" value={editedItem.taskDetails?.taskName || editedItem.habitData?.habitCategory || editedItem.toolDetails?.toolName || editedItem.toolDetails?.toolMotivationMsg} onChange={handleEditChange} />
                                    <input className="label-basic" name="duration" value={editedItem.taskDetails?.taskDuration || editedItem.habitData?.habitDuration || editedItem.toolDetails?.toolDuration} onChange={handleEditChange} />
                                    <button className="summary-btn" onClick={handleSaveEdit}>Save</button>
                                    <button className="summary-btn" onClick={handleCancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <div className='label-basic'>{index + 1}</div>
                                    <div className='label-basic' style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                                        {item.taskType === 'task' && `${item.taskDetails.taskCategory} - ${item.taskDetails.taskName}`}
                                        {item.taskType === 'habit' && `${item.habitData.habitCategory}`}
                                        {item.taskType === 'tool' && `${item.toolDetails.toolName + ' '}`}
                                        {item.taskType === 'tool' && `${item.toolDetails.toolMotivationMsg || ' '}`}
                                        <br />
                                        <div style={{ color: '#808495' }}>{getTypeLabel(item)}</div>
                                    </div>
                                    <div className='label-basic'>
                                        {formatDuration(item)}
                                    </div>
                                    <div className='label-basic summary-icons'>
                                        <EditIcon onClick={() => handleEdit(index)} />
                                        <DeleteIcon onClick={() => handleDelete(index)} />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    patientID: state.patientDetails?.patientInfo?.patientid
});

export default connect(mapStateToProps, {})(NonPharmaSummary);

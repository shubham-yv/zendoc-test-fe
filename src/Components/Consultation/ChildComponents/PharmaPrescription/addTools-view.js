import React, { useState } from 'react';
import { toolsList } from '../../toolsList';
import TaskDetails from './taskDetails';
import HabitDetails from './habitDetails';
import ToolTimeDuration from './toolTimeDuration';
import ToolSessionDetails from './toolSessionDetails';

const AddTools = ({ handleAddTask, handleAddHabit, handleAddTimeDuration, handleSessionDetails }) => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [showHabitDetails, setShowHabitDetails] = useState(false);
    const [showToolsList, setShowToolsList] = useState(false);
    const [showToolTimeDuration, setShowToolTimeDuration] = useState(false);
    const [showToolSessionDetails, setShowToolSessionDetails] = useState(false);

    const generateToolsList = () => {
        return toolsList.map((tool) => (
            <div
                key={tool.id}
                className={`pharma-tool${tool.id === (selectedTool && selectedTool.id) ? ' selected-tool' : ''}`}
                onClick={() => handleToolClick(tool)}
                style={{ backgroundColor: tool.id === (selectedTool && selectedTool.id) ? '#1E64CC' : '', color: tool.id === (selectedTool && selectedTool.id) ? '#ffffff' : '#205fbf' }}
            >
                {tool.title}
            </div>
        ));
    };

    const handleToolClick = (tool) => {
        setSelectedTool(tool);
        setShowTaskDetails(false);
        setShowHabitDetails(false);

        if (tool && (tool.title === "Mood Tracking" || tool.title === "Thought Journal")) {
            setShowToolTimeDuration(true);
            setShowToolSessionDetails(false);
        } else {
            setShowToolTimeDuration(false);
            setShowToolSessionDetails(true);
        }
    };

    const handleTaskClick = () => {
        setShowTaskDetails(!showTaskDetails);
        setShowHabitDetails(false);
        setShowToolTimeDuration(false);
        setShowToolSessionDetails(false);
        setSelectedTool(null);
    };

    const handleHabitClick = () => {
        setShowHabitDetails(!showHabitDetails);
        setShowTaskDetails(false);
        setShowToolTimeDuration(false);
        setShowToolSessionDetails(false);
        setSelectedTool(null);
    };

    const handleToolsClick = () => {
        setShowToolsList(!showToolsList);
        setShowTaskDetails(false);
        setShowHabitDetails(false);
        setShowToolTimeDuration(false);
        setShowToolSessionDetails(false);
        setSelectedTool(null);
    };

    const handleCloseTaskDetails = () => {
        setShowTaskDetails(false);
        setShowHabitDetails(false);
        setShowToolTimeDuration(false);
        setShowToolSessionDetails(false);
    };

    return (
        <>
            <div className='pharma-tool-list'>
                <div
                    className='pharma-tool'
                    onClick={handleTaskClick}
                    style={{
                        backgroundColor: showTaskDetails ? '#205fbf' : '',
                        color: showTaskDetails ? '#ffffff' : ''
                    }}
                >
                    Task
                </div>
                <div
                    className='pharma-tool'
                    onClick={handleHabitClick}
                    style={{
                        backgroundColor: showHabitDetails ? '#205fbf' : '',
                        color: showHabitDetails ? '#ffffff' : ''
                    }}
                >
                    Habit
                </div>
                <div
                    className='pharma-tool'
                    onClick={handleToolsClick}
                    style={{
                        backgroundColor: showToolsList ? '#205fbf' : '',
                        color: showToolsList ? '#ffffff' : ''
                    }}
                >
                    Tools
                </div>
            </div>
            {showTaskDetails ? <TaskDetails handleAddTask={handleAddTask} handleClose={handleCloseTaskDetails} /> : ""}
            {showHabitDetails ? <HabitDetails handleAddHabit={handleAddHabit} handleClose={handleCloseTaskDetails} /> : ""}
            {showToolsList || selectedTool ? (
                <div className='pharma-tool-list'>
                    {generateToolsList()}
                    {showToolTimeDuration && selectedTool ? <ToolTimeDuration handleAddTimeDuration={handleAddTimeDuration} tool={selectedTool} handleClose={handleCloseTaskDetails} /> : ""}
                    {showToolSessionDetails && selectedTool ? <ToolSessionDetails handleSessionDetails={handleSessionDetails} tool={selectedTool} handleClose={handleCloseTaskDetails} /> : ""}
                </div>
            ) : ""}
        </>
    );
};

export default AddTools;

import React from 'react';

const ToolPrescription = ({ tools, canEdit, deletePres, editPres }) => {

    const deleteTool = (event) => {
        if (canEdit) {
            deletePres(event);
        }
    }

    const editTool = (event) => {
        if (canEdit) {
            editPres(event);
        }
    }

    console.log("tools", tools)

    const getToolsList = () => {
        let no = 0;
        let editClassName = canEdit ? 'icons label-basic' : 'icons label-basic zqhide';
        return tools.map(tool => {
            no++;
            return (
                <div key={tool.toolId} className='tp-body-row'>
                    <div className='numWidth label-basic'>
                        {no}
                    </div>
                    <div className='label-basic width55pc'>
                        {tool.toolName}
                    </div>
                    <div className='label-basic width30pc'>
                        {tool.toolMotivationMsg ? tool.toolMotivationMsg : tool.toolDuration ? tool.toolDuration : '-'}
                    </div>
                    <div className={editClassName}>

                    </div>
                    <div className={editClassName}>

                    </div>
                </div>
            );
        });
    }

    let editClassName = canEdit ? 'icons label-basic' : 'icons label-basic zqhide';

    return (
        <div className='tp-parent'>
            <div className='tp-header'>
                <div className='numWidth label-basic'>
                    S.No.
                </div>
                <div className='label-basic width55pc'>
                    Therapy Tool
                </div>
                <div className='label-basic width30pc'>
                    Duration
                </div>
                <div className={editClassName}>

                </div>
                <div className={editClassName}>

                </div>
            </div>
            <div className='tp-body'>
                {getToolsList()}
            </div>
        </div>
    );
}

export default ToolPrescription;

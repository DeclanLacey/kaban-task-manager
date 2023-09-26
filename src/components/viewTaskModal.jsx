import React from "react";

function ViewTaskModal() {
    return (
        <div className="view-task-modal">
            <div className="view-task-modal-page-cover"> </div>
            <div className="view-task-modal-content">
                <div className="task-title-container">
                    <h1 className="view-task-title"> Research pricing points of various competitors and trial different business models </h1>
                    <img className="view-task-three-dots-svg" src="src\assets\icon-vertical-ellipsis.svg" />
                </div>
                <p className="task-description"> We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.</p>
                <p className="subtask-title"> Subtasks (2 of 3) </p>
                <div className="substask-container">
                    <div className="subtask"> 
                        <input className="subtask-checkbox" type="checkbox"/>
                        <label className="subtask-label">  Research competitor pricing and business models </label>
                    </div>
                    <div className="subtask"> 
                        <input className="subtask-checkbox" type="checkbox"/>
                        <label className="subtask-label">  Research competitor pricing and business models </label>
                    </div>
                    <div className="subtask"> 
                        <input className="subtask-checkbox" type="checkbox"/>
                        <label className="subtask-label">  Research competitor pricing and business models </label>
                    </div>
                </div>
                <div className="current-status-container">
                    <label className="current-status-label"> Current Status </label> 
                    <select className="current-status-select">
                        <option> Doing </option>
                    </select>
                </div>
                
            </div>
        </div>
    )
}

export default ViewTaskModal
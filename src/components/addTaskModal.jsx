import React from "react";

function AddTaskModal() {
    return (
        <div className="add-task-modal">
            <div className="modal-page-cover"> </div>
            <div className="modal-content">
                <h1 className="modal-title"> Add New Task</h1>
                <div className="modal-input-container">
                    <label className="modal-label"> Title </label>
                    <input className="text-box-normal" type="text" placeholder="e.g. Take coffee break" />
                </div>
                <div className="modal-input-container">
                    <label className="modal-label"> Description </label>
                    <textarea className="text-box-large" type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."/>
                </div>

                <div className="modal-input-container">
                    <h3 className="modal-label"> Subtasks </h3>
                    <div className="input-with-x-container"> 
                        <input className="subtask-input" type="text" placeholder="e.g. Make coffee"/>
                        <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg"/>
                    </div>
                    <div className="input-with-x-container"> 
                        <input className="subtask-input" type="text" placeholder="e.g. Drink coffee & smile"/>
                        <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg"/>
                    </div> 
                    <button className="modal-add-new-btn"> +Add New Subtask </button>
                </div>

                <div className="modal-input-container">
                    <label className="modal-label"> Status </label>
                    <select className="select-menu"> 
                        <option> Todo</option>
                    </select>
                </div>

                <button className="modal-final-btn"> Create Task</button>
            </div>
        </div>
    )
}

export default AddTaskModal
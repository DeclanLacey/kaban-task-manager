import React from "react";

function DeleteTaskModal() {
    return (
        <div className="delete-task-modal">
            <div className="modal-page-cover"> </div>
            <div className="modal-content delete-modal-content">
                <h1 className="delete-title"> Delete this task?</h1>
                <p className="delete-text"> Are you sure you want to delete the ‘REPLACE WITH ACTUAL NAME’ task and its subtasks? This action cannot be reversed. </p>
                <button className="delete-btn"> Delete </button>
                <button className="cancel-btn"> Cancel </button>
            </div>
        </div>
    )
}

export default DeleteTaskModal
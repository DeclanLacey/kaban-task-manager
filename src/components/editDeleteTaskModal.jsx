import React from "react";

function EditDeleteTaskModal(props) {

    function handleDeleteTaskClick() {
        props.setDeleteTaskOpen(true)
        props.setViewTaskOpen(false)
        props.setEditDeleteTaskOpen(false)
    }

    function handleEditTaskClick() {
        props.setEditTaskSelectedTaskData(props.selectedTaskData)
        props.setEditTaskOpen(true)
        props.setViewTaskOpen(false)
        props.setEditDeleteTaskOpen(false)
    }
  
    return (
        <div className="choose-edit-delete-modal edit-delete-task-modal">
            <h1 onClick={handleEditTaskClick} className="edit-choice"> Edit Task </h1>
            <h1 onClick={handleDeleteTaskClick} className="delete-choice"> Delete Task</h1>
        </div>
    )
}

export default EditDeleteTaskModal
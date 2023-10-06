import React from "react";

function Task(props) {

    const taskData = props.taskData
    const subtasks = props.taskData.subtasks
    const subtaskCount = subtasks.length
    let completedSubtaskCount = 0

    function calculateCompletedSubtaskCount() {
        for (let i = 0; i < subtaskCount; i++) {
            if (subtasks[i].isCompleted === true) {
                completedSubtaskCount ++
            }
        }
    }

    function openViewTaskModal() {
        props.setViewTaskOpen(true)
        props.setCurrentTaskData(taskData)
        props.setCurrentColumnData(props.columnData)
    }


    calculateCompletedSubtaskCount()

    return (
        <div onClick={openViewTaskModal}>
            <div className="task-container" >
                <h1 className="task-title"> {taskData.title} </h1>            
                <p className="task-subtask-title"> {`${completedSubtaskCount} of ${subtaskCount} subtasks`} </p>
            </div>
        </div>
        
    )
}

export default Task
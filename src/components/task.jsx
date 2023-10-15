import React, {useContext} from "react";
import { TaskDataContext } from "./taskDataContext";

function Task(props) {

    const {dark} = useContext(TaskDataContext)
    const [darkMode, setDarkMode] = dark
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
            <div className={darkMode ? "task-container dark-grey-background" : "task-container"} >
                <h1 className="task-title"> {taskData.title} </h1>            
                <p className="task-subtask-title"> {`${completedSubtaskCount} of ${subtaskCount} subtasks`} </p>
            </div>
        </div>
        
    )
}

export default Task
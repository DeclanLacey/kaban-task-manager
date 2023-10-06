import React from "react"; 
import Task from "./task";


function TaskColumn(props) {

    const name = props.currentBoardDataColumn.name
    const tasks = props.allTasks
    let taskElements = []
   
    function renderTasks() {
        for (let i = 0; i < tasks.length; i++) {
            
            if (tasks[i].status === name) {
                taskElements.push( <Task setCurrentColumnData={props.setCurrentColumnData} columnData={props.currentBoardDataColumn} setCurrentTaskData={props.setCurrentTaskData} setViewTaskOpen={props.setViewTaskOpen} editTask={props.editTask} key={i} taskData={tasks[i]}/>)
            }
            
        }
    }


    if (tasks === undefined) {

    }else {
        renderTasks()
    }


    return (
        <div key={1} className="task-column">
            <div className="column-title-container">
                <div className="column-title-circle"> </div>
                {/* These cirlces will need to be different colors */}
                <h1 className="column-title"> {name} (0)  </h1>
            </div>
            <div className="task-column-tasks-container">
                {taskElements}
            </div>
        </div>
    )
}

export default TaskColumn
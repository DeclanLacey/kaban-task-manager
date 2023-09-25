import React from "react"; 
import Task from "./task";

function TaskColumn() {
    return (
        <div className="task-column">
            <div className="column-title-container">
                <div className="column-title-circle"> </div>
                <h1 className="column-title"> Todo (0) </h1>
            </div>
            <div className="task-column-tasks-container">
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
            </div>
        </div>
    )
}

export default TaskColumn
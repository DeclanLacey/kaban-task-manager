import React from "react"; 
import Task from "./task";
import { render } from "react-dom";


function TaskColumn(props) {

    const name = props.currentBoardDataColumn.name
    const tasks = props.currentBoardDataColumn.tasks
    let taskElements = []
   
    function renderTasks() {
        for (let i = 0; i < tasks.length; i++) {
            let name = tasks[i].title
            taskElements.push( <Task editTask={props.editTask} key={name} taskData={tasks[i]}/>)
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
                {/* Todo (0) */}
            </div>
                {/* you will need one for loop creating each column,
                and then within each column you will need another for loop
                to decide which peices of data get place inside them,
                probably by passing data to the task file and rendering that */}
            <div className="task-column-tasks-container">
                {taskElements}
            </div>
        </div>
    )
}

export default TaskColumn
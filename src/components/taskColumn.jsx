import React from "react"; 
import Task from "./task";

function TaskColumn() {
    return (
        <div className="task-column">
            <div className="column-title-container">
                {/* <div className="column-title-circle"> </div> */}
                {/* These cirlces will need to be different colors */}
                <h1 className="column-title">  </h1>
                {/* Todo (0) */}
            </div>
                {/* you will need one for loop creating each column,
                and then within each column you will need another for loop
                to decide which peices of data get place inside them,
                probably by passing data to the task file and rendering that */}
            <div className="task-column-tasks-container">
                {/* for loop placing the right tasks here */}
            </div>
        </div>
    )
}

export default TaskColumn
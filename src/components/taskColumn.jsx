import React, { useEffect } from "react"; 
import Task from "./task";

// let count = 0

function TaskColumn(props) {


    // console.log(count)
    

    const name = props.currentBoardDataColumn.name
    const tasks = props.allTasks
    let taskElements = []
    // const colorList= ["#8ecae6", "#49C4E5", "#023047", "#ffb703", "#fb8500", "#d81159", "#9fffcb", "#ff5400", "#33415c"]

    // you need to do the random color thing in APP instead and pass it as a prop


    // function randomNumber() {
    //     let max = colorList.length
    //     let num = Math.floor(Math.random() * max)
    //     return num
    // }

    // count++
   
    function renderTasks() {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status === name) {
                taskElements.push( <Task setCurrentColumnData={props.setCurrentColumnData} columnData={props.currentBoardDataColumn} setCurrentTaskData={props.setCurrentTaskData} setViewTaskOpen={props.setViewTaskOpen} editTask={props.editTask} key={i} taskData={tasks[i]}/>)
            } 
        }
    }

    if (tasks === undefined) {
        //// Do Nothing
    }else {
        renderTasks()
    }

    return (
        <div key={1} className="task-column">
            <div className="column-title-container">
                <div className="column-title-circle" > </div>
                <h1 className="column-title"> {name} (0)  </h1>
            </div>
            <div className="task-column-tasks-container">
                {taskElements}
            </div>
        </div>
    )
}

export default TaskColumn
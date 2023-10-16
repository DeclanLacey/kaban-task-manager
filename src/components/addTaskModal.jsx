import React, { useState, useContext } from "react";
import * as scroll from "./enableDisableScroll"
import { TaskDataContext } from "./taskDataContext";
import deleteIcon from "../assets/icon-cross.svg"

let count = 0
let subtaskElements = []
let subtaskNames = {

}

function AddTaskModal(props) {

    scroll.disableScroll()
    const {dark} = React.useContext(TaskDataContext)
    const [darkMode, setDarkMode] = dark
    const [subtaskCount, setSubtaskCount] = useState(0)
    let currentData = props.currentBoardData

    function renderColumnOptions() {
        let columnNameOptions = []
        for (let i = 0; i < currentData.columns.length; i++) {
            columnNameOptions.push( <option key={i} value={currentData.columns[i].name}> {currentData.columns[i].name} </option>)
        }
        return columnNameOptions
    }

    function buildSubtasks(index) {
        subtaskElements.push(
        <div className="input-with-x-container" key={index}> 
            <input required className={darkMode ? "subtask-input dark-grey-background text-color-white" : "subtask-input"} onChange={handleSubtaskChange} type="text" name={`subtask${index}`} placeholder="e.g. Make coffee"/>
            <img className="subtask-delete-btn-img" src={deleteIcon} onClick={removeSubtaskInput}/>
            
        </div>
        )
    }

    function addNewSubtask() {
        count++
        buildSubtasks(count)
        setSubtaskCount(prevState => prevState + 1)
    }

    function removeSubtaskInput(event) {
        let objectKeyToRemove = event.target.previousSibling.name
        delete subtaskNames[objectKeyToRemove]
        event.target.parentElement.remove()
        setSubtaskCount(prevCount => prevCount - 1)
    }

    function handleSubtaskChange(event) {
        const name = event.target.name
        const value = event.target.value
        subtaskNames[name] = value
    }

    function closeAddTaskModal() {
        subtaskElements = []
        subtaskNames = {}
        props.setAddTaskOpen(false)
        scroll.enableScroll()
    }

    function handleTaskSubmit(event) {
        event.preventDefault()

        //// Declaring variables that will hold temp data to check for duplicates
        let taskNames = []
        let subtaskNamesArray = []
        let subtaskNamesKeys = Object.keys(subtaskNames)

        /// Looping through the current tasks in the board and placing them in an array for further use
        for (let i = 0; i < props.allTasks.length; i++) {
            taskNames.push(props.allTasks[i].title)
        }

        /// Placing the given subtask names into an array
        subtaskNamesKeys.forEach((subtask) => subtaskNamesArray.push(subtaskNames[subtask]))
        function checkIfDuplicateSubtaskExists() {
            return new Set(subtaskNamesArray).size !== subtaskNamesArray.length
        }
      
        /// Checking to see if a task with the same name already exisits, or if there are duplicate subtasks. 
        //// If not then updating state with given information
        if (taskNames.includes(event.target.title.value)) {
            alert(`${event.target.title.value} already exists as a task. Please Choose a different name.`)
        }else if(checkIfDuplicateSubtaskExists() === true) {
            alert(`Two subtasks with the same name cannot exist.`)
        }else {

            let subtaskArray = []
            let selectedColumn = event.target.status.value
            for (let i = 0; i < subtaskCount; i++) {
                subtaskArray.push({
                    "title": subtaskNames[`subtask${i + 1}`],
                    "isCompleted": false
                })
            }
    
            props.setTaskData(prevState => {
                return {
                    boards: prevState.boards.map((board, index) => {
                        if (board.name === currentData.name) {
                            return  {
                                name: currentData.name,
                                columns: currentData.columns.map((column, columnIndex) => {
                                    if (column.name === selectedColumn && prevState.boards[index].columns[columnIndex].tasks != undefined) {
                                        return {
                                            name: column.name,
                                            tasks: 
                                            [
                                                ...prevState.boards[index].columns[columnIndex].tasks,
                                                {
                                                    title: event.target.title.value,
                                                    description: event.target.desc.value,
                                                    status: event.target.status.value,
                                                    subtasks: subtaskArray
                                                }
                                            ]
                                        }
                                    }else if (column.name === selectedColumn && prevState.boards[index].columns[columnIndex].tasks === undefined) {
                                        return {
                                            name: column.name,
                                            tasks: 
                                            [
                                                {
                                                    title: event.target.title.value,
                                                    description: event.target.desc.value,
                                                    status: event.target.status.value,
                                                    subtasks: subtaskArray
                                                }
                                            ]
                                        }
                                    }else {
                                        return column
                                    }
                                })
                            }
                        }else {
                            return board
                        }
                    })
                }
            })
            subtaskElements = []
            subtaskNames = {}
            props.setAddTaskOpen(false)
            scroll.enableScroll()
            count = 0
        }
    }

    return (
        <div className="add-task-modal">
            <div className="modal-page-cover" onClick={closeAddTaskModal}> </div>
            <div className={darkMode ? "modal-content dark-grey-background text-color-white" : "modal-content"}>
                <form onSubmit={handleTaskSubmit}>
                    <h1 className="modal-title"> Add New Task</h1>
                    
                    <div className="modal-input-container">
                        <label className="modal-label"> Title </label>
                        <input required name="title" className={darkMode ? "text-box-normal dark-grey-background text-color-white" : "text-box-normal"} type="text" placeholder="e.g. Take coffee break" />
                    </div>

                    <div className="modal-input-container">
                        <label className="modal-label"> Description </label>
                        <textarea maxLength = "200" name="desc" className={darkMode ? "text-box-large desc-box dark-grey-background text-color-white" : "text-box-large desc-box"} type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."/>
                    </div>

                    <div className="modal-input-container">
                        <h3 className="modal-label"> Subtasks </h3>
                        <div>
                            {subtaskElements}
                        </div>
                        <button type="button" className={darkMode ? "modal-add-new-btn white-background-hover" : "modal-add-new-btn"} onClick={addNewSubtask}> +Add New Subtask </button>
                    </div>

                    <div className="modal-input-container">
                        <label className="modal-label"> Status </label>
                        <select name="status" className={darkMode ? "select-menu dark-grey-background text-color-white" : "select-menu"}> 
                            {renderColumnOptions()}
                        </select>
                    </div>

                    <button type="submit" className="modal-final-btn"> Create Task</button>
                </form>
            </div>
            
        </div>
    )
}

export default AddTaskModal
import React, { useState } from "react";

let count = 0
let subtaskElements = []
let subtaskNames = {

}

function AddTaskModal(props) {

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
            <input required className="subtask-input" onChange={handleSubtaskChange} type="text" name={`subtask${index}`} placeholder="e.g. Make coffee"/>
            <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg" onClick={removeSubtaskInput}/>
        </div>
        )
    }

    function addNewSubtask() {
        count++
        buildSubtasks(count)
        setSubtaskCount(prevState => prevState + 1)
    }

    function removeSubtaskInput(event) {
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
    }

    function handleTaskSubmit(event) {
        event.preventDefault()
        let taskNames = []
        let subtaskNamesArray = []
        let subtaskNamesKeys = Object.keys(subtaskNames)

        for (let i = 0; i < props.allTasks.length; i++) {
            taskNames.push(props.allTasks[i].title)
        }

        subtaskNamesKeys.forEach((subtask) => subtaskNamesArray.push(subtaskNames[subtask]))
        function checkIfDuplicateSubtaskExists() {
            return new Set(subtaskNamesArray).size !== subtaskNamesArray.length
        }
      
        if (taskNames.includes(event.target.title.value)) {
            alert(`${event.target.title.value} already exists as a task. Please Choose a different name.`)
        }else if(checkIfDuplicateSubtaskExists() === true) {
            alert(`Two subtasks with the same name cannot exist.`)
        }else {
            let subtaskArray = []
            let selectedColumn = event.target.status.value
            
            console.log(subtaskNames)
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
                                        // console.log(subtaskArray)
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
                                        // console.log(subtaskArray)

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
            count = 0
        }
    }

    return (
        <div className="add-task-modal">
            <div className="modal-page-cover" onClick={closeAddTaskModal}> </div>
            <div className="modal-content">
                <form onSubmit={handleTaskSubmit}>
                    <h1 className="modal-title"> Add New Task</h1>
                    <div className="modal-input-container">
                        <label className="modal-label"> Title </label>
                        <input required name="title" className="text-box-normal" type="text" placeholder="e.g. Take coffee break" />
                    </div>
                    <div className="modal-input-container">
                        <label className="modal-label"> Description </label>
                        <textarea required name="desc" className="text-box-large desc-box" type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."/>
                    </div>

                    <div className="modal-input-container">
                        <h3 className="modal-label"> Subtasks </h3>
                        <div>
                            {subtaskElements}
                        </div>
                        <button type="button" className="modal-add-new-btn" onClick={addNewSubtask}> +Add New Subtask </button>
                    </div>

                    <div className="modal-input-container">
                        <label className="modal-label"> Status </label>
                        <select name="status" className="select-menu"> 
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
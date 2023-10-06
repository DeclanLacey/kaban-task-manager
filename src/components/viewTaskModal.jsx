import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { TaskDataContext } from "./taskDataContext";


let selectedTaskData

function ViewTaskModal(props) {

    let currentColumnDataCopy = props.currentColumnData

    const {data, board} = React.useContext(TaskDataContext)
    const [taskData, setTaskData] = data

    if (selectedTaskData === undefined) {
        selectedTaskData = props.currentTaskData
    }    

    const subtaskCount = selectedTaskData.subtasks.length
    const subtasks = selectedTaskData.subtasks
    let completetdSubtaskCount = 0
    let subtaskElements = []

    function calculateCompletedSubtaskcount() {
        for(let i = 0; i < subtaskCount; i++) {
            if(selectedTaskData.subtasks[i].isCompleted === true) {
                completetdSubtaskCount++
            }
        }
    }

    

    //////////////////////////////////////////////
    /////////// FOR SOME REASON THE DATA IS GETTING MESSED UP WHEN YOU CHANGE MORE THAN ONE CHECBOX 
//////////////////////////////////////////////////


    function changeIsCompletedStatus(event) {

        setTaskData(prevState => {
                return {
                    boards: prevState.boards.map((board, index) => { 
                        if(board.name === props.currentBoard) {
                            return {
                                ...prevState.boards[index],
                                columns: prevState.boards[index].columns.map((column, index) => {
                                    if(column.name === selectedTaskData.status) {
                                        return {
                                            ...column,
                                            tasks: column.tasks.map((task, index) => {
                                                if (task.title === selectedTaskData.title) {
                                                    selectedTaskData = {
                                                        ...task,
                                                        subtasks: task.subtasks.map((subtask, index) => {
                                        
                                                            if(subtask.title === event.target.nextSibling.textContent) {
                                                                return {
                                                                    ...subtask,
                                                                    isCompleted: !subtask.isCompleted
                                                                }
                                                            }else {
                                                                return subtask
                                                            }
                                                        })
                                                    }
                                                    return {
                                                        ...task,
                                                        subtasks: task.subtasks.map((subtask, index) => {
                                        
                                                            if(subtask.title === event.target.nextSibling.textContent) {
                                                                return {
                                                                    ...subtask,
                                                                    isCompleted: !subtask.isCompleted
                                                                }
                                                            }else {
                                                                return subtask
                                                            }
                                                        })
                                                    }
                                                }else {
                                                    return task
                                                }
                                            })
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
            }
        )
    
    }

    function handleChangeStatus(event) {

        selectedTaskData = {
            ...selectedTaskData,
            status: event.target.value
        }

        // let currentColumnDataTasksDeleted = delete currentColumnDataCopy.tasks

        setTaskData(prevState => {
            return {
                boards: prevState.boards.map((board, index) => { 
                    if(board.name === props.currentBoard) {
                        return {
                            ...prevState.boards[index],
                            columns: prevState.boards[index].columns.map((column, index) => {
                                if(column.name === props.currentTaskData.status) {
                                    if (column.tasks.length === 1) {
                                        delete currentColumnDataCopy.tasks
                                        return {
                                            ...currentColumnDataCopy
                                        }
                                       
                                    }else {
                                        return {
                                            ...column,
                                            tasks: column.tasks.filter((task) => task.title != selectedTaskData.title)
                                        }
                                    }                       
                                        
                                }else if (column.name === event.target.value) {

                                    if (column.tasks != undefined) {
                                        return {
                                            ...column,
                                            tasks: column.tasks.map((task, index) => {
                                                if (task.title === selectedTaskData.title) {
                                                    return {
                                                        ...task,
                                                        status: selectedTaskData.status,
                                                    }
                                                }else {
                                                    return task
                                                }
                                            })
                                        }
                                    }else {
                                        return {
                                            ...column,
                                            tasks: [
                                                {
                                                    ...selectedTaskData,
                                                    status: selectedTaskData.status,
                                                }
                                            ]
                                        }
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
        }
        )

        closeViewTaskModal()
    }

    function closeViewTaskModal() {
        props.setViewTaskOpen(false)
    
    }

    function renderSubtasks() {
        for(let i = 0; i < subtaskCount; i++) {
            subtaskElements.push(
                <div className="subtask" key={i}> 
                    <input className="subtask-checkbox" type="checkbox" onChange={changeIsCompletedStatus} checked={subtasks[i].isCompleted}/>
                    <label className="subtask-label">{subtasks[i].title}</label>
                </div>
            )
        }
    }

    function renderStatusDropdown() {

        let dropdownSelections = []
        for (let i = 0; i < props.currentBoardData.columns.length; i++) {
            dropdownSelections.push(<option key={i} value={props.currentBoardData.columns[i].name}> {props.currentBoardData.columns[i].name} </option>)
        }

        return (
            <select value={selectedTaskData.status} onChange={handleChangeStatus} className="current-status-select select-menu">
                {dropdownSelections}
            </select>
        )
    }

    renderSubtasks()
    calculateCompletedSubtaskcount()

    return (
        <div className="view-task-modal">
            <div className="modal-page-cover" onClick={closeViewTaskModal}> </div>
            <div className="modal-content">
                <div className="task-title-container">
                    <h1 className="view-task-title"> {selectedTaskData.title} </h1>
                    <img className="view-task-three-dots-svg" src="src\assets\icon-vertical-ellipsis.svg" />
                </div>
                <p className="task-description"> {selectedTaskData.description}</p>
                <p className="subtask-title"> Subtasks ({completetdSubtaskCount} of {subtaskCount}) </p>
                <div className="substask-container">
                    {subtaskElements}
                </div>
                <div className="current-status-container">
                    <label className="current-status-label"> Current Status </label> 
                    {renderStatusDropdown()}
                </div>
                
            </div>
        </div>
    )
}

export default ViewTaskModal
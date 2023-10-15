import React, {useContext, useEffect, useState} from "react";
import EditDeleteTaskModal from "./editDeleteTaskModal";
import { TaskDataContext } from "./taskDataContext";
import * as scroll from "./enableDisableScroll"

let selectedTaskData

function ViewTaskModal(props) {

    scroll.disableScroll()
    let currentColumnDataCopy = props.currentColumnData
    const {data, board} = useContext(TaskDataContext)
    const [taskData, setTaskData] = data

    if (selectedTaskData === undefined) {
        selectedTaskData = props.currentTaskData
    }else if (selectedTaskData.title != props.currentTaskData.title) {
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
                                            tasks: [
                                                ...column.tasks,
                                                {
                                                    ...selectedTaskData
                                                }
                                            ]
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
        })
        closeViewTaskModal()
    }

    function renderSubtasks() {
        for(let i = 0; i < subtaskCount; i++) {
            subtaskElements.push(
                <div className="subtask" key={i}> 
                    <input className="subtask-checkbox" type="checkbox" onChange={changeIsCompletedStatus} checked={selectedTaskData.subtasks[i].isCompleted}/>
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

    function changeEditDeleteTaskModalStatus() {
        props.setEditDeleteTaskOpen(prevState => !prevState)
    }

    function closeEditDeleteTaskModal() {
        props.setEditDeleteTaskOpen(false)
    }

    function closeViewTaskModal() {
        props.setViewTaskOpen(false)
        props.setEditDeleteTaskOpen(false)
        scroll.enableScroll()
    }

    renderSubtasks()
    calculateCompletedSubtaskcount()
    
    return (
        <div className="view-task-modal">
            <div className="modal-page-cover" onClick={closeViewTaskModal}> </div>
            <div className="modal-content" >
                    {
                        props.editDeleteTaskOpen ?
                            <EditDeleteTaskModal 
                                setEditTaskOpen={props.setEditTaskOpen}
                                setDeleteTaskOpen={props.setDeleteTaskOpen}
                                setEditDeleteTaskOpen={props.setEditDeleteTaskOpen}
                                setViewTaskOpen={props.setViewTaskOpen}
                                selectedTaskData={selectedTaskData}
                                setEditTaskSelectedTaskData={props.setEditTaskSelectedTaskData}
                            />
                        :
                            <></>
                    }
                <div className="task-title-container">
                    <h1 className="view-task-title"> {selectedTaskData.title} </h1>
                    <img className="view-task-three-dots-svg" onClick={changeEditDeleteTaskModalStatus} src="src\assets\icon-vertical-ellipsis.svg" />
                </div>
                <p className="task-description"> {selectedTaskData.description}</p>
                <p className="subtask-title"> Subtasks ({completetdSubtaskCount} of {subtaskCount}) </p>
                <div className="substask-container" onClick={closeEditDeleteTaskModal}>
                    {subtaskElements}
                </div>
                <div className="current-status-container" onClick={closeEditDeleteTaskModal}>
                    <label className="current-status-label"> Current Status </label> 
                    {renderStatusDropdown()}
                </div>
                
            </div>
        </div>
    )
}

export default ViewTaskModal
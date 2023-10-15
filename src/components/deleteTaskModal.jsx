import React, {useContext} from "react";
import * as scroll from "./enableDisableScroll"
import { TaskDataContext } from "./taskDataContext";

function DeleteTaskModal(props) {

    scroll.disableScroll()
    const selectedTaskData = props.editTaskSelectedTaskData
    const { dark} = useContext(TaskDataContext)
    const [darkMode, setDarkMode] = dark

    function closeDeleteTaskModal() {
        props.setDeleteTaskOpen(false)
        scroll.enableScroll()
    }

    function handleDeleteClick() {
        
        closeDeleteTaskModal()
        props.setTaskData(prevState => {
            return {
                boards: prevState.boards.map((board, index) => { 
                    if(board.name === props.currentBoardData.name) {
                        return {
                            ...prevState.boards[index],
                            columns: prevState.boards[index].columns.map((column, index) => {
                                if(column.name === selectedTaskData.status) {
                                    return {
                                        ...column,
                                        tasks: column.tasks.filter((task) => task.title != selectedTaskData.title)
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
    }

    return (
        <div className="delete-task-modal">
            <div className="modal-page-cover"> </div>
            <div className={darkMode ? "modal-content delete-modal-content dark-grey-background" : "modal-content delete-modal-content"}>
                <h1 className="delete-title"> Delete this task?</h1>
                <p className="delete-text"> Are you sure you want to delete the task ‘{selectedTaskData.title}’ and its subtasks? This action cannot be reversed. </p>
                <div className="delete-edit-btns-container">
                    <button className="delete-btn" onClick={handleDeleteClick}> Delete </button>
                    <button className="cancel-btn" onClick={closeDeleteTaskModal}> Cancel </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTaskModal
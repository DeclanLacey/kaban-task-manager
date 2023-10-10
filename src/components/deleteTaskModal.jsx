import React from "react";

function DeleteTaskModal(props) {

    const selectedTaskData = props.editTaskSelectedTaskData


    function handleCancelClick() {
        props.setDeleteTaskOpen(false)
    }

    function handleDeleteClick() {
        props.setDeleteTaskOpen(false)

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
            <div className="modal-content delete-modal-content">
                <h1 className="delete-title"> Delete this task?</h1>
                <p className="delete-text"> Are you sure you want to delete the task ‘{selectedTaskData.title}’ and its subtasks? This action cannot be reversed. </p>
                <button className="delete-btn" onClick={handleDeleteClick}> Delete </button>
                <button className="cancel-btn" onClick={handleCancelClick}> Cancel </button>
            </div>
        </div>
    )
}

export default DeleteTaskModal
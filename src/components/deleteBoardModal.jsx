import React from "react";

function DeleteBoardModal(props) {

    const boardName = props.currentBoard

    function handleCancelBtnClick() {
        props.setDeleteBoardOpen(false)
    }

    function handleDeleteBtnClick() {
        const currentData = props.taskData
        if (currentData.boards.length === 1) {
            alert(`Must have at least one board`)
        }else {
            let currentBoardIndex
            let nextCurrentBoardIndex
            let remainingBoards = props.taskData.boards.filter((item) => item.name != boardName)
    
            for (let i = 0; i < currentData.boards.length; i++) {
                if (currentData.boards[i].name === boardName) {
                    currentBoardIndex = i
                }
            }
    
            props.setTaskData( prevState => {
                return {boards: remainingBoards}
            })
    
            if (currentData.boards[currentBoardIndex + 1] === undefined) {
             
                nextCurrentBoardIndex = currentBoardIndex - 1
                props.setCurrentBoard(currentData.boards[nextCurrentBoardIndex].name)
                
            }else {
    
                nextCurrentBoardIndex = currentBoardIndex + 1
                props.setCurrentBoard(currentData.boards[nextCurrentBoardIndex].name)
            
            }
            
            props.setDeleteBoardOpen(false)
    
        }

    }

    return (
        <div className="delete-board-modal">
            <div className="modal-page-cover"> </div>
            <div className="modal-content delete-modal-content">
                <h1 className="delete-title"> Delete this board?</h1>
                <p className="delete-text"> Are you sure you want to delete the ‘{boardName}’ board? This action will remove all columns and tasks and cannot be reversed. </p>
                <button className="delete-btn" onClick={handleDeleteBtnClick}> Delete </button>
                <button className="cancel-btn" onClick={handleCancelBtnClick}> Cancel </button>
            </div>
        </div>
    )
}

export default DeleteBoardModal
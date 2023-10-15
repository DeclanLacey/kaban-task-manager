import React, {useContext} from "react";
import * as scroll from "./enableDisableScroll"
import { TaskDataContext } from "./taskDataContext";

function DeleteBoardModal(props) {

    scroll.disableScroll()
    const boardName = props.currentBoard
    const { dark} = useContext(TaskDataContext)
    const [darkMode, setDarkMode] = dark

    function closeDeleteBoard() {
        props.setDeleteBoardOpen(false)
        scroll.enableScroll()
    }

    function handleDeleteBtnClick() {
        const currentData = props.taskData

        //// Checking if there are any boards left other than the selected one, if not
        //// It will not let you delete the board
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
            closeDeleteBoard()
        }
    }

    return (
        <div className="delete-board-modal">
            <div className="modal-page-cover"> </div>
            <div className={darkMode ? "modal-content delete-modal-content dark-grey-background" : "modal-content delete-modal-content"}>
                <h1 className="delete-title"> Delete this board?</h1>
                <p className="delete-text"> Are you sure you want to delete the ‘{boardName}’ board? This action will remove all columns and tasks and cannot be reversed. </p>
                <div className="delete-edit-btns-container">
                    <button className="delete-btn" onClick={handleDeleteBtnClick}> Delete </button>
                    <button className="cancel-btn" onClick={closeDeleteBoard}> Cancel </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBoardModal
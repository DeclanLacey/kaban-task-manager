import React, {useContext} from "react";
import { TaskDataContext } from "./taskDataContext";

function EditDeleteBoardModal(props) {

    const {dark} = useContext(TaskDataContext)
    const [darkMode, setDarkMode] = dark

    function handleDeleteBoardClick() {
        props.setDeleteBoardOpen(true)
        props.setEditDeleteBoardOpen(false)
    }

    function handleEditBoardClick() {
        props.setEditBoardOpen(true)
        props.setEditDeleteBoardOpen(false)
    }
  
    return (
        <div className={darkMode ? "choose-edit-delete-modal edit-delete-board-modal dark-grey-background" : "choose-edit-delete-modal edit-delete-board-modal"}>
            <h1 onClick={handleEditBoardClick} className="edit-choice"> Edit Board </h1>
            <h1 onClick={handleDeleteBoardClick} className="delete-choice"> Delete Board</h1>
        </div>
    )
}

export default EditDeleteBoardModal
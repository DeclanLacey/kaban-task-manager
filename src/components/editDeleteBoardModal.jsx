import React from "react";

function EditDeleteBoardModal(props) {


    function handleDeleteBoardClick() {
        props.setDeleteBoardOpen(true)
        props.setEditDeleteBoardPopUp(false)
    }

    function handleEditBoardClick() {
        props.setEditBoardOpen(true)
        props.setEditDeleteBoardPopUp(false)
    }
  
    return (
        <div className="edit-delete-board-modal">
            <h1 onClick={handleEditBoardClick} className="edit-board-choice"> Edit Board </h1>
            <h1 onClick={handleDeleteBoardClick} className="delete-board-choice"> Delete Board</h1>
        </div>
    )
}

export default EditDeleteBoardModal
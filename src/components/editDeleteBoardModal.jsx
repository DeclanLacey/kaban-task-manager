import React from "react";

function EditDeleteBoardModal(props) {

    function handleDeleteBoardClick() {
        props.setDeleteBoardOpen(true)
        props.setEditDeleteBoardOpen(false)
    }

    function handleEditBoardClick() {
        props.setEditBoardOpen(true)
        props.setEditDeleteBoardOpen(false)
    }
  
    return (
        <div className="choose-edit-delete-modal edit-delete-board-modal">
            <h1 onClick={handleEditBoardClick} className="edit-choice"> Edit Board </h1>
            <h1 onClick={handleDeleteBoardClick} className="delete-choice"> Delete Board</h1>
        </div>
    )
}

export default EditDeleteBoardModal
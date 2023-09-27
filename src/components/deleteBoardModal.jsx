import React from "react";

function DeleteBoardModal() {
    return (
        <div className="delete-board-modal">
            <div className="modal-page-cover"> </div>
            <div className="modal-content delete-modal-content">
                <h1 className="delete-title"> Delete this board?</h1>
                <p className="delete-text"> Are you sure you want to delete the ‘PLACE ACTUAL NAME HERE’ board? This action will remove all columns and tasks and cannot be reversed. </p>
                <button className="delete-btn"> Delete </button>
                <button className="cancel-btn"> Cancel </button>
            </div>
        </div>
    )
}

export default DeleteBoardModal
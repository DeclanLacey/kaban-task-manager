import React from "react";

function AddBoardModal() {
    return (
        <div className="add-board-modal">
            <div className="modal-page-cover"> </div>
            <div className="modal-content">
                <h1 className="modal-title"> Add New Board </h1>
                <div className="modal-input-container">
                    <label className="modal-label"> Board Name </label>
                    <input className="text-box-normal" type="text" placeholder="e.g. Web Design" />
                </div>
                <div className="modal-input-container">
                    <h3 className="modal-label"> Board Columns </h3>
                    <div className="input-with-x-container"> 
                        <input className="subtask-input" type="text" value="Todo"/>
                        <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg"/>
                    </div>
                    <div className="input-with-x-container"> 
                        <input className="subtask-input" type="text" value="Doing" />
                        <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg"/>
                    </div> 
                    <div className="input-with-x-container"> 
                        <input className="subtask-input" type="text" value="Done" />
                        <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg"/>
                    </div> 
                    <button className="modal-add-new-btn"> +Add New Column </button>

                </div>

                <button className="modal-final-btn"> Create New Board</button>
            </div>
        </div>
    )
}

export default AddBoardModal
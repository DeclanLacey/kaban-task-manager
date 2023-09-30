import React from "react";

function EditBoardModal(props) {

    let boardColumns = []
    let boardName = props.currentBoardData.name


    ////////////////////////////////////////////////////////////
    ///////////// YOU NEED TO FINISH THIS PART /////////////////
    ///////////////////////////////////////////////////////////
    
    for (let i = 0; i < props.currentBoardData.columns; i++) {
        console.log(props.currentBoardData.columns[i])
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.setEditBoardOpen(false)
    }

    return (
        <div className="edit-board-modal">
            <div className="modal-page-cover"> </div>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <h1 className="modal-title"> Edit Board </h1>
                        <div className="modal-input-container">
                            <label className="modal-label"> Board Name </label>
                            <input className="text-box-normal" type="text" />
                        </div>
                        <div className="modal-input-container">
                            <h3 className="modal-label"> Board Columns </h3>
                            <div className="input-with-x-container"> 
                                <input className="subtask-input" type="text" />
                                <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg"/>
                            </div>
                            <div className="input-with-x-container"> 
                                <input className="subtask-input" type="text"  />
                                <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg"/>
                            </div> 
                            <div className="input-with-x-container"> 
                                <input className="subtask-input" type="text"  />
                                <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg"/>
                            </div> 
                            <button className="modal-add-new-btn"> +Add New Column </button>

                        </div>

                        <button type="submit" className="modal-final-btn"> Save Changes </button>
                    </form>
            </div>
        </div>
    )
}

export default EditBoardModal
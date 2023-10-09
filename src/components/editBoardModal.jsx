import React, { useState } from "react";

function EditBoardModal(props) {
    
    let columnElements = []
    let initalBoardData = props.currentBoardData
    const [boardColumns, setBoardColumns] = useState(initalBoardData.columns)
    const [boardName, setBoardName] = useState(props.currentBoardData.name)
    
    function renderBoardColumns() {
        if (!boardColumns) {

        }else {
            for (let i = 0; i < boardColumns.length; i++) {
                columnElements.push(
                    <div className="input-with-x-container" key={i} id={i}> 
                        <input className="subtask-input" type="text" onChange={handleColumnChange} value={boardColumns[i].name} />
                        <img className="subtask-delete-btn-img" onClick={deleteColumnElement} src="src\assets\icon-cross.svg"/>
                    </div> 
                )
            }
        }
        return columnElements
    }

    function deleteColumnElement(event) {
        const currentElementId = parseInt(event.target.parentElement.id)
        const currentElementvalue = event.target.previousElementSibling.value
        
        setBoardColumns( prevState => {
                return prevState.filter((item, index) => index !== currentElementId)
                
            }
        )
        
    }

    function addColumnElement() {
        if (boardColumns) {
            setBoardColumns(prevState => [...prevState, {name: ""}])
        }else {
            setBoardColumns([{name: ""}])
        }
    }

    function handleColumnChange(event) {
        const currentElementValue = event.target.value
        const currentElementId = parseInt(event.target.parentElement.id)
        setBoardColumns(
            boardColumns.map((item, index) => {
                    if (index === currentElementId) {
                        return {...item, name: currentElementValue}
                    }else {
                        return item
                    }
                }
            )
        )
    }

    function handleNameChange(event) {
        setBoardName(event.target.value)
    }

    function closeEditBoardModal() {
        props.setEditBoardOpen(false)
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.setTaskData(prevState => {
            return {
               boards: prevState.boards.map((item) => {
                    if (item.name === initalBoardData.name) {
                        return {
                            name: boardName,
                            columns: boardColumns
                        }
                    }else {
                        return item
                    }
               })
            }     
        })
        props.setCurrentBoard(boardName)
        closeEditBoardModal()
    }

    return (
        <div className="edit-board-modal">
            <div className="modal-page-cover" onClick={closeEditBoardModal}> </div>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <h1 className="modal-title"> Edit Board </h1>
                        <div className="modal-input-container">
                            <label className="modal-label"> Board Name </label>
                            <input className="text-box-normal" type="text" onChange={handleNameChange} value={boardName} />
                        </div>
                        <div className="modal-input-container">
                            <h3 className="modal-label"> Board Columns </h3>
                            {renderBoardColumns()}
                            <button type="button" className="modal-add-new-btn" onClick={addColumnElement} > +Add New Column </button>
                        </div>

                        <button type="submit" className="modal-final-btn"> Save Changes </button>
                    </form>
            </div>
        </div>
    )
}

export default EditBoardModal
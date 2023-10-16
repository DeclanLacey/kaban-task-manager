import React, { useState, useEffect } from "react";
import * as scroll from "./enableDisableScroll"
import { TaskDataContext } from "./taskDataContext";
import deleteIcon from "../assets/icon-cross.svg"

function EditBoardModal(props) {

    useEffect(() => {
        props.setMenuOpen(false)
    }, [])
    scroll.disableScroll()

    let columnElements = []
    let initalBoardData = props.currentBoardData
    const [boardColumns, setBoardColumns] = useState(initalBoardData.columns)
    const [boardName, setBoardName] = useState(props.currentBoardData.name)
    const {dark} = React.useContext(TaskDataContext)
    const [darkMode, setDarkMode] = dark
    
    function renderBoardColumns() {
        if (!boardColumns) {
            //// Do nothing
        }else {
            for (let i = 0; i < boardColumns.length; i++) {
                columnElements.push(
                    <div className="input-with-x-container" key={i} id={i}> 
                        <input required className={darkMode ? "subtask-input dark-grey-background text-color-white" : "subtask-input"} type="text" onChange={handleColumnChange} value={boardColumns[i].name} />
                            <img className="subtask-delete-btn-img" onClick={deleteColumnElement} src={deleteIcon}/>
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
        scroll.enableScroll()
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
                <div className={darkMode ? "modal-content dark-grey-background text-color-white" : "modal-content"}>
                    <form onSubmit={handleSubmit}>
                        <h1 className="modal-title"> Edit Board </h1>
                        
                        <div className="modal-input-container">
                            <label className="modal-label"> Board Name </label>
                            <input className={darkMode ? "text-box-normal dark-grey-background text-color-white" : "text-box-normal"} type="text" onChange={handleNameChange} value={boardName} />
                        </div>

                        <div className="modal-input-container">
                            <h3 className="modal-label"> Board Columns </h3>
                            {renderBoardColumns()}
                            <button type="button" className={darkMode ? "modal-add-new-btn white-background-hover" : "modal-add-new-btn"} onClick={addColumnElement} > +Add New Column </button>
                        </div>

                        <button type="submit" className="modal-final-btn"> Save Changes </button>
                    </form>
            </div>
        </div>
    )
}

export default EditBoardModal
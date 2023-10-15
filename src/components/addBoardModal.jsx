import React, {useState} from "react";
import { TaskDataContext } from "./taskDataContext";
import * as scroll from "./enableDisableScroll"

let count = 0
const columnElements = []
const columnNames = {

}

function AddBoardModal(props) {

    scroll.disableScroll()
    const {data, dark} = React.useContext(TaskDataContext)
    const [taskData, setTaskData] = data
    const [darkMode, setDarkMode] = dark
    const [columnCount, setColumnCount] = useState(0)

    function closeAddBoardModal() {
        props.setAddBoardOpen(false)
        scroll.enableScroll()
    }

    function buildColumns(index) {
            columnElements.push(
            <div className="input-with-x-container" key={index}> 
                <input required className={darkMode ? "subtask-input dark-grey-background text-color-white" : "subtask-input"} type="text" onChange={handleColumnChange} name={`boardColumn${index}`}/>
                <img className="subtask-delete-btn-img"  src="src\assets\icon-cross.svg" onClick={removeColumnInput}/>
            </div>
            )
    }

    function removeColumnInput(event) {
        event.target.parentElement.remove()
        setColumnCount(prevCount => prevCount - 1)
    }

    function handleColumnChange(event) {
        const name = event.target.name
        const value = event.target.value
        columnNames[name] = value
    }

    function addNewColumn() {
        count++
        buildColumns(count)
        setColumnCount(prevState => prevState + 1)
    }

    function handleSubmit(event) {
        event.preventDefault()
        let boardNames = []

        // placing board names in an array
        for (let i = 0; i < taskData.boards.length; i++) {
            boardNames.push(taskData.boards[i].name)
        }

        //// Putting column names in an array
        let newColumnNames = []
        for (let i = 1; i < columnCount + 1; i++) {
            newColumnNames.push(columnNames[`boardColumn${i}`])
        }

        //// Checking to see if two of the given names for columns are the same
        function hasDuplicates(array) {
            return (new Set(array)).size !== array.length;
        }

        ///// Running checks to see if the column names alreay exist elsewhere in the board, if not then
        ///// Setting the state with the new data
        if (boardNames.includes(event.target.boardName.value)) {
            alert(`${event.target.boardName.value} already exists as a board. Please Choose a different name.`)
        }else if(hasDuplicates(newColumnNames) === true) {
            alert("There cannot be two columns with the same name. Please choose a different name.")
        }else {

            let newColumns = []
            for (let i = 0; i < columnCount; i++) {
                newColumns.push({name: Object.values(columnNames)[i]})
            }
    
            if(columnCount > 0) {
                setTaskData(prevData => {
                    return {
                        ...prevData,
                        boards: [
                            ...prevData.boards,
                            {
                                "name": event.target.boardName.value,
                                "columns": newColumns
                            }
                        ]
                    }
                })
            
            }else {
                setTaskData(prevData => {
                    return {
                        ...prevData,
                        boards: [
                            ...prevData.boards,
                            {
                                "name": event.target.boardName.value
                            }
                        ]
                    }
                })
            }
            props.setCurrentBoard(event.target.boardName.value)
            closeAddBoardModal()
        }
    }

    return (
        <div className="add-board-modal">
            <div className="modal-page-cover" onClick={closeAddBoardModal}> </div>
            <div className={darkMode ? "modal-content dark-grey-background text-color-white" : "modal-content"}>
                <form onSubmit={handleSubmit}>
                    <h1 className="modal-title"> Add New Board </h1>
                    <div className="modal-input-container">
                        <label className="modal-label"> Board Name </label>
                        <input maxLength = "30" className={darkMode ? "text-box-normal dark-grey-background text-color-white" : "text-box-normal"} type="text" placeholder="e.g. Web Design" name="boardName" required/>
                    </div>
                    <div className="modal-input-container">
                        <h3 className="modal-label"> Board Columns </h3>
                        <div id="column-input-container">
                            {columnElements}
                        </div>
                        <button type="button" className={darkMode ? "modal-add-new-btn white-background-hover" : "modal-add-new-btn"} onClick={addNewColumn}> +Add New Column </button>
                    </div>
                    <button type="submit" className="modal-final-btn"> Create New Board</button>
                </form>
            </div>
        </div>
    )
}

export default AddBoardModal
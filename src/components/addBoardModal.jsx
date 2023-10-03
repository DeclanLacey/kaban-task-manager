import React, {useState} from "react";
import { TaskDataContext } from "./taskDataContext";

const columnElements = []
const columnNames = {

}
let count = 0

function AddBoardModal(props) {

    const {data, board} = React.useContext(TaskDataContext)
    const [taskData, setTaskData] = data
    const [columnCount, setColumnCount] = useState(0)


    function buildColumns(index) {
            columnElements.push(
            <div className="input-with-x-container" key={index}> 
                <input required className="subtask-input" type="text" onChange={handleColumnChange} name={`boardColumn${index}`}/>
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
        props.setAddBoardOpen(false)
    }

    return (
        <div className="add-board-modal">
            <div className="modal-page-cover"> </div>
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h1 className="modal-title"> Add New Board </h1>
                    <div className="modal-input-container">
                        <label className="modal-label"> Board Name </label>
                        <input className="text-box-normal" type="text" placeholder="e.g. Web Design" name="boardName" required/>
                    </div>
                    <div className="modal-input-container">
                        <h3 className="modal-label"> Board Columns </h3>
                        <div id="column-input-container">
                            {columnElements}
                        </div>
                        
                        <button type="button" className="modal-add-new-btn" onClick={addNewColumn}> +Add New Column </button>

                    </div>

                    <button type="submit" className="modal-final-btn"> Create New Board</button>
                </form>
            </div>
        </div>
    )
}

export default AddBoardModal
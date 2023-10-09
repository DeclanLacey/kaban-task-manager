import React, {useState} from "react";

// let count = 0
let subtaskNames = {

}
let selectedTaskData


//////////////////////////////////////////////
/////// Need to figure out how to stop it from filling in every empty subtask becasuse the name is the "same"
//////////////////////////////////////////////

function EditTaskModal(props) {
    
    let currentData = props.currentBoardData
    const [subtaskCount, setSubtaskCount] = useState()
    
    if (selectedTaskData === undefined) {
        selectedTaskData = props.editTaskSelectedTaskData
        setSubtaskCount(selectedTaskData.subtasks.length)
    }

    const [currentTaskData, setCurrentTaskData] = useState(selectedTaskData)

    function renderColumnOptions() {
        let columnNameOptions = []
        for (let i = 0; i < currentData.columns.length; i++) {
            columnNameOptions.push( <option key={i} value={currentData.columns[i].name}> {currentData.columns[i].name} </option>)
        }
        return columnNameOptions
    }

    function addNewSubtask() {
        selectedTaskData = {
            ...selectedTaskData,
            subtasks: [
                ...selectedTaskData.subtasks,
                {
                    title: "",
                    isCompleted: false
                }
            ]
        }
        setCurrentTaskData(selectedTaskData)
    }


    function removeSubtaskInput(event) {
        selectedTaskData = {
            ...selectedTaskData,
            subtasks: selectedTaskData.subtasks.filter(subtask => subtask.title != event.target.previousElementSibling.value)
        }
        setCurrentTaskData(selectedTaskData)
    }

    function renderSubtasks() {
        let subtaskElements = []

        // if (selectedTaskData.subtasks.length === undefined) {
        //     selectedTaskData = {
        //         ...selectedTaskData,
        //         subtasks: [
        //             ...selectedTaskData.subtasks,
        //             {
        //                 title: "",
        //                 isCompleted: false
        //             }
        //         ]
        //     }
        // }

        for (let i = 0; i < selectedTaskData.subtasks.length; i++) {
            subtaskElements.push(
                <div className="input-with-x-container" key={i}> 
                    <input required className="subtask-input" onChange={handleSubtaskChange} type="text" name={`subtask${i}`} value={selectedTaskData.subtasks[i].title} placeholder="e.g. Make coffee"/>
                    <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg" onClick={removeSubtaskInput}/>
                </div>
            )
        }
        
        
      
        return subtaskElements
    }

    function handleTitleChange(event) {
        selectedTaskData = {
            ...selectedTaskData,
            title: event.target.value
        }
        setCurrentTaskData(selectedTaskData)
    }

    function handleSubtaskChange(event) {

        // console.log(event.target.defaultValue)
    
        selectedTaskData = {
            ...selectedTaskData,
            subtasks: selectedTaskData.subtasks.map((subtask) => {
                if (subtask.title === event.target.defaultValue) {
                    return {
                        ...subtask,
                        title: event.target.value
                    }
                }else {
                    return subtask
                }
            })
        }
        setCurrentTaskData(selectedTaskData)
    }




    return (
        <div className="add-task-modal">
            <div className="modal-page-cover"> </div>
            <div className="modal-content">
                <h1 className="modal-title"> Edit Task</h1>
                <div className="modal-input-container">
                    <label className="modal-label"> Title </label>
                    <input className="text-box-normal" type="text" onChange={handleTitleChange} value={selectedTaskData.title} placeholder="e.g. Take coffee break" />
                </div>
                <div className="modal-input-container">
                    <label className="modal-label"> Description </label>
                    <textarea className="text-box-large desc-box" type="text" value={selectedTaskData.description} placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."/>
                </div>

                <div className="modal-input-container">
                    <h3 className="modal-label"> Subtasks </h3>
                    <div>
                        {renderSubtasks()}
                    </div>
                    <button className="modal-add-new-btn" onClick={addNewSubtask}> +Add New Subtask </button>
                </div>

                <div className="modal-input-container">
                    <label className="modal-label"> Status </label>
                    <select className="select-menu"> 
                        {renderColumnOptions()}
                    </select>
                </div>

                <button className="modal-final-btn"> Update Task</button>
            </div>
        </div>
    )
}

export default EditTaskModal
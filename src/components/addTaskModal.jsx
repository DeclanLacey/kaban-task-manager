import React, { useState } from "react";

let subtaskElements = []
let subtaskNames = {

}
let count = 0

function AddTaskModal(props) {

    const [subtaskCount, setSubtaskCount] = useState(0)

    let currentData = props.currentBoardData



    function renderColumnOptions() {
        let columnNameOptions = []
        for (let i = 0; i < currentData.columns.length; i++) {
            columnNameOptions.push( <option key={i} value={currentData.columns[i].name}> {currentData.columns[i].name} </option>)
        }
        return columnNameOptions
    }

    function buildSubtasks(index) {
        subtaskElements.push(
        <div className="input-with-x-container" key={index}> 
            <input required className="subtask-input" onChange={handleSubtaskChange} type="text" name={`subtask${index}`} placeholder="e.g. Make coffee"/>
            <img className="subtask-delete-btn-img" src="src\assets\icon-cross.svg" onClick={removeSubtaskInput}/>
        </div>
        )
    }

    function addNewSubtask() {
        count++
        buildSubtasks(count)

        setSubtaskCount(prevState => prevState + 1)
    }

    function removeSubtaskInput(event) {
        event.target.parentElement.remove()
        setSubtaskCount(prevCount => prevCount - 1)
    }

    function handleSubtaskChange(event) {
        const name = event.target.name
        const value = event.target.value
        subtaskNames[name] = value
    }

    function handleTaskSubmit(event) {
        event.preventDefault()
        const subtaskArray = []
        let selectedColumn = event.target.status.value
        
        for (let i = 0; i < subtaskCount; i++) {
            subtaskArray.push({
                "title": subtaskNames[`subtask${i + 1}`],
                "isCompleted": false
            })
        }

        props.setTaskData(prevState => {
            return {
                boards: prevState.boards.map((board, index) => {
                    if (board.name === currentData.name) {
                        return  {
                            name: currentData.name,
                            columns: currentData.columns.map((column, columnIndex) => {
                                if (column.name === selectedColumn && prevState.boards[index].columns[columnIndex].tasks != undefined) {
                                    return {
                                        name: column.name,
                                        tasks: 
                                        [
                                            ...prevState.boards[index].columns[columnIndex].tasks,
                                            {
                                                title: event.target.title.value,
                                                description: event.target.desc.value,
                                                status: event.target.status.value,
                                                subtasks: subtaskArray
                                            }
                                        ]
                                        
                                    }
                                }else if (column.name === selectedColumn && prevState.boards[index].columns[columnIndex].tasks === undefined) {
                                    return {
                                        name: column.name,
                                        tasks: 
                                        [
                                            {
                                                title: event.target.title.value,
                                                description: event.target.desc.value,
                                                status: event.target.status.value,
                                                subtasks: subtaskArray
                                            }
                                        ]
                                        
                                    }
                                }else {
                                    return column
                                }
                            })
                        }
                        
                    }else {
                        return board
                    }
               })
            }
        })

        subtaskElements = []
        subtaskNames = {}
        props.setAddTaskOpen(false)
    }



    return (
        <div className="add-task-modal">
            <div className="modal-page-cover"> </div>
            <div className="modal-content">
                <form onSubmit={handleTaskSubmit}>
                    <h1 className="modal-title"> Add New Task</h1>
                    <div className="modal-input-container">
                        <label className="modal-label"> Title </label>
                        <input required name="title" className="text-box-normal" type="text" placeholder="e.g. Take coffee break" />
                    </div>
                    <div className="modal-input-container">
                        <label className="modal-label"> Description </label>
                        <textarea required name="desc" className="text-box-large desc-box" type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."/>
                    </div>

                    <div className="modal-input-container">
                        <h3 className="modal-label"> Subtasks </h3>
                        <div>
                            {subtaskElements}
                        </div>
                        <button type="button" className="modal-add-new-btn" onClick={addNewSubtask}> +Add New Subtask </button>
                    </div>

                    <div className="modal-input-container">
                        <label className="modal-label"> Status </label>
                        <select name="status" className="select-menu"> 
                            {renderColumnOptions()}
                        </select>
                    </div>

                    <button type="submit" className="modal-final-btn"> Create Task</button>
                </form>
            </div>
            
        </div>
    )
}

export default AddTaskModal


// tasks: [
//     {
//         title: event.target.title.value,
//         description: event.target.desc.value,
//         status: event.target.status.value,
//         subtasks: [
//           {
//             "title": "Sign up page",
//             "isCompleted": true
//           },
//           {
//             "title": "Sign in page",
//             "isCompleted": false
//           },
//           {
//             "title": "Welcome page",
//             "isCompleted": false
//           }
//         ]
//       }
// ]



// ...prevState,
//                             columns: board.map((column) => {
//                                 if (column.name === event.target.status.value) {
//                                     return {
//                                         tasks: [
//                                             {
//                                                 title: event.target.title.value,
//                                                 description: event.target.desc.value,
//                                                 status: event.target.status.value,
//                                                 subtasks: [
//                                                   {
//                                                     "title": "Sign up page",
//                                                     "isCompleted": true
//                                                   },
//                                                   {
//                                                     "title": "Sign in page",
//                                                     "isCompleted": false
//                                                   },
//                                                   {
//                                                     "title": "Welcome page",
//                                                     "isCompleted": false
//                                                   }
//                                                 ]
//                                               }
//                                         ]
//                                     }
//                                 }
//                             })
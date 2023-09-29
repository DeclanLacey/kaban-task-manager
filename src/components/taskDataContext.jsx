import React, {useState, useEffect} from "react"

const TaskDataContext = React.createContext()

function TaskDataContextProvider(props) {

    const [taskData, setTaskData] = useState({
        "boards": [
            {
              "name": "General Tasks"
            },
            {
              "name": "General Tasks 2"
            }
          ]
    })

    const [currentBoard, setCurrentBoard] = useState(taskData.boards[0].name)
    

    return(
        <TaskDataContext.Provider value={{data: [taskData, setTaskData], board: [currentBoard, setCurrentBoard]}}> 
            {props.children}
        </TaskDataContext.Provider>  

    )
}

export {TaskDataContextProvider, TaskDataContext}
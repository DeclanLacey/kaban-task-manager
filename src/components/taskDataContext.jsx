import React, {useState, useEffect} from "react"
import data from "/src/data.json"

const TaskDataContext = React.createContext()

function TaskDataContextProvider(props) {

    let taskDataIntialValue

    localStorage.clear()
    if (localStorage.getItem("Task Data") !== null) {
        taskDataIntialValue = JSON.parse(localStorage.getItem("Task Data"))
    }else {
        taskDataIntialValue = data
    }

    const [taskData, setTaskData] = useState(taskDataIntialValue)

    useEffect(() => {
        localStorage.setItem("Task Data", JSON.stringify(taskData))
    }, [taskData])

    const [currentBoard, setCurrentBoard] = useState(taskData.boards[0].name)
    const [darkMode, setDarkMode] = useState(false)

    return(
        <TaskDataContext.Provider value={{data: [taskData, setTaskData], board: [currentBoard, setCurrentBoard], dark: [darkMode, setDarkMode]}}> 
            {props.children}
        </TaskDataContext.Provider>  

    )
}

export {TaskDataContextProvider, TaskDataContext}




// "tasks": [
//   {
//     "title": "Build UI for onboarding flow",
//     "description": "This is a test description",
//     "status": "Todo",
//     "subtasks": [
//       {
//         "title": "Sign up page",
//         "isCompleted": true
//       },
//       {
//         "title": "Sign in page",
//         "isCompleted": false
//       },
//       {
//         "title": "Welcome page",
//         "isCompleted": false
//       }
//     ]
//   }
// ]
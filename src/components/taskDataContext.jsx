import React, {useState, useEffect} from "react"
import data from "/src/data.json"

const TaskDataContext = React.createContext()
function TaskDataContextProvider(props) {

    let taskDataIntialValue
    let darkModeIntialValue

    if (localStorage.getItem("Task Data") !== null) {
        taskDataIntialValue = JSON.parse(localStorage.getItem("Task Data"))
    }else {
        taskDataIntialValue = data
    }

    if (localStorage.getItem("Dark Mode") !== null) {
        darkModeIntialValue = JSON.parse(localStorage.getItem("Dark Mode"))
    }else {
        darkModeIntialValue = false
    }

    const [taskData, setTaskData] = useState(taskDataIntialValue)
    const [currentBoard, setCurrentBoard] = useState(taskData.boards[0].name)
    const [darkMode, setDarkMode] = useState(darkModeIntialValue)

    useEffect(() => {
        localStorage.setItem("Task Data", JSON.stringify(taskData))
    }, [taskData])

    useEffect(() => {
        localStorage.setItem("Dark Mode", JSON.stringify(darkMode))
    }, [darkMode])

    return(
        <TaskDataContext.Provider value={{data: [taskData, setTaskData], board: [currentBoard, setCurrentBoard], dark: [darkMode, setDarkMode]}}> 
            {props.children}
        </TaskDataContext.Provider>  

    )
}

export {TaskDataContextProvider, TaskDataContext}
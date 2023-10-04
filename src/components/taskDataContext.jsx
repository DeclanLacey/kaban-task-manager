import React, {useState, useEffect} from "react"

const TaskDataContext = React.createContext()

function TaskDataContextProvider(props) {

    const [taskData, setTaskData] = useState({
        "boards": [
            {
              "name": "General Tasks",
              "columns": [
                {
                  "name": "Todo",
                  "tasks": [
                    {
                      "title": "Build UI for onboarding flow",
                      "description": "",
                      "status": "Todo",
                      "subtasks": [
                        {
                          "title": "Sign up page",
                          "isCompleted": true
                        },
                        {
                          "title": "Sign in page",
                          "isCompleted": false
                        },
                        {
                          "title": "Welcome page",
                          "isCompleted": false
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "Doing"
                  
                }
              ]
            },
            {
              "name": "General Tasks 2"
            },
            {
              "name": "General Tasks 3",
              "columns": [
                {
                  "name": "Todo"
                },
                {
                  "name": "Done"
                }
              ]
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
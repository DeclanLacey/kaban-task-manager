import React from "react";
import * as scroll from "./enableDisableScroll"
import { useState, useContext } from "react";
import { TaskDataContext } from "./taskDataContext";
import MenuModal from "./menuModal";
import TaskColumn from "./taskColumn";
import ViewTaskModal from "./viewTaskModal";
import AddTaskModal from "./addTaskModal";
import EditTaskModal from "./editTaskModal";
import AddBoardModal from "./addBoardModal";
import EditBoardModal from "./editBoardModal";
import DeleteBoardModal from "./deleteBoardModal";
import DeleteTaskModal from "./deleteTaskModal";
import EditDeleteBoardModal from "./editDeleteBoardModal";

function App() {

    let currentBoardData
    let allTasks = []
    let columnColors = ["#49C4E5", "#8471F2", "#67E2AE", "#EA5555", "#A8A4FF", "#FF9898", "#E4EBFA"]

    //// State declerations for knowing when a certain modal is open or not
    const [menuOpen, setMenuOpen] = useState(false)
    const [addBoardOpen, setAddBoardOpen] = useState(false)
    const [editBoardOpen, setEditBoardOpen] = useState(false)
    const [editDeleteBoardOpen, setEditDeleteBoardOpen] = useState(false)
    const [editDeleteTaskOpen, setEditDeleteTaskOpen] = useState(false)
    const [deleteBoardOpen, setDeleteBoardOpen] = useState(false)
    const [addTaskOpen, setAddTaskOpen] = useState(false)
    const [viewTaskOpen, setViewTaskOpen] = useState(false)
    const [editTaskOpen, setEditTaskOpen] = useState(false)
    const [deleteTaskOpen, setDeleteTaskOpen] = useState(false)

    /// State declerations for certain peices of data
    const [currentTaskData, setCurrentTaskData] = useState()
    const [currentColumnData, setCurrentColumnData] = useState()
    const [editTaskSelectedTaskData, setEditTaskSelectedTaskData] = useState()
    const {data, board, dark} = useContext(TaskDataContext)
    const [taskData, setTaskData] = data
    const [currentBoard, setCurrentBoard] = board
    const [darkMode, setDarkMode] = dark

    //// Checking to see if scrolling should be allowed or not when the menu is open
    window.addEventListener("resize", () => {
        if(window.innerWidth >= 750) {
            scroll.enableScroll()
        }else if (window.innerWidth <= 750 && menuOpen) {
            scroll.disableScroll()
        }else if (!menuOpen) {
            scroll.enableScroll()
        }
    })

    //// Opens or closes the menu when clicking on the name, only on smaller screens
    function changeMenuStatus() {
        if (window.innerWidth >= 750) {
            /// Do not change menuOpen state
        }else {
            if(menuOpen) {
                scroll.enableScroll()
            }
            setMenuOpen(prevState => !prevState)
        }
    }

    function openMenu() {
        setMenuOpen(true)
    }

    function getCurrentBoardData() {
        for (let i = 0; i < taskData.boards.length; i++) {
            if (taskData.boards[i].name === currentBoard) {
                currentBoardData = taskData.boards[i]
            }
        }
    }

    function changeAddTaskOpenStatus() {
        setAddTaskOpen(true)
        setMenuOpen(false)
    }

    function changeEditBoardOpenStatus() {
        setEditBoardOpen(true)
    }

    function changeEditDeleteBoardOpenStatus() {
        setEditDeleteBoardOpen(prevState => !prevState)
    }

    function closeEditDeleteBoardModal() {
        setEditDeleteBoardOpen(false)
    }

    function renderBoardColumns() {

        for (let i = 0; i < currentBoardData.columns.length; i++) {
            if (currentBoardData.columns[i].tasks != undefined) {
                for(let j = 0; j < currentBoardData.columns[i].tasks.length; j++) {
                    allTasks.push(currentBoardData.columns[i].tasks[j])
                }
            }
        }

        let columns = []
        for (let i = 0; i < currentBoardData.columns.length; i++) {
            let columnColor 
            if(columnColors[i] === undefined) {
                columnColor = columnColors[0]
            }else {
                columnColor =columnColors[i]
            }
            columns.push( <TaskColumn columnColor={columnColor} setCurrentColumnData={setCurrentColumnData} setCurrentTaskData={setCurrentTaskData} allTasks={allTasks}  setViewTaskOpen={setViewTaskOpen} currentBoardDataColumn={currentBoardData.columns[i]} key={i} />)
        }
        return columns
    }

    getCurrentBoardData()

    //// Deciding class names for column container 
    let columnContainerClassNames
    if (menuOpen && darkMode) {
        columnContainerClassNames = "menu-open very-dark-grey-background text-color-white"
    }else if (menuOpen && !darkMode) {
        columnContainerClassNames = "menu-open"
    }else if (!menuOpen && darkMode) {
        columnContainerClassNames = "very-dark-grey-background text-color-white"
    }

    return (
        <div className="app-container" >
            {
                menuOpen ?
                    <MenuModal 
                        setMenuOpen={setMenuOpen}
                        setAddBoardOpen={setAddBoardOpen}
                        menuOpen={menuOpen}
                    />
                :
                    <></>
            }
            {
                menuOpen ?
                    <></>
                :
                <button className="show-sidebar-btn" onClick={openMenu}>
                    <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <path d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z" />
                    </svg>
                </button>
            }
            <div >
                <header className={darkMode ? "header-container dark-grey-background text-color-white" : "header-container"} style={darkMode ? {border: "1px solid #3E3F4E"} : {}}> 
                    <div className="large-logo-container" style={darkMode ? {borderRight: "1px solid #3E3F4E", marginLeft: "-14px"} : {}}>
                        {
                            darkMode ?
                                <img className="large-screen-logo" src="src\assets\logo-light.svg" />
                            :
                                <img className="large-screen-logo" src="src\assets\logo-dark.svg" />
                        }
                    </div>
                    <div className="header-inner-container flex-left">
                        <img className="mobile-svg-logo" src="src\assets\logo-mobile.svg" />
                        <div className="dropdown-menu" onClick={changeMenuStatus}>
                            <div className="dropdown-menu-inner-container-top">
                            <h1 className="dropdown-menu-text"> {currentBoard} </h1>
                            {
                                menuOpen ?
                                    <img className="dropdown-menu-arrow" src="src\assets\icon-chevron-up.svg" />
                                :
                                    <img className="dropdown-menu-arrow" src="src\assets\icon-chevron-down.svg" />
                            }
                            </div>
                            
                        </div>
                    </div>
                    <div className="header-inner-container flex-right">
                        {
                            currentBoardData.columns === undefined ? 
                                <button className="add-task-btn" style={{opacity: .4}} disabled onClick={changeAddTaskOpenStatus}> <span className="add-task-btn-small-text"> + </span> <span className="add-task-btn-large-text"> + Add New Task </span> </button>
                            :
                                <button className="add-task-btn" onClick={changeAddTaskOpenStatus}> <span className="add-task-btn-small-text"> + </span> <span className="add-task-btn-large-text"> + Add New Task </span> </button>
                        }
                        <img onClick={changeEditDeleteBoardOpenStatus} className="three-dot-menu-header" src="src\assets\icon-vertical-ellipsis.svg" />
                    </div>
                </header>

                <main className="board-container" onClick={closeEditDeleteBoardModal}>

                    {
                        currentBoardData.columns === undefined || !currentBoardData.columns.length ?
                            <div className={menuOpen ? "empty-board-message-container empty-board-menu-open" : "empty-board-message-container"}>
                                <h2 className="empty-board-message"> This board is empty. Create a new column to get started. </h2>
                                <button className="empty-board-add-column-btn" onClick={changeEditBoardOpenStatus}>+  Add New Column</button>
                            </div>
                        :
                        <></>
                    }
                    {
                        editDeleteBoardOpen ?
                            <EditDeleteBoardModal 
                                setEditBoardOpen={setEditBoardOpen}
                                setDeleteBoardOpen={setDeleteBoardOpen}
                                setEditDeleteBoardOpen={setEditDeleteBoardOpen}
                            />
                        : 
                            <></>
                    }
    
                    <div className="current-modal-container">
                        {   
                            addBoardOpen ?
                                <AddBoardModal 
                                    setAddBoardOpen={setAddBoardOpen}
                                    setCurrentBoard={setCurrentBoard}
                                />
                            :
                                <></>
                        }
                        {
                            editBoardOpen ?
                                <EditBoardModal 
                                    currentBoardData={currentBoardData}
                                    setEditBoardOpen={setEditBoardOpen}
                                    setTaskData={setTaskData}
                                    setCurrentBoard={setCurrentBoard}
                                    setMenuOpen={setMenuOpen}
                                />
                            :
                                <></>
                        } 
                        {
                            deleteBoardOpen ?
                                <DeleteBoardModal 
                                    currentBoard={currentBoard}
                                    setDeleteBoardOpen={setDeleteBoardOpen}
                                    setTaskData={setTaskData}
                                    setCurrentBoard={setCurrentBoard}
                                    taskData={taskData}
                                />
                            :
                            <></>
                        }
                        {
                            addTaskOpen ?
                                <AddTaskModal 
                                    currentBoardData={currentBoardData}
                                    setTaskData={setTaskData}
                                    taskData={taskData}
                                    setAddTaskOpen={setAddTaskOpen}
                                    allTasks={allTasks}
                                /> 
                            :
                                <></>
                        }
                        {
                            viewTaskOpen ?
                                <ViewTaskModal
                                    currentTaskData={currentTaskData}
                                    currentBoard={currentBoard}
                                    setViewTaskOpen={setViewTaskOpen}
                                    currentBoardData={currentBoardData}
                                    currentColumnData={currentColumnData}
                                    viewTaskOpen={viewTaskOpen}
                                    setEditDeleteTaskOpen={setEditDeleteTaskOpen}
                                    editDeleteTaskOpen={editDeleteTaskOpen}
                                    setEditTaskOpen={setEditTaskOpen}
                                    setDeleteTaskOpen={setDeleteTaskOpen}
                                    setEditTaskSelectedTaskData={setEditTaskSelectedTaskData}
                                    setMenuOpen={setMenuOpen}
                                />
                            :
                                <></>
                        }
                        {
                            editTaskOpen ?
                                <EditTaskModal 
                                    editTaskSelectedTaskData={editTaskSelectedTaskData}
                                    currentBoardData={currentBoardData}
                                    setTaskData={setTaskData}
                                    taskData={taskData}
                                    setEditTaskOpen={setEditTaskOpen}
                                    allTasks={allTasks}
                                />
                            :
                                <></>
                        }
                        {
                            deleteTaskOpen ? 
                                <DeleteTaskModal 
                                editTaskSelectedTaskData={editTaskSelectedTaskData}
                                setTaskData={setTaskData}
                                currentBoardData={currentBoardData}
                                setDeleteTaskOpen={setDeleteTaskOpen}
                                />
                            :
                                <></>
                        } 
                    </div>
                    
                    <div className={`task-columns-container ${columnContainerClassNames}`}>
                        {
                            currentBoardData.columns === undefined ?
                                <></>
                            :
                                renderBoardColumns()
                        }
                        {
                            currentBoardData.columns.length ?
                                <button className={darkMode ? "add-new-column-btn add-new-column-btn-dark-mode" : "add-new-column-btn"} onClick={() => {setEditBoardOpen(true)}}> + New Column </button>
                            :
                                <></>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default App
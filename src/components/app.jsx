import React from "react";
import { useState, useContext } from "react";
import { TaskDataContext } from "./taskDataContext";
import MenuModal from "./menuModal";
import Task from "./task";
import TaskColumn from "./taskColumn";
import useScrollBlock from "./blockScroll"
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


    const [blockScroll, allowScroll] = useScrollBlock()
    const [menuOpen, setMenuOpen] = useState(false)
    const [addBoardOpen, setAddBoardOpen] = useState(false)
    const [editBoardOpen, setEditBoardOpen] = useState(false)
    const [editDeleteBoardPopUp, setEditDeleteBoardPopUp] = useState(false)
    const [deleteBoardOpen, setDeleteBoardOpen] = useState(false)
    const [addTaskOpen, setAddTaskOpen] = useState(false)
    const [viewTaskOpen, setViewTaskOpen] = useState(false)
    const [currentTaskData, setCurrentTaskData] = useState()
    const [currentColumnData, setCurrentColumnData] = useState()


    const {data, board} = useContext(TaskDataContext)
    const [taskData, setTaskData] = data
    const [currentBoard, setCurrentBoard] = board

    function changeMenuStatus() {
        setMenuOpen(prevState => !prevState)
    }


    ////////////////// THE LAYOUT BREAKS WHEN THESE ARE CALLED
    ///// This may change (call these functions when the button is clicked?)
    // if (menuOpen) {
    //     blockScroll()
    // }else if (menuOpen === false) {
    //     allowScroll()
    // }


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

    function changeEditDeleteBoardPopUpStatus() {
        setEditDeleteBoardPopUp(prevState => !prevState)
    }

    getCurrentBoardData()

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
            columns.push( <TaskColumn setCurrentColumnData={setCurrentColumnData} setCurrentTaskData={setCurrentTaskData} allTasks={allTasks}  setViewTaskOpen={setViewTaskOpen} currentBoardDataColumn={currentBoardData.columns[i]} key={i} />)
        }
        return columns
    }

    



    return (
        <div className="app-container">
            <header className="header-container"> 
                <div className="header-inner-container">
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
                <div className="header-inner-container">
                    <button className="add-task-btn" onClick={changeAddTaskOpenStatus}> + </button>
                    <img onClick={changeEditDeleteBoardPopUpStatus} className="three-dot-menu-header" src="src\assets\icon-vertical-ellipsis.svg" />
                </div>
            </header>

            

            <main className="board-container">

                {
                    currentBoardData.columns === undefined ?
                        <div className="empty-board-message-container">
                            <h2 className="empty-board-message"> This board is empty. Create a new column to get started. </h2>
                            <button className="empty-board-add-column-btn" onClick={changeEditBoardOpenStatus}>+  Add New Column</button>
                        </div>
                    :
                    <></>
                }

                {
                    editDeleteBoardPopUp ?
                        <EditDeleteBoardModal 
                            setEditBoardOpen={setEditBoardOpen}
                            setDeleteBoardOpen={setDeleteBoardOpen}
                            setEditDeleteBoardPopUp={setEditDeleteBoardPopUp}
                        />
                    : 
                        <></>
                }
   
                <div className="current-modal-container">
                    {
                        menuOpen ?
                            <MenuModal 
                                setMenuOpen={setMenuOpen}
                                setAddBoardOpen={setAddBoardOpen}
                            />
                        :
                            <></>
                    }
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
                            /> 
                        :
                            <></>


                    }
                    {
                        viewTaskOpen ?
                            <ViewTaskModal
                                currentTaskData={currentTaskData}
                                // setTaskData={setTaskData}
                                // taskData={taskData}
                                currentBoard={currentBoard}
                                // setCurrentTaskData={setCurrentTaskData}
                                setViewTaskOpen={setViewTaskOpen}
                                currentBoardData={currentBoardData}
                                currentColumnData={currentColumnData}
                            />
                        :
                            <></>
                    }


                    {/* <EditTaskModal /> */}
                    
                    
                    {/* <DeleteTaskModal /> */}
                </div>

                <div className="task-columns-container">
                    {
                        currentBoardData.columns === undefined ?
                            <></>
                        :
                            renderBoardColumns()
                    }
                </div>

                
            </main>

        </div>
    )
}


export default App
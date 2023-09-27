import React from "react";
import { useState } from "react";
import MenuModal from "./menuModal";
import Task from "./task";
import TaskColumn from "./taskColumn";
import useScrollBlock from "./blockScroll"
import ViewTaskModal from "./viewTaskModal";
import AddTaskModal from "./addTaskModal";
import EditTaskModal from "./editTaskModal";
import AddBoardModal from "./addBoardModal";
import EditBoardModal from "./editBoardModal";
const projectContainer = document.getElementById("root")


function App() {

    const [blockScroll, allowScroll] = useScrollBlock()
    const [menuOpen, setMenuOpen] = useState(false)


    ///// This will be temporary, eventually render the empty text based off of wehter or not any data exists
    const [noData, setNoData] = useState(false)



    function changeMenuStatus() {
        setMenuOpen(prevState => !prevState)
    }



    ///// This may change
    if (menuOpen) {
        blockScroll()
    }else if (menuOpen === false) {
        allowScroll()
    }


    return (
        <div className="app-container">
            <header className="header-container"> 
                <div className="header-inner-container">
                    <img className="mobile-svg-logo" src="src\assets\logo-mobile.svg" />
                    <div className="dropdown-menu" onClick={changeMenuStatus}>
                        <div className="dropdown-menu-inner-container-top">
                        <h1 className="dropdown-menu-text"> Platform Launch</h1>
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
                    <button className="add-task-btn"> + </button>
                    <img className="three-dot-menu-header" src="src\assets\icon-vertical-ellipsis.svg" />
                </div>
            </header>

            <main className="board-container">
                {
                    noData ?
                        <div className="empty-board-message-container">
                            <h2 className="empty-board-message"> This board is empty. Create a new column to get started. </h2>
                            <button className="empty-board-add-column-btn">+  Add New Column</button>
                        </div>
                    :
                    <></>
                }
                <div className="menu-modal-container">
                            {
                                menuOpen ?
                                <MenuModal />
                                :
                                <></>
                            }
                </div>
                <div className="current-modal-container">
                    {/* <ViewTaskModal/>  */}
                    {/* <AddTaskModal /> */}
                    {/* <EditTaskModal /> */}
                    {/* <AddBoardModal /> */}
                    <EditBoardModal />
                </div>

                <div className="task-columns-container">
                        <TaskColumn />
                        <TaskColumn />
                        <TaskColumn />
                </div>
            </main>

        </div>
    )
}


export default App
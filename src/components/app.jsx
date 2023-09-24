import React from "react";
import { useState } from "react";
import MenuModal from "./menuModal";

function App() {

    const [menuOpen, setMenuOpen] = useState(true)

    function changeMenuStatus() {
        setMenuOpen(prevState => !prevState)
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
                <div className="empty-board-message-container">
                        <h2 className="empty-board-message"> This board is empty. Create a new column to get started. </h2>
                        <button className="empty-board-add-column-btn">+  Add New Column</button>
                </div>
                <div className="menu-modal-container">
                            {
                                menuOpen ?
                                <MenuModal />
                                :
                                <></>
                            }
                </div>
            </main>

        </div>
    )
}


export default App
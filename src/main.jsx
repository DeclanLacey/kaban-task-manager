import React from 'react'
import ReactDOM from 'react-dom/client'
import "./style/index.css"
import App from './components/app'
import { TaskDataContextProvider } from './components/taskDataContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TaskDataContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TaskDataContextProvider>
    
  ,
)
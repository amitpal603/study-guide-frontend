import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StudyGuide from './context/studyGuide.jsx'
import {Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <StudyGuide>
    <App />
    <Toaster></Toaster>
    </StudyGuide>
    </BrowserRouter>
 
)

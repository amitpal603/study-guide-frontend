import React from 'react'
import Navbar from './components/header/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/main/Home'
import About from './components/main/About'
import Help from './components/main/Help'
import SignUp from './components/main/SignUp'
import Login from './components/main/Login'
import Mg from './components/main/Mg'
import Aktu from './components/main/Aktu'

function App() {
  return (
    <div>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/login-account' element={<Login/>}/>
          <Route path='/mgkvp-university' element={<Mg/>}/>
          <Route path='/aktu-university' element={<Aktu/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

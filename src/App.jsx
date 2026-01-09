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
import StudyFooter from './components/footer/StudyFooter'
import Policy from './components/main/Policy'
import TermAndCondition from './components/main/TermAndCondition'
import Support from './components/main/Support'
import Review from './components/main/Review'

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
          <Route path='/policy' element={<Policy/>}/>
          <Route path='/terms-conditions' element={<TermAndCondition/>}/>
          <Route path='/support' element={<Support/>}/>
          <Route path='/reviews' element={<Review/>}/>
        </Routes>
      </div>
      <StudyFooter/>
    </div>
  )
}

export default App

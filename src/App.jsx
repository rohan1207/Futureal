import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from './Pages/LandingPage'
import HomePage from './Pages/HomePage'
import Services from './components/Services'
import ContactUs from './Pages/ContactUs'
import ProjectGallery from './components/ProjectGallery'  
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/projects' element={<ProjectGallery/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

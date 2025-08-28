import React from 'react'
import Course from './components/Course'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseInfo from './components/Info';
import Navbar from './Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './components/Contact';




function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
         <Route path='/contactUs' element={<Contact />} />
      
        <Route path="/courses" element={<Course />} />
         <Route path="/info/:id" element={<CourseInfo />} />
        

      </Routes>
    </Router>
  )
}

export default App
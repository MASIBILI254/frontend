import React from 'react'
import Course from './components/Course'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseInfo from './components/Info';
import Navbar from './Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './components/Contact';
import RegisterStudent from './pages/RegisterStudent';
import AddCourseForm from './components/AddCourse';




function App() {
  return (
    <Router>
      <Routes>
          <Route path="/nav" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
         <Route path='/contactUs' element={<Contact />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/courses" element={<Course />} />
         <Route path="/info/:CourseId" element={<CourseInfo />} />
          <Route path="/addCourse" element={<AddCourseForm />} />
        

      </Routes>
    </Router>
  )
}

export default App
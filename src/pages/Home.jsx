import React from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../components/Hero'
import Footer from './Footer'
function Home() {
  return (
    <div className='container  px-1/2 py-4 bg-primary'>
        <Navbar />
        <Hero/>
        <Footer/>
    </div>
  )
}

export default Home
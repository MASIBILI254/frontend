import React from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../components/Hero'
import Footer from './Footer'
function Home() {
  return (
    <><div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

    </div><Footer /></>
  )
}

export default Home
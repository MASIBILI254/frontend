import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from './Footer'
import team from '../images/team.jpg'
function About() {
  return (
    <>
    <Navbar />
    <section className="container mx-auto px-1/2 py-4 bg-primary">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        About Our Institute
      </h2>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="text-white  leading-relaxed">
          <p>
            Oval Training Institute is dedicated to providing high-quality,
            practical education that prepares students for the challenges of the
            modern professional world. Our curriculum is designed by industry
            experts to ensure it is up-to-date and relevant.
          </p>
          <p>
            We believe in a hands-on approach to learning, fostering a creative
            and collaborative environment where students can thrive. Our mission
            is to empower the next generation of innovators and leaders.
          </p>
        </div>

        {/* Right Content (Team Placeholder) */}
        <div className=" flex items-center justify-center h-64 rounded-lg shadow">
          <h3 className="text-2xl font-semibold text-white"> Our Team
          <img src={team} alt="team image" className='w-100 h-100 mt-8' /></h3>
        </div>
      </div>

    </section>
    <Footer />
    </>
  );
}

export default About
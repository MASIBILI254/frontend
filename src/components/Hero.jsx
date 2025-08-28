import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
    const navigate = useNavigate();
     const handleClick = () =>{
        navigate('/courses');
     }
  return (
    <section className="bg-primary text-center text-white py-20 px-6 rounded-lg m-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Shape Your Future with Knowledge
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Empowering students with industry-relevant skills and a passion for
        lifelong learning.
      </p>
      <button onClick={handleClick} className='bg-white text-indigo-600 px-6 py-3 rounded-full shadow hover:bg-gray-100 transition'>Explore our courses</button>
    </section>
  )
}
 

export default Hero
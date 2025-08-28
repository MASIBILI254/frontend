import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../pages/Footer';

function Contact() {
 return (
     <><Navbar />
     <div className="min-h-screen flex items-center justify-center bg-primary p-6">

         <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden grid md:grid-cols-2">

             {/* Left Section - Contact Info */}
             <div className="bg-secondary text-white p-8 flex flex-col justify-center ">
                 <h2 className="text-2xl font-bold mt-0">Contact Us</h2>
                 <p className="mb-4 text-black">
                     <span className="font-semibold ">📞 Phone:</span> +254 741 426 603
                 </p>
                 <p className="mb-4 text-black">
                     <span className="font-semibold">✉️ Email:</span> info@oti.co.ke
                 </p>
                 <p className="mb-4 text-black">
                     <span className="font-semibold">📍 Location:</span>  Eldoret,Uganda Road <br /> Zion Mall, 2nd Floor
                 </p>
                 <p className="text-sm mt-6 opacity-80 text-black">
                     We’d love to hear from you! Reach out for inquiries or assistance.
                 </p>
             </div>

             {/* Right Section - Application Form */}
             <div className="p-8">
                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Membership Application</h2>
                 <form className="space-y-4">
                     <div>
                         <label className="block text-gray-700">Full Name</label>
                         <input type="text" className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                         <label className="block text-gray-700">Email</label>
                         <input type="email" className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                         <label className="block text-gray-700">Phone</label>
                         <input type="text" className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                         <label className="block text-gray-700">Why do you want to join?</label>
                         <textarea className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                     </div>
                     <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                         Submit Application
                     </button>
                 </form>
             </div>
         </div>
          
     </div>
    <Footer/>
     </>
  );
}

export default Contact
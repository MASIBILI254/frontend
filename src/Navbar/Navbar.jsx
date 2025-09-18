import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/oti.jpeg';
import { useNavigate } from "react-router-dom";
function Navbar() {
  const Navigate = useNavigate();
  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Courses", path: "/courses" },
    { name: "Contact", path: "/contactUs" },
  ];
  // handle Add Course button click
  const handleAddCourse = () => {
    Navigate("/addCourse")
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            <img src={logo} alt="" />
          </div>
          <span className="font-semibold text-lg text-gray-800">
            Oval Institute
          </span>
        </div>

        {/* Nav Links */}
        <nav className="space-x-8 hidden md:flex">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="text-gray-600 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-blue-600 text-white h-10 w-38 rounded-full" onClick={handleAddCourse}>Add Course</button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

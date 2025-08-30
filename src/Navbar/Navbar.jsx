import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/oti.jpeg';

function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Courses", path: "/courses" },
    { name: "Contact", path: "/contactUs" },
  ];

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
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

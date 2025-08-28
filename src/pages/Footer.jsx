import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12 mb-0">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Oval Training Institute. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

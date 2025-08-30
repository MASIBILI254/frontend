import { useState } from "react";
import api from "../API/api";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";

function RegisterStudent() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const courseId = location.state?.courseId || null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/student/add", formData);
      const studentId = response.data.studentId; // backend should return insertId as studentId
      setMessage("Student registered successfully!");

      // auto-enroll student
      if (courseId && studentId) {
        const enrollRes = await api.post("/student/enroll", {
          studentId,
          courseId,
        });
        console.log("Enroll response:", enrollRes.data);
        setMessage("enrolled successfully!");
      }

      // Step 3: Redirect after short delay
      setTimeout(() => {
        navigate("/courses"); 
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-primary ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register Student
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
      
    </div>
    <Footer />
    </>
  );
}

export default RegisterStudent;

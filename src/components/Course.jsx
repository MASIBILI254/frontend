import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import Navbar from "../Navbar/Navbar";
import Footer from "../pages/Footer";
function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/course/all");
        setCourses(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 animate-pulse">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-primary px-1/2 py-4">
      
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Available Courses</h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">No courses available</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center ml-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{course.CourseName}</h2>
              <p className="text-gray-600 text-bold mb-4">
               Duration: {course.TotalDuration} weeks
              </p>
              <p className="text-gray-600 text-bold mb-4">
                ksh.{course.Fee}
              </p>
              <button
                onClick={() => navigate(`/info/${course.CourseId}`)}
                className="text-blue-600 hover:underline font-medium"
              >
                Read more...
              </button>
            </div>
          ))}
        </div>
      )}

    </div><Footer /></>
  );
}

export default Course;

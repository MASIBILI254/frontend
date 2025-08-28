import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../API/api";
import Navbar from "../Navbar/Navbar";

function CourseInfo() {
  const { id } = useParams(); // course_id
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // Assuming your backend filters by course_id
        const res = await api.get(`/course/modules/${id}`);
        setModules(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 animate-pulse">Loading course details...</p>
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

  if (modules.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">No modules found for this course.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-1/2">
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>

      <div className="bg-secondary p-4 rounded-2xl shadow max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Course  Details</h1>

        <div className="space-y-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2"> module
                {module.module_number}. {module.module_title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Duration: {module.duration}
              </p>
              <p className="text-gray-700"> content:{module.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;

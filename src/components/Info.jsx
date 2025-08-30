import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../API/api";
import Navbar from "../Navbar/Navbar";

function CourseInfo() {
  const { CourseId } = useParams(); 
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await api.get(`/course/detailed/${CourseId}`);
        console.log("Course Detailed Response:", res.data);

        setCourse(res.data);               // store course details
        setModules(res.data.modules || []); // store modules
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [CourseId]);

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

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <Navbar />

      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>

      <div className="bg-secondary p-6 rounded-2xl shadow max-w-3xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-4">{course.CourseName}</h1>
        <p className="mb-2">Duration: {course.TotalDuration} weeks</p>
        <p className="mb-2">Fee: {course.Fee}</p>
        <p className="mb-4">Project: {course.Project ? "Yes" : "No"}</p>

        <h2 className="text-2xl font-semibold mb-4">Modules</h2>
        <div className="space-y-6">
          {modules.length > 0 ? (
            modules.map((module) => (
              <div
                key={module.ModuleId}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {module.ModuleName || "Untitled Module"}
                </h3>
                <p className="text-sm mb-2">Objectives: {module.Objectives}</p>
                <p className="text-sm mb-2">Duration: {module.Duration} weeks</p>

                {module.contents && module.contents.length > 0 && (
                  <div className="ml-4">
                    <h4 className="font-semibold">Contents:</h4>
                    <ul className="list-disc list-inside">
                      {module.contents.map((content, idx) => (
                        <li key={idx}>{content.content || content}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No modules found.</p>
          )}
        </div>

        <button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() =>
            navigate("/register", { state: { courseId: course.CourseId } })
          }
        >
          Enroll
        </button>
      </div>
    </div>
  );
}

export default CourseInfo;

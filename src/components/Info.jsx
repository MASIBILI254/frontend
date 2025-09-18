import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../API/api";
import Navbar from "../Navbar/Navbar";
import Footer from "../pages/Footer";

function CourseInfo() {
  const { CourseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await api.get(`/course/detailed/${CourseId}`);
        console.log("Course Detailed Response:", res.data);

        setCourse(res.data);
        setModules(res.data.modules || []);

        // Default to first module
        if (res.data.modules && res.data.modules.length > 0) {
          setActiveModuleId(res.data.modules[0].ModuleId);
        }
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

  const activeModule = modules.find((m) => m.ModuleId === activeModuleId);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-primary p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>

      {/* Course Title */}
      <h1 className="text-3xl font-bold mb-4 text-center text-green-300">
        {course.CourseName}
      </h1>

      {/* Course Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
        <div className="p-4 bg-stone-100 rounded-lg">
          <p className="text-4xl font-bold text-amber-600">
            {course.TotalDuration} weeks
          </p>
          <p className="text-stone-600 font-medium mt-1">Duration</p>
        </div>
        <div className="p-4 bg-stone-100 rounded-lg">
          <p className="text-4xl font-bold text-amber-600">
            {modules.length}
          </p>
          <p className="text-stone-600 font-medium mt-1">
            Comprehensive Modules
          </p>
        </div>
        <div className="p-4 bg-stone-100 rounded-lg">
          <p className="text-4xl font-bold text-amber-600">{course.Project}</p>
          <p className="text-stone-600 font-medium mt-1">Capstone Project</p>
        </div>
        <div className="p-4 bg-stone-100 rounded-lg ">
          <p className="text-4xl font-bold text-amber-600">KSH:{course.Fee}</p>
          <p className="text-stone-600 font-medium mt-1">Fee</p>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 mt-8 border border-gray-300 rounded-lg shadow-md p-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl mt-2">
            Curriculum Deep Dive
          </h2>
        </div>

        {/* Module Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {modules.length > 0 ? (
            modules.map((module) => (
              <button
                key={module.ModuleId}
                onClick={() => setActiveModuleId(module.ModuleId)}
                className={`px-4 py-2 rounded-md transition ${activeModuleId === module.ModuleId
                    ? "bg-teal-600 text-white shadow"
                    : "hover:text-teal-600"}`}
              >
                {`Module ${module.ModuleId}: ${module.ModuleName}`}
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-center mt-4">
              No modules found.
            </p>
          )}
        </div>

        {/* Active Module Content */}
        {activeModule && (
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-teal-700">
                {activeModule.ModuleName}
              </h2>
              <span className="text-gray-600 italic">
                Duration: {activeModule.Duration} week(s)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Objectives */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Learning Objectives
                </h3>
                <ul>
                  <li>
                    <p className="mt-2 text-gray-700">
                      {activeModule.Objectives || "No objectives provided."}
                    </p>
                  </li>
                </ul>

              </div>

              {/* Topics Covered */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Topics Covered
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  {activeModule.contents.length > 0 ? (
                    activeModule.contents.map((content) => (
                      <div
                        key={content.ContentId}
                        className="bg-teal-50 border border-teal-200 rounded-md p-4"
                      >
                        <h4 className="text-teal-700 font-semibold">
                          {content.Topic}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {content.Details}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No topics found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enroll Button */}
     <div className="flex justify-center mt-6">
  <button
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
    onClick={() => navigate("/register", { state: { courseId: course.CourseId } })}
  >
    Register
  </button>
</div>
      <Footer />
    </div></>
  );
}

export default CourseInfo;

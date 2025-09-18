import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import api from "../API/api";

export default function AddCourseForm() {
  const [course, setCourse] = useState({
    CourseName: "",
    fee: "",
    project: "",
    modules: [],
  });

  // Add new module
  const addModule = () => {
    setCourse({
      ...course,
      modules: [
        ...course.modules,
        { ModuleName: "", Duration: "", objectives: [], contents: [] },
      ],
    });
  };

  // Add new content to a module
  const addContent = (moduleIndex) => {
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].contents.push({ topic: "", Details: "" });
    setCourse({ ...course, modules: updatedModules });
  };

  // Handle field changes
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (e, i) => {
    const { name, value } = e.target;
    const updatedModules = [...course.modules];
    if (name === "objectives") {
      updatedModules[i][name] = value.split(","); // convert to array
    } else {
      updatedModules[i][name] = value;
    }
    setCourse({ ...course, modules: updatedModules });
  };

  const handleContentChange = (e, moduleIndex, contentIndex) => {
    const { name, value } = e.target;
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].contents[contentIndex][name] = value;
    setCourse({ ...course, modules: updatedModules });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/course/add", course);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error adding course");
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-primary px-1/2 py-4">
     <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
              {/* Course Info */}
              <input
                  type="text"
                  name="CourseName"
                  placeholder="Course Name"
                  value={course.CourseName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded" />
              <input
                  type="number"
                  name="fee"
                  placeholder="Fee"
                  value={course.fee}
                  onChange={handleChange}
                  className="w-full border p-2 rounded" />
              <input
                  type="text"
                  name="project"
                  placeholder="Project"
                  value={course.project}
                  onChange={handleChange}
                  className="w-full border p-2 rounded" />

              {/* Modules */}
              <div>
                  <h3 className="text-lg font-semibold mb-2">Modules</h3>
                  {course.modules.map((module, i) => (
                      <div key={i} className="border p-4 rounded mb-4">
                          <input
                              type="text"
                              name="ModuleName"
                              placeholder="Module Name"
                              value={module.ModuleName}
                              onChange={(e) => handleModuleChange(e, i)}
                              className="w-full border p-2 rounded mb-2" />
                          <input
                              type="text"
                              name="Duration"
                              placeholder="Duration"
                              value={module.Duration}
                              onChange={(e) => handleModuleChange(e, i)}
                              className="w-full border p-2 rounded mb-2" />
                          <input
                              type="text"
                              name="objectives"
                              placeholder="Objectives (comma-separated)"
                              value={module.objectives.join(",")}
                              onChange={(e) => handleModuleChange(e, i)}
                              className="w-full border p-2 rounded mb-2" />

                          {/* Contents */}
                          <h4 className="font-semibold">Contents</h4>
                          {module.contents.map((content, j) => (
                              <div key={j} className="ml-4 mb-2">
                                  <input
                                      type="text"
                                      name="topic"
                                      placeholder="Topic"
                                      value={content.topic}
                                      onChange={(e) => handleContentChange(e, i, j)}
                                      className="w-full border p-2 rounded mb-2" />
                                  <textarea
                                      name="Details"
                                      placeholder="Details"
                                      value={content.Details}
                                      onChange={(e) => handleContentChange(e, i, j)}
                                      className="w-full border p-2 rounded" />
                              </div>
                          ))}
                          <button
                              type="button"
                              onClick={() => addContent(i)}
                              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                          >
                              + Add Content
                          </button>
                      </div>
                  ))}
                  <button
                      type="button"
                      onClick={addModule}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                      + Add Module
                  </button>
              </div>

              <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg mt-4"
              >
                  Submit Course
              </button>
          </form>
      </div>
    </div>
   </>
  );
}

import { useState } from "react";
import { Form, useNavigate } from "react-router";
import { useAppContext } from "../../AppContext";

function Resume3() {
  const Data = useAppContext();
  const Navigate = useNavigate();
  const [Projects, addProjects] = useState([]);
  const addingProjects = () => {
    const obj = [1];
    addProjects((val) => {
      return [...val, obj];
    });
  };
  const removingProjects = () => {
    const newArr = Projects.filter((val, id) => {
      if (id != Projects.length - 1) {
        return val;
      }
    });
    addProjects(newArr);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    Data.addingData((val) => {
      return [...val, data];
    });
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h3 class="text-xl font-semibold mb-2">Projects</h3>
      {Projects.map((elem, idx) => {
        return (
          <div>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name={`project_title${idx + 1}`}
                placeholder="Project Title"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`tech_stack${idx + 1}`}
                placeholder="Technologies Used"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`github_link${idx + 1}`}
                placeholder="GitHub Link"
                class="border p-2 rounded"
              />
              <textarea
                name={`project_description${idx + 1}`}
                rows="3"
                class="border p-2 w-full rounded"
                placeholder="Project Description..."
              ></textarea>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        class="btn btn-danger"
        style={{ marginBottom: "20px" }}
        onClick={() => {
          removingProjects();
        }}
      >
        Remove Project
      </button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="button"
          class="btn btn-success"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            addingProjects();
          }}
        >
          Add Projects +
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            Navigate("/home/resume/4");
          }}
        >
          Save & Next
        </button>
      </div>
    </Form>
  );
}
export default Resume3;

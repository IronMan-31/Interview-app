import { useState } from "react";
import { Form, useNavigate } from "react-router";
import { useAppContext } from "../../AppContext";

function Resume2() {
  const Data = useAppContext();
  const Navigate = useNavigate();
  const [WorkExperience, addWorkExperience] = useState([]);
  const addingExperience = () => {
    const obj = [1];
    addWorkExperience((val) => {
      return [...val, obj];
    });
  };
  const removingExperience = () => {
    const newArr = WorkExperience.filter((val, id) => {
      if (id != WorkExperience.length - 1) {
        return val;
      }
    });
    addWorkExperience(newArr);
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
      <h3 class="text-xl font-semibold mb-2">Work Experience</h3>
      {WorkExperience.map((elem, idx) => {
        return (
          <>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name={`job_title${idx + 1}`}
                placeholder="Job Title"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`company_name${idx + 1}`}
                placeholder="Company Name"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`start_date${idx + 1}`}
                placeholder="Start Date"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`end_date${idx + 1}`}
                placeholder="End Date (or Present)"
                class="border p-2 rounded"
              />
              <textarea
                name={`job_description${idx + 1}`}
                rows="3"
                class="border p-2 w-full rounded"
                placeholder="Job Responsibilities..."
              ></textarea>
            </div>
          </>
        );
      })}
      <button
        type="button"
        class="btn btn-danger"
        style={{ marginBottom: "20px" }}
        onClick={() => {
          removingExperience();
        }}
      >
        Remove Work Experience
      </button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="button"
          class="btn btn-success"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            addingExperience();
          }}
        >
          Add Work Experience +
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            Navigate("/home/resume/3");
          }}
        >
          Save & Next
        </button>
      </div>
    </Form>
  );
}
export default Resume2;

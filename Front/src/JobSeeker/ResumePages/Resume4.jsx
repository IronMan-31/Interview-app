import { useState } from "react";
import { Form, useNavigate } from "react-router";
import { useAppContext } from "../../AppContext";
import ResumeRequestHandler from "../../ResumeRequestHandler";

function Resume4() {
  const Navigate = useNavigate();
  const Data = useAppContext();
  const [Education, addEducation] = useState([]);
  const [num, changenum] = useState(1);
  const addingEducation = () => {
    const obj = [1];
    addEducation((val) => {
      return [...val, obj];
    });
  };
  const removingEducation = () => {
    const newArr = Education.filter((val, id) => {
      if (id != Education.length - 1) {
        return val;
      }
    });
    addEducation(newArr);
  };
  const handleSubmit = async (e) => {
    if (Data.Data.length <= 4 && num == 2) {
      console.log(Data.Data);

      const resp = await ResumeRequestHandler(Data.Data, "/generateResume");
      Navigate("/home/resume/download");
    }
    if (num == 1) {
      changenum(2);
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      await Data.addingData((val) => {
        return [...val, data];
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h3 class="text-xl font-semibold mb-2">Education</h3>
      {Education.map((elem, idx) => {
        return (
          <div>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name={`degree${idx + 1}`}
                placeholder="Degree"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`institution${idx + 1}`}
                placeholder="Institution Name"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`edu_start_date${idx + 1}`}
                placeholder="Start Date"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`edu_end_date${idx + 1}`}
                placeholder="End Date (or Present)"
                class="border p-2 rounded"
              />
              <input
                type="text"
                name={`cgpa${idx + 1}`}
                placeholder="CGPA/Percentage"
                class="border p-2 rounded"
              />
            </div>
          </div>
        );
      })}
      <button
        type="button"
        class="btn btn-danger"
        style={{ marginBottom: "20px" }}
        onClick={() => {
          removingEducation();
        }}
      >
        Remove Education
      </button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="button"
          class="btn btn-success"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            addingEducation();
          }}
        >
          Add Education +
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          style={{ marginBottom: "20px", marginTop: "20px" }}
        >
          {num == 1 ? "Save & Next" : "Generate Resume"}
        </button>
      </div>
    </Form>
  );
}
export default Resume4;

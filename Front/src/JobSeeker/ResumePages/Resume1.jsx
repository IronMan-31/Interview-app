import { Form, useNavigate } from "react-router";
import { useAppContext } from "../../AppContext";

function Resume1() {
  const Data = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    Data.addingData((val) => {
      return [...val, data];
    });
  };
  const Navigate = useNavigate();
  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h3 class="text-xl font-semibold mb-2">Personal Information</h3>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          class="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          class="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          class="border p-2 rounded"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          class="border p-2 rounded"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Profile"
          class="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          class="border p-2 rounded"
        />
      </div>

      <h3 class="text-xl font-semibold mb-2">Professional Summary</h3>
      <textarea
        name="summary"
        rows="4"
        class="border p-2 w-full rounded mb-6"
        placeholder="Write a brief summary about yourself..."
      ></textarea>

      <h3 class="text-xl font-semibold mb-2">Skills</h3>
      <textarea
        name="skills"
        rows="3"
        class="border p-2 w-full rounded mb-6"
        placeholder="e.g. React.js, Node.js, MongoDB, etc."
      ></textarea>
      <h3 class="text-xl font-semibold mb-2">Languages</h3>
      <textarea
        name="languages"
        rows="2"
        class="border p-2 w-full rounded mb-6"
        placeholder="e.g. English (Fluent), Hindi (Native)"
      ></textarea>
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        style={{ marginBottom: "20px" }}
        onClick={() => {
          Navigate("2");
        }}
      >
        Save & Next
      </button>
    </Form>
  );
}
export default Resume1;

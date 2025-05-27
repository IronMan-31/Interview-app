import { Outlet } from "react-router";

function Resume1() {
  return (
    <div>
      <h1 style={{ margin: "30px", fontSize: "35px" }}>
        <b>Your Details</b>
      </h1>
      <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md shadow-lg ">
        <Outlet />
      </div>
    </div>
  );
}
export default Resume1;

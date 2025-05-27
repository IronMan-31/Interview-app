import Header from "../Header";
import { Outlet } from "react-router";
function App() {
  const arr1 = ["Applied Jobs", "Build Your Resume", "Meetings Scheduled"];
  const url = ["appliedJobs", "resume", "meetings"];
  return (
    <>
      <Header arr1={arr1} url={url} Recruiter={false} />
      <Outlet />
    </>
  );
}
export default App;

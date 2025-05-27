import Header from "../Header";
import { Outlet } from "react-router";

function Home() {
  const arr1 = ["Applicants", "Open a Job Opportunity", "Meetings Scheduled"];
  const url = ["", "open", "meetings"];
  return (
    <>
      <Header arr1={arr1} url={url} Recruiter={true} />
      <Outlet />
    </>
  );
}
export default Home;

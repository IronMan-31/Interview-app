import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Registration/Register.jsx";
import Login from "./Registration/Login.jsx";
import App from "./JobSeeker/App.jsx";
import AppliedJobs from "./JobSeeker/HeaderComponents/AppliedJobs.jsx";
import MainArea from "./JobSeeker/MainArea.jsx";
import Meetings from "./JobSeeker/Meetings.jsx";
import MeetingsRecruiter from "./Recruiter/Meetings.jsx";
import Resume from "./JobSeeker/Resume.jsx";
import Home from "./Recruiter/Home.jsx";
import Open from "./Recruiter/Open.jsx";
import Applicants from "./Recruiter/Applicants.jsx";
import Resume1 from "./JobSeeker/ResumePages/Resume1.jsx";
import Resume2 from "./JobSeeker/ResumePages/Resume2.jsx";
import Resume3 from "./JobSeeker/ResumePages/Resume3.jsx";
import Resume4 from "./JobSeeker/ResumePages/Resume4.jsx";
import { ContextProvider } from "./AppContext.jsx";
import Download from "./JobSeeker/ResumePages/download.jsx";
import ZegoCall from "./meetings/meetings.jsx";
const route = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      { path: "appliedJobs", element: <AppliedJobs /> },
      { path: "", element: <MainArea /> },
      { path: "meetings", element: <Meetings /> },
      {
        path: "resume",
        element: <Resume />,
        children: [
          { path: "2", element: <Resume2 /> },
          { path: "", element: <Resume1 /> },
          { path: "3", element: <Resume3 /> },
          { path: "4", element: <Resume4 /> },
          { path: "download", element: <Download /> },
        ],
      },
    ],
  },
  {
    path: "/recruiter/home",
    element: <Home />,
    children: [
      { path: "meetings", element: <MeetingsRecruiter /> },
      { path: "open", element: <Open /> },
      { path: "", element: <Applicants /> },
    ],
  },
  {
    path: "/meet",
    element: <ZegoCall />,
  },
]);
createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={route}></RouterProvider>
  </ContextProvider>
);

import { useEffect, useState } from "react";
import Card from "../Card";
import getRequestHandler from "../../getRequestHandler";

function AppliedJobs() {
  const [Applied, changeAppliedJobs] = useState([]);
  const getAppliedJobs = async () => {
    const resp = await getRequestHandler("GET", "/appliedJobs");
    const data = await resp.json();
    changeAppliedJobs(data);
  };
  useEffect(() => {
    getAppliedJobs();
  }, []);
  return Applied.length === 0 ? (
    <>
      <center style={{ marginTop: "50px" }}>
        <img
          src="/public/404.png"
          alt="404"
          style={{ backgroundColor: "none" }}
        />
        <h1 style={{ fontSize: "40px", marginTop: "20px" }}>
          No Applied Jobs Found
        </h1>
      </center>
    </>
  ) : (
    <div>
      <h1 style={{ margin: "30px", fontSize: "35px" }}>
        <b>Applied Jobs</b>
      </h1>
      {Applied.map((elem) => {
        return (
          <Card
            elem={elem}
            visible={false}
            getAppliedJobs={getAppliedJobs}
            changeAppliedJobs={changeAppliedJobs}
          />
        );
      })}
    </div>
  );
}
export default AppliedJobs;

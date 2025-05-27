import { useEffect, useState } from "react";
import ApplicantsCard from "./ApplicantsCard";
import getRequestHandler from "../getRequestHandler";

function Applicants() {
  const [Applicants, addApplicants] = useState([]);
  const getApplicants = async () => {
    const resp = await getRequestHandler("GET", "/applicants");
    const data = await resp.json();
    addApplicants(data);
  };
  useEffect(() => {
    getApplicants();
  }, []);
  return Applicants.length != 0 ? (
    <div className="elem" style={{ fontSize: "30px" }}>
      <h1>
        <b>Applicants Ranked By AI</b>
      </h1>
      {Applicants.map((elem, idx) => {
        return (
          <div id={idx}>
            <ApplicantsCard
              elem={elem}
              addApplicants={addApplicants}
              getApplicants={getApplicants}
              idx={idx}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <>
      <center style={{ marginTop: "50px" }}>
        <img
          src="/public/404.png"
          alt="404"
          style={{ backgroundColor: "none" }}
        />
        <h1 style={{ fontSize: "40px", marginTop: "20px" }}>
          No Applicants Found
        </h1>
      </center>
    </>
  );
}
export default Applicants;

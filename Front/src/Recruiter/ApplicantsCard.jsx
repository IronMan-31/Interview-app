import { useState } from "react";
import RequestHandler from "../RequestHandler";
import Modal2 from "./Modal2";

function ApplicantsCard({ elem, addApplicants, getApplicants, idx }) {
  const handleClick = () => {
    const base64Data = elem.Resume.split(",")[1];
    const blob = new Blob(
      [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
      { type: "application/pdf" }
    );
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  const [toggle, changeToggle] = useState(0);
  return (
    <div
      className="shadow-lg p-3 mb-5 bg-body-tertiary rounded"
      style={{
        margin: "10px",
        marginRight: "2%",
        marginLeft: "2%",
        marginTop: "25px",
      }}
    >
      <h1 style={{ fontWeight: "500" }} className="elem">
        <i>Name - {elem.Name}</i>
      </h1>
      <h1 style={{ fontWeight: "500" }} className="elem">
        <i>Email - {elem.Email}</i>
      </h1>
      <h1 style={{ fontWeight: "500" }} className="elem">
        <i>For - {elem.For}</i>
      </h1>
      <h1 style={{ fontWeight: "500" }} className="elem">
        <i>
          <button
            type="button"
            className="underline"
            onClick={() => {
              changeToggle((prev) => {
                return prev + 1;
              });
            }}
          >
            AI Overview
          </button>
          {toggle % 2 !== 0 && (
            <pre
              style={{
                fontFamily: "cursive",
                color: "gray",
                fontSize: "25px",
                marginTop: "10px",
              }}
            >
              {elem.AI}
            </pre>
          )}
        </i>
      </h1>
      <h1 style={{ fontWeight: "500" }} className="elem">
        <i>
          <button
            target="_blank"
            onClick={() => {
              handleClick(elem.Resume);
            }}
            className="underline"
          >
            Resume
          </button>
        </i>
      </h1>
      <div className="flex flex-col w-[200px]">
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target={`#modal-${idx}`}
          style={{ marginTop: "15px" }}
          onClick={() => {
            console.log(elem.For);
          }}
        >
          Schedule a Meeting
        </button>
        <button
          type="button"
          data-bs-target="#exampleModal"
          style={{ marginTop: "15px" }}
          className="btn btn-danger"
          onClick={async () => {
            console.log(elem.Email, elem.For);
            const resp = await RequestHandler("DELETE", "/applicants", {
              Email: elem.Email,
            });
            const data = await resp.json();
            const resp1 = await RequestHandler("PUT", "/appliedJobs", {
              Email: elem.Email,
              For: elem.For,
              Status: "Red",
            });
            let resp2 = await RequestHandler("DELETE", "/addMeetings", {
              Email: elem.Email,
              For: elem.For,
            });
            resp2 = await resp2.json();
            console.log(resp2);
            const res = await resp1.json();
            console.log(res);
            console.log(elem.Email);
            console.log(data);
            addApplicants([]);
            getApplicants();
          }}
        >
          Reject Application
        </button>
      </div>
      <Modal2 elem={elem} idx={idx} />
    </div>
  );
}
export default ApplicantsCard;

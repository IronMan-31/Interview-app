import { useRef, useState } from "react";
import RequestHandler from "../RequestHandler";
import getRequestHandler from "../getRequestHandler";
import ResumeRequestHandler from "../ResumeRequestHandler1";

function Modal({ elem }) {
  const [Name, changeName] = useState("");
  const [Email, changeEmail] = useState("");
  const [For, changeFor] = useState("");
  const [Resume, changeResume] = useState("");
  const NameElem = useRef();
  const EmailElem = useRef();
  const ForElem = useRef();
  const ResumeElem = useRef();
  const [isEmp, changeEmp] = useState(false);

  const ResumeUploader = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        changeResume(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Apply for the Job
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your Name"
                ref={NameElem}
                onChange={(e) => {
                  changeName(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your Email"
                ref={EmailElem}
                onChange={(e) => {
                  changeEmail(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Post
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Specify which post you are applying for"
                ref={ForElem}
                onChange={(e) => {
                  changeFor(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Resume
              </label>
              <input
                type="file"
                class="form-control"
                accept="application/pdf"
                id="exampleFormControlInput1"
                placeholder="Specify which post you are applying for"
                ref={ResumeElem}
                onChange={(e) => {
                  ResumeUploader(e);
                }}
              />
            </div>
          </div>
          {isEmp && (
            <center style={{ color: "red" }}>
              <div class="mb-3">
                <h1>First Fill Out all The Details</h1>
              </div>
            </center>
          )}
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={async () => {
                if (
                  NameElem.current.value != "" &&
                  EmailElem.current.value != "" &&
                  ForElem.current.value != "" &&
                  ResumeElem.current.value != ""
                ) {
                  alert("Application Successful");
                  const modalElement = document.getElementById("exampleModal");
                  const modalInstance =
                    bootstrap.Modal.getInstance(modalElement);
                  modalInstance.hide();
                  let data = await getRequestHandler(
                    "GET",
                    `/jobOpeningHeading/${For}`
                  );
                  data = await data.json();
                  const resp2 = await ResumeRequestHandler(
                    { Requirements: data[0].Requirements, Resume: Resume },
                    "/getScore"
                  );
                  const d = await resp2.text();
                  const resp = await RequestHandler("POST", "/applicants", {
                    Name: Name,
                    Email: Email,
                    For: For,
                    Resume: Resume,
                    AI: d,
                  });
                  const resp1 = await RequestHandler("POST", "/appliedJobs", {
                    Heading: For,
                    Description: data[0].Description,
                    Requirements: data[0].Requirements,
                    Image: data[0].Image,
                    Status: "Blue",
                    Email: Email,
                  });
                  const data1 = await resp1.json();
                  console.log(data1);
                  changeEmp(false);
                  NameElem.current.value = "";
                  EmailElem.current.value = "";
                  ForElem.current.value = "";
                  ResumeElem.current.value = "";
                } else {
                  changeEmp(true);
                }
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;

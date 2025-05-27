import { useRef, useState } from "react";
import RequestHandler from "../RequestHandler";

function Modal({ getData, addOpenings }) {
  const [Heading, changeHeading] = useState("");
  const [Description, changeDescription] = useState("");
  const [Requirements, changeRequirements] = useState("");
  const HeadingElem = useRef();
  const DescriptionElem = useRef();
  const RequirementsElem = useRef();
  const [ImageElem, setImageElem] = useState();
  const [isEmp, changeEmp] = useState(false);
  const isEmpty = () => {
    if (
      Heading.trim() !== "" &&
      Description.trim() !== "" &&
      Requirements.trim() !== ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  const ImageUploader = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageElem(reader.result);
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
              Add an Opening
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
                Heading
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Add a Heading"
                ref={HeadingElem}
                onChange={(e) => {
                  changeHeading(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Add a Description
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Add a Description"
                ref={DescriptionElem}
                onChange={(e) => {
                  changeDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Add Requirements
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Java, Python, DSA like this"
                ref={RequirementsElem}
                onChange={(e) => {
                  changeRequirements(e.target.value);
                }}
              ></textarea>
            </div>
            <div class="mb-3">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                  ImageUploader(e);
                }}
              />
            </div>
            {isEmp && (
              <center style={{ color: "red" }}>
                <div class="mb-3">
                  <h1>First Fill Out all The Details</h1>
                </div>
              </center>
            )}
          </div>
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
                if (isEmpty()) {
                  changeEmp(true);
                } else {
                  await RequestHandler("POST", "/jobOpening", {
                    Heading: HeadingElem.current.value,
                    Description: DescriptionElem.current.value,
                    Requirements: RequirementsElem.current.value,
                    Image: ImageElem,
                  });

                  HeadingElem.current.value = "";
                  DescriptionElem.current.value = "";
                  RequirementsElem.current.value = "";
                  const modalElement = document.getElementById("exampleModal");
                  const modalInstance =
                    bootstrap.Modal.getInstance(modalElement);
                  modalInstance.hide();
                  addOpenings([]);
                  await getData();
                  changeEmp(false);
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

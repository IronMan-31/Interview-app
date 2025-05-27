import { useRef, useState } from "react";
import RequestHandler from "../RequestHandler";
import { useAppContext } from "../AppContext";

function Modal2({ elem, idx }) {
  const Data = useAppContext();
  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  const [date, changeDate] = useState("");
  const [timings, changeTimings] = useState("");
  const [isEmp, changeEmp] = useState(false);
  const timingsElem = useRef();
  const dateElem = useRef();
  const isEmpty = () => {
    if (date !== "" && timings !== "") {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div
      className="modal fade"
      id={`modal-${idx}`}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Schedule a Meeting
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
                Date
              </label>
              <input
                type="date"
                class="form-control"
                ref={dateElem}
                onChange={(e) => {
                  changeDate(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Timings
              </label>
              <input
                type="email"
                class="form-control"
                ref={timingsElem}
                id="exampleFormControlInput1"
                placeholder="Add a Timing (in 1640 format)"
                onChange={(e) => {
                  changeTimings(e.target.value);
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
                if (isEmpty()) {
                  changeEmp(true);
                } else {
                  const modalElement = document.getElementById(`modal-${idx}`);
                  await RequestHandler("POST", "/addMeetings", {
                    Email: elem.Email,
                    Date: dateElem.current.value,
                    Timings: timingsElem.current.value,
                    roomID: randomID(10),
                    For: elem.For,
                  });
                  timingsElem.current.value = "";
                  dateElem.current.value = "";
                  const modalInstance =
                    bootstrap.Modal.getInstance(modalElement);
                  modalInstance.hide();
                  alert(
                    "Your meeting Link will be added to meeting section shortly"
                  );
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
export default Modal2;

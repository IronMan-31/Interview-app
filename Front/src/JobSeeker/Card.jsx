import RequestHandler from "../RequestHandler";
import Modal from "./Modal3";

function Card({ elem, visible, getAppliedJobs, changeAppliedJobs }) {
  return (
    <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded" id="card">
      <img style={{ height: "200px", width: "200px" }} src={elem.Image} />
      <div id="flexing">
        <center>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            <i>{elem.Heading}</i>
          </h1>
        </center>
        <p>{elem.Description}</p>
        <h1 style={{ marginTop: "15px" }}>
          <b>Requirements - </b>
        </h1>
        {elem.Requirements.split(",").length != 0 && (
          <ul class="list-group" style={{ marginTop: "25px" }}>
            {elem.Requirements.split(",").map((element, idx) => {
              return (
                <li class="list-group-item">{` ${idx + 1}) ${element}`}</li>
              );
            })}
          </ul>
        )}
        {!visible && (
          <div>
            <h1
              style={{
                marginTop: "15px",
                fontSize: "20px",
                fontFamily: "cursive",
              }}
            >
              <b style={{ color: elem.Status }}>
                Status -{" "}
                {`${
                  elem.Status == "Blue"
                    ? "In Processing"
                    : "Application Rejected"
                }`}
              </b>
            </h1>
            {elem.Status.toLowerCase() == "red" && (
              <button
                className="btn btn-danger mt-3"
                onClick={async () => {
                  const response = await RequestHandler(
                    "DELETE",
                    "/appliedJobs",
                    { Desc: elem.Description }
                  );
                  const resp = await response.json();
                  console.log(resp);
                  changeAppliedJobs([]);
                  getAppliedJobs();
                }}
              >
                Remove
              </button>
            )}
          </div>
        )}
        <button
          type="button"
          class="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{
            marginTop: "15px",
            visibility: `${visible ? "visible" : "hidden"}`,
          }}
        >
          Apply
        </button>
        <Modal elem={elem} />
      </div>
    </div>
  );
}
export default Card;

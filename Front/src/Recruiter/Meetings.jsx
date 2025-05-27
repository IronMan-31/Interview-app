import { useEffect, useState } from "react";
import getRequestHandler from "../getRequestHandler";
import { useAppContext } from "../AppContext";

function MeetingsRecruiter() {
  const [Meetings, getMeetings] = useState([]);
  const Data = useAppContext();
  const getMeets = async () => {
    const data = await getRequestHandler("GET", "/addMeetings");
    const mainData = await data.json();

    getMeetings(mainData);
  };
  useEffect(() => {
    getMeets();
  }, []);
  return Meetings.length === 0 ? (
    <>
      <center style={{ marginTop: "50px" }}>
        <img
          src="/public/404.png"
          alt="404"
          style={{ backgroundColor: "none" }}
        />
        <h1 style={{ fontSize: "40px", marginTop: "20px" }}>
          No Meetings Scheduled
        </h1>
      </center>
    </>
  ) : (
    <div>
      <h1 style={{ margin: "30px", fontSize: "35px" }}>
        <b>Meetings Scheduled</b>
      </h1>
      {Meetings.map((elem) => {
        return (
          <div
            className="shadow-lg p-3 mb-5 bg-body-tertiary rounded"
            id="card"
          >
            <div id="flexing">
              <center>
                <h1
                  style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    marginBottom: "15px",
                  }}
                >
                  <i>Email - {elem.Email}</i>
                </h1>
              </center>
              <p>Time - {elem.Timings}</p>
              <p>For - {elem.For}</p>
              <p>
                Link -{" "}
                <a
                  href={`/meet?roomID=${elem.roomID}`}
                  className="underline"
                  target="_blank"
                >
                  Meeting Link
                </a>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MeetingsRecruiter;

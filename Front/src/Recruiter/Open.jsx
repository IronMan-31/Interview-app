import { useEffect, useState } from "react";
import OpeningCard from "./OpeningCard";
import Modal from "./Modal";
import getRequestHandler from "../getRequestHandler";

function Open() {
  const [Openings, addOpenings] = useState([]);
  const getData = async () => {
    let Data = await getRequestHandler("GET", "/jobOpening");
    Data = await Data.json();
    addOpenings((val) => {
      return [...Data, ...val];
    });
    console.log(Openings);
  };
  const RemoveData = async (idx, Heading) => {
    const resp = await getRequestHandler("DELETE", `/jobOpening/${Heading}`);
    console.log(resp);
    const newArr = Openings.filter((elem, id) => {
      if (id != idx) {
        return elem;
      }
    });
    addOpenings(newArr);
  };
  useEffect(() => {
    getData();
  }, []);
  return Openings.length != 0 ? (
    <div className="elem" style={{ fontSize: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>
          <b>Ongoing Openings</b>
        </h1>

        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ marginRight: "35px" }}
        >
          New +
        </button>
        <Modal getData={getData} addOpenings={addOpenings} />
      </div>
      {Openings.map((elem, id) => {
        return (
          <div
            style={{
              marginTop: "30px",
              marginRight: "2%",
            }}
          >
            <OpeningCard elem={elem} id={id} RemoveData={RemoveData} />
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
          No Job Openings Till Now
        </h1>
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ marginTop: "25px" }}
        >
          Add An Opening +
        </button>
        <Modal getData={getData} addOpenings={addOpenings} />
      </center>
    </>
  );
}
export default Open;

import { useEffect, useState } from "react";
import getRequestHandler from "../getRequestHandler";
import Card from "./Card";
import "./MainArea.css";
function MainArea() {
  const [arr1, changearr1] = useState([]);
  const getJobs = async () => {
    const data = await getRequestHandler("GET", "/jobOpening");
    const mainData = await data.json();
    changearr1(mainData);
  };
  useEffect(() => {
    const fetchData = async () => {
      await getJobs();
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 style={{ margin: "30px", fontSize: "35px" }}>
        <b>Available Jobs</b>
      </h1>
      {arr1.map((elem, idx) => {
        return (
          <Card
            key={idx}
            elem={elem}
            visible={true}
            getAppliedJobs={""}
            changeAppliedJobs={""}
          />
        );
      })}
    </div>
  );
}
export default MainArea;

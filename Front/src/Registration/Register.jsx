import { Form, Link, useNavigate } from "react-router";
import "./LoginPages.css";
import { useEffect, useState } from "react";
import validator from "validator";
import { useAppContext } from "../AppContext";
import RequestHandler from "../RequestHandler";
function Register() {
  const [isEmpty, changeEmpty] = useState(true);
  const [Name, changeName] = useState("");
  const [Email, changeEmail] = useState("");
  const [Password, changePassword] = useState("");
  const [ConfPassword, changeConfPassword] = useState("");
  const [formData, changeFormData] = useState();
  const Data = useAppContext();
  const Navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add("body1");

    return () => {
      document.body.classList.remove("body1");
    };
  }, []);
  const [visibleList, changeVisibleList] = useState([]);
  const string1 = "WELCOME TO OUR COMMUNITY!!";
  const list1 = string1.split("");
  useEffect(() => {
    list1.forEach((elem, index) => {
      setTimeout(() => {
        changeVisibleList((prev) => [...prev, elem]);
      }, index * 500);
    });
  }, []);
  useEffect(() => {
    if (
      Name !== "" &&
      validator.isEmail(Email) &&
      Password !== "" &&
      ConfPassword === Password
    ) {
      changeEmpty(false);
    } else {
      changeEmpty(true);
    }
  }, [Name, Email, Password, ConfPassword]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    changeFormData(JSON.stringify(data));
    if (Object.keys(data).length == 4) {
      Data.isRecruiter(false);
    } else {
      Data.isRecruiter(true);
    }
    RequestHandler("POST", "/register", data);
    console.log(formData);
    Navigate("/login");
  };
  return (
    <div id="flex">
      <div>
        <h1 id="welcome" style={{ transform: "scale(2)" }}>
          {visibleList.map((elem) => {
            return elem;
          })}
        </h1>
      </div>
      <Form id="Register" method="post" onSubmit={handleSubmit}>
        <center>
          <h1 className="elem" style={{ height: "40px" }}>
            Register
          </h1>
        </center>
        <hr />
        <h4 className="elem">Name</h4>
        <input
          type="text"
          className="elem"
          name="name"
          placeholder="Enter your name"
          onChange={(e) => {
            changeName(e.target.value);
          }}
        />
        <h4 className="elem">Email</h4>
        <input
          type="text"
          className="elem"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => {
            changeEmail(e.target.value);
          }}
        />
        <h4 className="elem">Password</h4>
        <input
          type="password"
          className="elem"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => {
            changePassword(e.target.value);
          }}
        />
        <h4 className="elem">Confirm Password</h4>
        <input
          type="password"
          className="elem"
          name="confirm_password"
          placeholder="Confirm password"
          onChange={(e) => {
            changeConfPassword(e.target.value);
          }}
        />
        <label
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <input
            type="checkbox"
            placeholder="Confirm password"
            name="recruiter"
            style={{ height: "24px", width: "24px", marginRight: "5px" }}
          />
          <h4 style={{ marginLeft: "5px" }}>I'm a Recruiter</h4>
        </label>
        <br />
        <center>
          <h5 className="elem">
            Already Have An Account ? <Link to="/login">Login</Link>
          </h5>
          {!isEmpty ? (
            <button id="submit">Create Account</button>
          ) : (
            <h1 style={{ color: "red", marginTop: "20px", fontSize: "20px" }}>
              PLEASE, ENTER VALID DETAILS
            </h1>
          )}
        </center>
      </Form>
    </div>
  );
}

export default Register;

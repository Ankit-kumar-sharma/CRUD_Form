import React, { useState } from "react";
import "./App.css";
import ValidateEmail from "./email.js";
export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState(false);
  const [id, setId] = useState(1);
  var [i, setI] = useState(0);
  var [n, setN] = useState(0);
  let [informa, setInforma] = useState([]);
  var localStorageContent = localStorage.getItem("informa");
  if (localStorageContent === null) {
    informa = [];
  } else {
    informa = JSON.parse(localStorageContent);
  }

  function handleSubmit(e) {
    var localStorageContent = localStorage.getItem("informa");
    e.preventDefault();
    if (localStorageContent === null) {
      informa = [];
    } else {
      informa = JSON.parse(localStorageContent);
    }
    setId(id + 1);
    if (i == 0) {
      informa.push({
        Id: id,
        Name: name,
        Email: email,
        Number: number,
        DOB: dob,
        Gender: gender,
        City: city,
      });
    } else {
      informa[n] = {
        Id: id,
        Name: name,
        Email: email,
        Number: number,
        DOB: dob,
        Gender: gender,
        City: city,
      };
    }
    localStorage.setItem("informa", JSON.stringify(informa));
    setStatus(true);
    setName("");
    setEmail("");
    setNumber("");
    setDob("");
    setGender("");
    setCity("");
  }
  function removeItem(index) {
    informa.splice(index, 1);

    setInforma(informa);
    localStorage.setItem("informa", JSON.stringify(informa));
  }
  function editItem(name, email, gender, index, id) {
    setName(name);
    setEmail(email);
    setGender(gender);
    setN(index);
    setI(i + 1);
    console.log(name);
    console.log(informa);
  }

  return (
    <div className="App">
      <form name="form1" onSubmit={handleSubmit}>
        <fieldset class="field">
          <legend class="leg">Personal Info</legend>
          <label class="format">Name</label>
          <br />
          <input
            type="text"
            name="user"
            placeholder="Fullname"
            onChange={(text) => setName(text.target.value)}
            value={name}
            required
          ></input>
          <br />
          <label class="format">Email ID</label>
          <br />
          <input
            type="text"
            name="text1"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            id="inbdemo"
            value={email}
            required
          ></input>
          <p id="message"></p>
          <br />
          <label class="format">Birth Date</label>
          <br />
          <input
            type="date"
            name="date"
            placeholder="12/03/2002"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
          ></input>
          <br />
          <label class="format">Gender</label>
          <br />
          <select
            class="select"
            onChange={(text) => setGender(text.target.value)}
            value={gender}
            required
          >
            <option>--Select--</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <br />
          <label class="format" style={{ marginTop: "70px" }}>
            Phone Number
          </label>
          <br />
          <input
            type="text"
            name="number"
            style={{ fontFamily: "Arial" }}
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          ></input>
          <br />
          <label class="format">City</label>
          <br />
          <select
            class="select"
            onChange={(text) => setCity(text.target.value)}
            value={city}
          >
            <option>--Select--</option>
            <option>Aligarh</option>
            <option>Agra</option>
            <option>Greater Noida</option>
            <option>Gurugoan</option>
            <option>Mumbai</option>
          </select>
          <br />
          <label class="format">Tell us about youself</label>
          <br />
          <textarea
            rows="10"
            class="ta"
            placeholder="---------------Optional---------------"
          ></textarea>
          <br />
          <button
            type="submit"
            class="sBtn"
            onMouseOver={<ValidateEmail value="{email}" />}
          >
            Submit
          </button>
        </fieldset>
      </form>
      {status ? (
        <div class="table-container">
          <div></div>
          <p
            style={{
              color: "gray",
              textAlign: "center",
              fontFamily: "TimesNewRoman",
              fontSize: "25px",
              marginBottom: "20px",
            }}
          >
            Student Information
          </p>
          {informa.map((user, index) => (
            <div>
              <table>
                <tr>
                  <td>{user.Name}</td>
                  <td>{user.Email}</td>
                  <td style={{ width: "80px" }}>{user.Gender}</td>
                  <td style={{ width: "100px", height: "35px" }}>
                    <a
                      onClick={() =>
                        editItem(
                          user.Name,
                          user.Email,
                          user.Gender,
                          index,
                          user.id
                        )
                      }
                      style={{
                        width: "100px",
                        cursor: "pointer",
                        height: "35px",
                        textDecoration: "none",
                        lineHeight: "35px",
                        color: "white",
                        backgroundColor: "forestgreen",
                        border: "1px solid white",
                        borderRadius: "10px",
                        textAlign: "center",
                        display: "inline-block",
                        marginLeft: "20px",
                      }}
                    >
                      Edit
                    </a>
                  </td>
                  <td style={{ width: "100px", height: "35px" }}>
                    <a
                      onClick={() => removeItem(index)}
                      style={{
                        width: "100px",
                        cursor: "pointer",
                        height: "35px",
                        textDecoration: "none",
                        lineHeight: "35px",
                        color: "white",
                        backgroundColor: "forestgreen",
                        border: "1px solid white",
                        borderRadius: "10px",
                        textAlign: "center",
                        display: "inline-block",
                        marginLeft: "20px",
                      }}
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

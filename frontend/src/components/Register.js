import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [nickColor, setNickColor] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const register = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
        firstname: firstname,
        surname: surname,
        birthday: birthday,
        country: country,
        gender: gender,
        nickColor: nickColor,
        email: email,
        phone: phone,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/register`,
    }).then((res) => {
      console.log(res);
      navigate("/login");
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2> Register </h2>
        <form onSubmit={register}>
          <div className="row mt-2">
            <div className="col">
              <label> Username </label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col">
              <label> E-mail </label>
              <input
                type="text"
                className="form-control"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col ">
              <label> Password </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col ">
              <label> Firstname </label>
              <input
                type="text"
                className="form-control"
                placeholder="Firstname"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="col ">
              <label> Surname </label>
              <input
                type="text"
                className="form-control"
                placeholder="Surname"
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col ">
              <label> Birthday </label>
              <input
                type="date"
                className="form-control"
                placeholder="Birthday"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="col ">
              <label> Phone </label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col ">
              <label> Country </label>
              <select
                className="form-control"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              >
                <option></option>
                <option>Poland</option>
                <option>Germany</option>
                <option>French</option>
                <option>USA</option>
                <option>Spain</option>
              </select>
            </div>
            <div className="col ">
              <label> Gender </label>
              <select
                className="form-control"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>N/A</option>
              </select>
            </div>
            <div className="col ">
              <label> Nick color </label>

              <select
                className="form-control"
                id="nickColor"
                onChange={(e) => setNickColor(e.target.value)}
              >
                <option className="bg-danger">Red</option>
                <option className="bg-light">White</option>
                <option className="bg-dark">Black</option>
                <option className="bg-success">Green</option>
                <option className="bg-primary">Blue</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary w-100"
            />
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;

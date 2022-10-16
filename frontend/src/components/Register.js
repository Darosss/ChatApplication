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
      url: "/register",
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
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Firstname: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Surname: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Birthday: </label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Country: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nick color: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNickColor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>E-mail: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;

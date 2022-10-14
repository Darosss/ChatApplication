import React, { Component } from "react";
import axios from "axios";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      password: "",
    };
  }
  onChangeUsername(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.name,
      password: this.state.password,
    };
    axios
      .post("http://localhost:5000/login", userData)
      .then((res) => console.log("??", res.data))
      .catch((err) => {
        console.log(err);
      });
    console.log("???", userData);
    // this.setState({
    //   name: "",
    //   port: "",
    // });
  }

  render() {
    return (
      <div>
        <h2> Register </h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>Firstname: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstname}
              onChange={this.onChangeFirstname}
            />
          </div>
          <div className="form-group">
            <label>Surname: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.surname}
              onChange={this.onChangeSurname}
            />
          </div>
          <div className="form-group">
            <label>Birthday: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.birthday}
              onChange={this.onChangeBirthday}
            />
          </div>
          <div className="form-group">
            <label>Country: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.country}
              onChange={this.onChangeCountry}
            />
          </div>
          <div className="form-group">
            <label>Gender: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.gender}
              onChange={this.onChangeGender}
            />
          </div>
          <div className="form-group">
            <label>Nick color: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.nickColor}
              onChange={this.onChangeNickColor}
            />
          </div>
          <div className="form-group">
            <label>E-mail: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

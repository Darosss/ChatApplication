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
        <h2> Login to chat room </h2>
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
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    axios
      .get("/index")
      .then((response) => {
        console.log(response);
        this.setState({ messages: response.data.messages });
      })
      .catch(function (error) {
        console.log(error, "??");
      });
  }
  tabRow() {
    return this.state.messages.map(function (object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div className="container">
        <h2> Chat rooms </h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <td>User</td>
              <td>Message</td>
              <td>Chat room</td>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}

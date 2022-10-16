import React, { Component } from "react";

// import axios from "axios";
import TableRow from "./TableRow";
// import SocketIO from "./SocketIO";

export default class ChatsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  // componentDidMount() {
  //   axios
  //     .get("/index")
  //     .then((response) => {
  //       this.setState({ messages: response.data.messages });
  //     })
  //     .catch(function (error) {
  //       console.log(error, "??");
  //     });
  // }
  tabRow() {
    return Object.keys(this.state.messages).map((key, index) => {
      return this.state.messages[key].map((key, index) => {
        return <TableRow obj={key} key={index} />;
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h2> Chat rooms </h2>
        {/* <SocketIO></SocketIO> */}
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

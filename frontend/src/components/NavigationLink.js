import React from "react";
import { Link } from "react-router-dom";

function NavigationLink(props) {
  return (
    <li className="nav-item">
      <Link to={props.url} className="nav-link">
        {props.name}
      </Link>
    </li>
  );
}
export default NavigationLink;

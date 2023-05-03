import React from "react";
import { Link } from "react-router-dom";

function NavigationLink(props: { url: string; name: string }) {
  return (
    <li>
      <Link to={props.url} className="nav-li-link">
        {props.name}
      </Link>
    </li>
  );
}
export default NavigationLink;

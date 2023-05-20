import React from "react";
import { Link } from "react-router-dom";

interface NavigationLinkProps {
  url: string;
  name: string;
  dataTestId: string;
}

function NavigationLink(props: NavigationLinkProps) {
  return (
    <li>
      <Link data-testid={props.dataTestId} to={props.url} className="nav-li-link">
        {props.name}
      </Link>
    </li>
  );
}
export default NavigationLink;

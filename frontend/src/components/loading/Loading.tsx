import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="section-header">
      <h1>
        <Spinner animation="grow" variant="light" />
        Loading site
        <Spinner animation="grow" variant="light" />
      </h1>
    </div>
  );
}

export default Loading;

import "./style.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

function ModalCore(props) {
  const [show, setShow] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAction = () => {
    props.onClickFn();
    setShowAlert(true);
  };
  return (
    <>
      <Button variant={props.actionBtnVariant + " w-100"} onClick={handleShow}>
        {props.actionName}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.actionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">{props.body}</Modal.Body>
        <Modal.Footer className="bg-dark">
          <Alert show={showAlert} variant={props.actionBtnVariant + " w-50"}>
            {props.postInfo}
            <Button
              onClick={() => setShowAlert(false)}
              variant={"outline-" + props.actionBtnVariant + " m-1"}
            >
              Ok
            </Button>
          </Alert>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant={props.actionBtnVariant} onClick={handleAction}>
            {props.actionName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCore;

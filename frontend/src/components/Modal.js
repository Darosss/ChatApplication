import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalCore(props) {
  const [show, setShow] = useState(false);

  const [postInfo, setPostInfo] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAction = () => {
    console.log("action");
    props.onClickFn();
    handleClose();
  };

  return (
    <>
      <Button variant="danger w-100" onClick={handleShow}>
        {props.actionName}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.actionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">{props.body}</Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleAction}>
            {props.actionName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCore;

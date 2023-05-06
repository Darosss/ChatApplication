import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

function ModalCore(props: {
  onClickFn?: () => void;
  actionBtnVariant: string;
  actionName: string;
  postInfo: string;
  children?: React.ReactNode;
  onShowFn?: () => void;
  closeOnSubmit?: boolean;
  form?: boolean;
}) {
  const [show, setShow] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAction = () => {
    if (props.closeOnSubmit) handleClose();
    if (props.onClickFn) props.onClickFn();
    setShowAlert(true);
  };

  useEffect(() => {
    if (show && props.onShowFn) {
      props.onShowFn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      <Button variant={props.actionBtnVariant} className="modal-core-btn" onClick={handleShow}>
        {props.actionName}
      </Button>

      <Modal show={show} animation={false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.actionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light ">{props.children}</Modal.Body>
        <Modal.Footer className="bg-dark">
          <Alert show={showAlert} variant={props.actionBtnVariant + " w-50"}>
            {props.postInfo}
            <Button onClick={() => setShowAlert(false)} variant={"outline-" + props.actionBtnVariant + " m-1"}>
              Ok
            </Button>
          </Alert>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!props.form ? (
            <Button variant={props.actionBtnVariant} onClick={handleAction}>
              {props.actionName}
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCore;

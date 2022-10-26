import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function EditUserModal(props) {
  const [show, setShow] = useState(false);

  const [banTime, setBanTime] = useState("");
  // TODO: add ban info

  const [postInfo, setPostInfo] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const banUser = () => {
    const axiosConfig = {
      method: "post",
      data: {
        banTime: banTime,
      },
      withCredentials: true,
      url: "http://localhost:5000/users/ban/" + props.userId,
    };

    axios(axiosConfig).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const createModalBody = () => {
    return (
      <div>
        <label className="form-label ">Ban time (empty = 5min)</label>
        <input
          type="number"
          className="form-control"
          value={banTime || ""}
          onChange={(e) => setBanTime(e.target.value)}
        />
        <p className="text-danger font-weight-bold"> {postInfo} </p>
      </div>
    );
  };

  return (
    <>
      <Button variant="danger w-100" onClick={handleShow}>
        Ban user
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ban user - {props.username} </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          {createModalBody()}
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={banUser}>
            Ban
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserModal;

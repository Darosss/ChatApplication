import React, { useState } from "react";
import ModalCore from "../Modal";
import axios from "axios";

function DeleteRangeModal(props) {
  const [postInfo, setPostInfo] = useState("");

  const deleteRange = () => {
    const axiosConfig = {
      method: "delete",
      withCredentials: true,
      url: "/api/v1/ranges/delete/" + props.rangeId,
    };

    axios(axiosConfig).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const modalBody = () => {
    return (
      <div>
        <label className="form-label "> Delete range {props.rangeName}</label>
        <p className="text-danger font-weight-bold"> {postInfo} </p>
      </div>
    );
  };

  return (
    <ModalCore
      actionName="Delete"
      body={modalBody()}
      onClickFn={deleteRange}
      actionBtnVariant="danger"
      postInfo={postInfo}
    />
  );
}

export default DeleteRangeModal;

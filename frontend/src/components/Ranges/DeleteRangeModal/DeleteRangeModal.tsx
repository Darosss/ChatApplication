import "./style.css";
import React, { useState } from "react";
import ModalCore from "../../Modal";
import axios from "axios";

function DeleteRangeModal(props: { rangeId: string; rangeName: string }) {
  const { rangeId, rangeName } = props;
  const [postInfo, setPostInfo] = useState("");

  const deleteRange = () => {
    const axiosConfig = {
      method: "delete",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/ranges/delete/` + rangeId,
    };

    axios(axiosConfig).then((res) => {
      setPostInfo(res.data.message);

      window.location.reload();
    });
  };

  const modalBody = () => {
    return (
      <div>
        <label className="form-label "> Delete range {rangeName}</label>
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

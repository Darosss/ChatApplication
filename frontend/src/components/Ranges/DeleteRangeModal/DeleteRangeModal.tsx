import "./style.css";
import React, { useEffect, useState } from "react";
import ModalCore from "../../Modal";
import useAcciosHook from "../../../hooks/useAcciosHook";

function DeleteRangeModal(props: { rangeId: string; rangeName: string }) {
  const { rangeId, rangeName } = props;

  const [postInfo, setPostInfo] = useState("");

  const { response, sendData: deleteRange } = useAcciosHook({
    url: `ranges/admin/delete/${rangeId}`,
    method: "delete",
    withCredentials: true,
  });

  useEffect(() => {
    setPostInfo(response?.data.message);
  }, [response]);

  const modalBody = () => {
    return (
      <div>
        <label className="form-label "> Delete range {rangeName}</label>
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

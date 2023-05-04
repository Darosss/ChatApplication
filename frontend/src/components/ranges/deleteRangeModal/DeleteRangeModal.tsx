import React, { useContext } from "react";
import ModalCore from "@components/modal";
import useAcciosHook from "@hooks/useAcciosHook";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { SendDataContext } from "@contexts/SendDataContext";

function DeleteRangeModal(props: { rangeId: string; rangeName: string }) {
  const { rangeId, rangeName } = props;
  const { sendData: refetchData } = useContext(SendDataContext);

  const {
    response,
    error,
    sendData: deleteRange,
  } = useAcciosHook<{ message: string }>({
    url: `ranges/admin/delete/${rangeId}`,
    method: "delete",
    withCredentials: true,
  });

  const { postInfo } = usePostInfoHook(response?.data.message, error?.message);

  const handleOnDeleteRange = () => {
    deleteRange().then(() => {
      refetchData();
    });
  };
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
      onClickFn={handleOnDeleteRange}
      actionBtnVariant="danger"
      postInfo={postInfo}
    />
  );
}

export default DeleteRangeModal;

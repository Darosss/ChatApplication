import React, { useContext } from "react";
import ModalCore from "@components/modal";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { SendDataContext } from "@contexts/SendDataContext";
import { useDeleteRange } from "@hooks/rangesApi";

function DeleteRangeModal(props: { rangeId: string; rangeName: string }) {
  const { rangeId, rangeName } = props;
  const { sendData: refetchData } = useContext(SendDataContext);

  const { rangeDeleteResponse, rangeDeleteError, deleteRange } = useDeleteRange(rangeId);

  const { postInfo } = usePostInfoHook(rangeDeleteResponse?.data.message, rangeDeleteError?.message);

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
    <ModalCore actionName="Delete" onClickFn={handleOnDeleteRange} actionBtnVariant="danger" postInfo={postInfo}>
      {modalBody()}
    </ModalCore>
  );
}

export default DeleteRangeModal;

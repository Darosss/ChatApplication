import React, { useContext, useEffect, useState } from "react";
import ModalCore from "@components/modal";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useCreateOrUpdateRange } from "@hooks/rangesApi";
import { useRefetchData } from "@hooks/useAcciosHook";

function EditRangeModal(props: { range?: IRangeRes; sectionName?: string }) {
  const { range, sectionName = "" } = props;
  const { sendData: refetchData } = useContext(SendDataContext);

  const [rangeName, setRangeName] = useState("");

  const { response, error, sendData } = useCreateOrUpdateRange({ name: rangeName }, range?._id);
  const { postInfo } = usePostInfoHook(response?.data.message, error?.message);

  useEffect(() => {
    if (!range) return;
    setRangeName(range.name);
  }, [range]);

  useRefetchData(response, refetchData);

  const handleOnCreateEditRange = () => {
    sendData();
  };

  const modalBody = () => {
    return (
      <div>
        <div>
          <label className="form-label ">Range name</label>
          <input
            type="text"
            className="form-control"
            value={rangeName || ""}
            onChange={(e) => setRangeName(e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <ModalCore
      actionName={sectionName}
      onClickFn={handleOnCreateEditRange}
      actionBtnVariant="primary"
      postInfo={postInfo}
    >
      {modalBody()}
    </ModalCore>
  );
}

export default EditRangeModal;

import React, { useContext, useEffect, useState } from "react";
import ModalCore from "@components/modal";
import useAcciosHook from "@hooks/useAcciosHook";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";

function EditRangeModal(props: { range?: IRangeRes; sectionName?: string }) {
  const { range, sectionName = "" } = props;
  const { sendData: refetchData } = useContext(SendDataContext);

  const [rangeName, setRangeName] = useState("");
  const { response, error, sendData } = useAcciosHook<{ message: string; range: IRangeRes }>(
    {
      url: "ranges/admin" + (range ? `/edit/${range._id}` : "/create"),
      method: `${range ? "patch" : "post"}`,
      withCredentials: true,
      data: { name: rangeName },
    },
    true,
  );
  const { postInfo } = usePostInfoHook(response?.data.message, error?.message);

  useEffect(() => {
    if (!range) return;
    setRangeName(range.name);
  }, [range]);

  const handleOnCreateEditRange = () => {
    sendData().then(() => {
      refetchData();
    });
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
      closeOnSubmit={true}
    >
      {modalBody()}
    </ModalCore>
  );
}

export default EditRangeModal;

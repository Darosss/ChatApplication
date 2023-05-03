import "./style.css";
import React, { useEffect, useState } from "react";
import ModalCore from "@components/Modal";
import useAcciosHook from "@hooks/useAcciosHook";

function EditRangeModal(props: { range?: IRangeRes; sectionName?: string }) {
  const { range = undefined, sectionName = "" } = props;

  const [rangeName, setRangeName] = useState("");
  const [postInfo, setPostInfo] = useState("");

  const { response, error, sendData } = useAcciosHook(
    {
      url: "ranges/admin" + (range ? `/edit/${range._id}` : "/create"),
      method: `${range ? "patch" : "post"}`,
      withCredentials: true,
      data: {
        name: rangeName,
      },
    },
    true,
  );

  useEffect(() => {
    setPostInfo(response?.data.message);
  }, [response]);

  useEffect(() => {
    if (error) setPostInfo(error.message);
  }, [error]);

  useEffect(() => {
    if (!range) return;
    setRangeName(range.name);
  }, [range]);

  const createOrEditRange = () => {
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
      body={modalBody()}
      onClickFn={createOrEditRange}
      actionBtnVariant="primary"
      postInfo={postInfo}
    />
  );
}

export default EditRangeModal;

import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalCore from "../../Modal";

function EditRangeModal(props: { isEdit?: boolean; rangeId?: string; sectionName?: string }) {
  const { isEdit = false, rangeId = undefined, sectionName = "" } = props;
  const [rangeName, setRangeName] = useState("");
  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    if (!isEdit || !rangeId) return;

    const axiosConfigRanges = {
      method: "get",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/ranges/` + rangeId,
    };

    axios(axiosConfigRanges).then((res) => {
      setRangeName(res.data.range.name);
    });
  }, [isEdit, rangeId]);

  const createOrEditRange = () => {
    const axiosEditRange = {
      method: "post",
      data: {
        name: rangeName,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/ranges/` + (rangeId ? "edit/" + rangeId : "create"),
    };
    axios(axiosEditRange).then((res) => {
      setPostInfo(res.data.message);

      window.location.reload();
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
        <p className="text-danger font-weight-bold"> {postInfo} </p>
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

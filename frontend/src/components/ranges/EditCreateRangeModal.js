import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalCore from "../Modal";

function EditRangeModal(props) {
  const [rangeName, setRangeName] = useState("");
  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    if (!props.isEdit) return;

    const axiosConfigRanges = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/ranges/" + props.rangeId,
    };

    axios(axiosConfigRanges).then((res) => {
      setRangeName(res.data.range.name);
    });
  }, [props]);

  const createOrEditRange = () => {
    const axiosEditRange = {
      method: "post",
      data: {
        name: rangeName,
      },
      withCredentials: true,
      url:
        "http://localhost:5000/ranges/" +
        (props.rangeId ? "edit/" + props.rangeId : "create"),
    };
    axios(axiosEditRange).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
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
      actionName={props.sectionName}
      body={modalBody()}
      onClickFn={createOrEditRange}
      actionBtnVariant="primary"
      postInfo={postInfo}
    />
  );
}

export default EditRangeModal;

import React, { useContext, useEffect, useState } from "react";
import ModalCore from "@components/modal";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useCreateOrUpdateRange } from "@hooks/rangesApi";
import { useRefetchData } from "@hooks/useAcciosHook";
import RangeForm from "./RangeForm";
import PostInfo from "@components/postInfo";
import { IRangeRes, RangeUpdateData } from "src/@types/types";

function EditRangeModal(props: { range?: IRangeRes; sectionName?: string }) {
  const { range, sectionName = "" } = props;
  const { sendData: refetchData } = useContext(SendDataContext);

  const [rangeValues, setRangeValues] = useState<RangeUpdateData>({
    name: "",
  });

  const { response, error, sendData } = useCreateOrUpdateRange(range?._id);
  const { postInfo } = usePostInfoHook(response?.data.message, error?.message);

  useEffect(() => {
    if (!range) return;
    setRangeValues(range);
  }, [range]);

  useRefetchData(response, refetchData);

  return (
    <ModalCore actionName={sectionName} actionBtnVariant="primary" postInfo={postInfo} form={true}>
      <RangeForm initialValues={rangeValues} onSubmit={sendData<RangeUpdateData>} actionName={sectionName} />
      <PostInfo info={postInfo} />
    </ModalCore>
  );
}

export default EditRangeModal;

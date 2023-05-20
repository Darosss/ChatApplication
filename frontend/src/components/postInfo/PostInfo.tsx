import React from "react";
import { postInfoElementId } from "@utils/dataTestIdsList";

function PostInfo(props: { info: string }) {
  return (
    <div data-testid={postInfoElementId} className="post-info">
      <div>{props.info}</div>
    </div>
  );
}

export default PostInfo;

import React from "react";

function PostInfo(props: { info: string }) {
  return (
    <div className="post-info">
      <div>{props.info}</div>
    </div>
  );
}

export default PostInfo;

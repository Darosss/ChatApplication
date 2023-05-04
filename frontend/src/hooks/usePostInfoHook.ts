import { useEffect, useState } from "react";

function usePostInfoHook(info: string | undefined, error: string | undefined) {
  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    if (!info) return;
    setPostInfo(info);
  }, [info]);
  useEffect(() => {
    if (!error) return;
    setPostInfo(error);
  }, [error]);

  return { postInfo };
}

export default usePostInfoHook;

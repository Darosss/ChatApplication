import useAcciosHook from "./useAcciosHook";

export function useGetRanges() {
  const {
    response: rangesResponse,
    loading: rangesLoading,
    error: rangesError,
    sendData: refetchRanges,
  } = useAcciosHook<{ ranges: IRangeRes[] }>({
    url: `/ranges`,
    method: "get",
    withCredentials: true,
  });

  return { rangesResponse, rangesLoading, rangesError, refetchRanges };
}

export function useDeleteRange(rangeId: string) {
  const {
    response: rangeDeleteResponse,
    error: rangeDeleteError,
    sendData: deleteRange,
  } = useAcciosHook<{ message: string }>({
    url: `ranges/admin/delete/${rangeId}`,
    method: "delete",
    withCredentials: true,
  });

  return { rangeDeleteResponse, rangeDeleteError, deleteRange };
}

export function useCreateOrUpdateRange(rangeData: RangeUpdateData, rangeId?: string | undefined) {
  const url = "ranges/admin" + (rangeId ? `/edit/${rangeId}` : "/create");
  const method = `${rangeId ? "patch" : "post"}`;
  const { response, error, sendData } = useAcciosHook<{ message: string; range: IRangeRes }>(
    {
      url: url,
      method: method,
      withCredentials: true,
      data: rangeData,
    },
    true,
  );

  return { response, error, sendData };
}

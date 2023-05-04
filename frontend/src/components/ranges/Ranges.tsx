import React from "react";
import EditCreateRangeModal from "./editCreateRangeModal";
import DeleteRangeModal from "./deleteRangeModal";
import useAcciosHook from "@hooks/useAcciosHook";
import { SendDataContext } from "@contexts/SendDataContext";

function Ranges() {
  const {
    response: rangesRes,
    loading: loadingRanges,
    sendData: refetchRanges,
  } = useAcciosHook<{ ranges: IRangeRes[] }>({
    url: `/ranges`,
    method: "get",
    withCredentials: true,
  });
  const ranges = rangesRes?.data.ranges;

  return (
    <SendDataContext.Provider value={{ sendData: refetchRanges }}>
      <div>
        <div className="section-header">
          <h1> Ranges list {loadingRanges ? "  Fetching data..." : null}</h1>
        </div>
        <div>
          <table className="table table-sm table-dark ranges-list">
            <thead>
              <tr>
                <th> Ranges </th>
                <th> Creator </th>
                <th> Create date </th>
                <th colSpan={2}>
                  <EditCreateRangeModal sectionName="Create" />
                </th>
              </tr>
            </thead>
            <tbody>
              {ranges?.map((range, index) => {
                return (
                  <tr key={index}>
                    <td>{range.name}</td>
                    <td>{range.createdBy.username}</td>
                    <td>{range.createdAt.toString().split("T")[0]}</td>
                    <td>
                      <EditCreateRangeModal sectionName="Edit" range={range} />
                    </td>
                    <td>
                      <DeleteRangeModal rangeName={range.name} rangeId={range._id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </SendDataContext.Provider>
  );
}

export default Ranges;

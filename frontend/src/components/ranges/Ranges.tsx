import React, { useEffect, useState } from "react";
import EditCreateRangeModal from "./editCreateRangeModal";
import DeleteRangeModal from "./deleteRangeModal";
import { SendDataContext } from "@contexts/SendDataContext";
import { useGetRanges } from "@hooks/rangesApi";

function Ranges() {
  const { rangesResponse, rangesLoading, refetchRanges } = useGetRanges();

  const [ranges, setRanges] = useState<IRangeRes[]>([]);

  useEffect(() => {
    if (rangesResponse) setRanges(rangesResponse.data.ranges);
  }, [rangesResponse]);

  return (
    <SendDataContext.Provider value={{ sendData: refetchRanges }}>
      <div>
        <div className="section-header">
          <h1> Ranges list {rangesLoading ? "  Fetching data..." : null}</h1>
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

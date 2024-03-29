import React, { useEffect, useState } from "react";
import EditCreateRangeModal from "./editCreateRangeModal";
import DeleteRangeModal from "./deleteRangeModal";
import { SendDataContext } from "@contexts/SendDataContext";
import { useGetRanges } from "@hooks/rangesApi";
import { IRangeRes } from "src/@types/types";
import { getFormatedDate } from "@src/utils/dates";

function Ranges() {
  const { rangesResponse, rangesLoading, refetchRanges } = useGetRanges();

  const [ranges, setRanges] = useState<IRangeRes[]>([]);

  useEffect(() => {
    if (rangesResponse) setRanges(rangesResponse.data.ranges);
  }, [rangesResponse]);

  return (
    <SendDataContext.Provider value={{ sendData: refetchRanges }}>
      <div data-testid="ranges-element">
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
                    <td>{getFormatedDate(range.createdAt)}</td>
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

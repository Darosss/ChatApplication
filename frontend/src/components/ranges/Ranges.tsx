import "./style.css";
import React from "react";
import EditCreateRangeModal from "./EditCreateRangeModal";
import DeleteRangeModal from "./DeleteRangeModal";
import useAcciosHook from "@hooks/useAcciosHook";

function Ranges() {
  const { response: rangesRes, loading: loadingRanges } = useAcciosHook({
    url: `/ranges`,
    method: "get",
    withCredentials: true,
  });
  const ranges = rangesRes?.data.ranges as IRangeRes[];

  return (
    <div>
      <div className="section-header">
        <h1> Ranges list {loadingRanges ? " -- Fetching data..." : null}</h1>
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
  );
}

export default Ranges;

import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditCreateRangeModal from "./EditCreateRangeModal";
import DeleteRangeModal from "./DeleteRangeModal";

function Ranges() {
  const [avilableRanges, setAvailableRanges] = useState([]);

  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/ranges/`,
    };
    axios(axiosConfig).then((res) => {
      setAvailableRanges(res.data.ranges);
    });
  }, []);

  return (
    <div>
      <div className="section-header">
        <h1> Ranges list</h1>
      </div>
      <div className="container d-flex justify-content-center">
        <table className="table table-sm table-dark w-100">
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
            {avilableRanges.map((range, index) => {
              return (
                <tr key={index}>
                  <td>{range.name}</td>
                  <td>{range.createdBy.username}</td>
                  <td>{range.createdAt.split("T")[0]}</td>
                  <td>
                    <EditCreateRangeModal
                      sectionName="Edit"
                      rangeId={range._id}
                      isEdit="true"
                    />
                  </td>
                  <td>
                    <DeleteRangeModal
                      rangeName={range.name}
                      rangeId={range._id}
                    />
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

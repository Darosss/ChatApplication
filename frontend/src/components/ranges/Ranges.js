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
      url: "http://localhost:5000/ranges/",
    };
    axios(axiosConfig).then((res) => {
      setAvailableRanges(res.data.ranges);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className="d-flex w-25">
          <div className="w-100">Ranges</div>
          <div className="w-100">
            <EditCreateRangeModal sectionName="Create" />
          </div>
        </div>
        <div className="container d-flex justify-content-center">
          <table className="table table-sm table-dark w-50">
            <thead>
              <tr>
                <th> Ranges </th>
                <th> Creator </th>
                <th> Create date </th>
                <th colSpan={2}></th>
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
      </header>
    </div>
  );
}

export default Ranges;

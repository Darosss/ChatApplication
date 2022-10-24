import React, { useState, useEffect } from "react";
import axios from "axios";
import EditRangeModal from "./EditRangeModal";
import DeleteRangeModal from "./DeleteRangeModal";

function Ranges() {
  const [avilableRanges, setAvailableRanges] = useState([]);
  const [selectedRangeId, setSelectedRangeId] = useState("");

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
        <h1>Ranges</h1>
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
                      <button
                        id={range._id}
                        className="btn btn-primary w-100"
                        data-toggle="modal"
                        data-target="#edit-range"
                        onClick={(e) => setSelectedRangeId(e.target.id)}
                      >
                        EDIT
                      </button>
                    </td>
                    <td>
                      <button
                        id={range._id}
                        className="btn btn-danger w-100"
                        data-toggle="modal"
                        data-target="#delete-range"
                        onClick={(e) => setSelectedRangeId(e.target.id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <EditRangeModal
            id="edit-range"
            sectionName="Edit range"
            rangeId={selectedRangeId}
          />
          <DeleteRangeModal
            id="delete-range"
            sectionName="Delete range"
            rangeId={selectedRangeId}
          />
        </div>
      </header>
    </div>
  );
}

export default Ranges;

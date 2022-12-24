import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import EditCreateRangeModal from "./EditCreateRangeModal";
import DeleteRangeModal from "./DeleteRangeModal";

function Ranges() {
  const [avilableRanges, setAvailableRanges] = useState<IRangeRes[]>();

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
            {avilableRanges?.map((range, index) => {
              return (
                <tr key={index}>
                  <td>{range.name}</td>
                  <td>{range.createdBy.username}</td>
                  <td>{range.createdAt.toString().split("T")[0]}</td>
                  <td>
                    <EditCreateRangeModal
                      sectionName="Edit"
                      rangeId={range._id}
                      isEdit={true}
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

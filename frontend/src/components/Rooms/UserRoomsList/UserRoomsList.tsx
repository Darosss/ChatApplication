import "./style.css";
import EditCreateRoomModal from "../EditCreateRoomModal";
import DeleteRoomModal from "../DeleteRoomModal";

function UserRoomsList(props: { rooms: IChatRoomRes[] }) {
  const { rooms } = props;

  return (
    <div>
      <table className="table table-sm table-dark user-rooms-list">
        <thead>
          <tr>
            <th> Rooms </th>
            <th colSpan={2}>
              <EditCreateRoomModal sectionName="Create" />
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => {
            return (
              <tr key={index}>
                <td> {room.name}</td>
                <td>
                  <EditCreateRoomModal sectionName="Edit" roomId={room._id} />
                </td>
                <td>
                  <DeleteRoomModal roomId={room._id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserRoomsList;

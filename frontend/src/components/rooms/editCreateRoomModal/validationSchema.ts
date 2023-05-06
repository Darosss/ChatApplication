import { object, string, array } from "yup";

export const roomSchema = object<RoomUpdateData>().shape({
  name: string()
    .required("Required!")
    .min(3, "Room name is too short - should be 3 chars minimum.")
    .max(24, "Room name can't be longer than 24"),

  availableRanges: array(),
  allowedUsers: array(),
  bannedUsers: array(),
});

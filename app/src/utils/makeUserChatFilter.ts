import { User } from "@/models/user";
import { IUserRoomsFilter } from "@types";

const makeUserChatFilter = async (userId: string) => {
  let userChatsFilter: IUserRoomsFilter;
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) return null;

    userChatsFilter = {
      $or: [
        { createdBy: currentUser.id },
        //if room created by user
        {
          availableRanges: { $in: currentUser.ranges },
          //user has range that chatrom require
        },
        {
          allowedUsers: { $eq: currentUser.id },
          //user is allowed in chatroom
        },
      ],
      $and: [
        {
          bannedUsers: { $ne: currentUser.id },
          //user is not banned in chatroom
        },
      ],
    };

    return userChatsFilter;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default makeUserChatFilter;

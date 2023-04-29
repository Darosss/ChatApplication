import { IChatRoom, IChatRoomDocument } from "@types";
import { ChatRoom } from "@/models/chatRoom";
import { handleAppError } from "@/utils/ErrorHandler";
import { FilterQuery, Model, PopulateOptions, ProjectionType } from "mongoose";

type ChatRoomCreateData = Omit<IChatRoom, "_id">;
class ChatRoomService {
  constructor(private readonly chatRoomModel: Model<IChatRoomDocument>) {}
  getRoomsList = async (
    filter: FilterQuery<IChatRoomDocument> = {},
    projection: ProjectionType<IChatRoomDocument> = {}
  ): Promise<IChatRoom[]> => {
    try {
      const chatRooms = await this.chatRoomModel.find(filter, projection);
      return chatRooms;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return [];
    }
  };

  getRoomById = async (
    id: string,
    projection: ProjectionType<IChatRoomDocument> = {},
    populate?: PopulateOptions[]
  ): Promise<IChatRoom | null> => {
    try {
      const chatRoom = await this.chatRoomModel.findById(id, projection);
      if (populate) await chatRoom?.populate({ ...populate });

      return chatRoom;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  upadeRoomById = async (
    id: string,
    updateData: Partial<IChatRoom>
  ): Promise<IChatRoom | null> => {
    try {
      const chatRoom = await this.chatRoomModel.findByIdAndUpdate(
        id,
        updateData,
        {
          runValidators: true,
        }
      );

      return chatRoom;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  createNewRoom = async (createData: ChatRoomCreateData) => {
    try {
      const newRoom = await this.chatRoomModel.create(createData);

      return newRoom;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  removeRoomById = async (id: string) => {
    try {
      await this.chatRoomModel.remove({ id: id });
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };
}

export const chatRoomService = new ChatRoomService(ChatRoom);
export type { ChatRoomService };
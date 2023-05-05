import { ChatRoomModel, ChatRoomDocument } from "@types";
import { ChatRoom } from "@/models/chatRoom";
import { AppError, handleAppError } from "@/utils/ErrorHandler";
import { FilterQuery, Model, PopulateOptions, ProjectionType } from "mongoose";

type ChatRoomCreateData = Omit<ChatRoomModel, "_id">;
class ChatRoomService {
  constructor(private readonly chatRoomModel: Model<ChatRoomDocument>) {}
  getRoomsList = async (
    filter: FilterQuery<ChatRoomDocument> = {},
    projection: ProjectionType<ChatRoomDocument> = {}
  ): Promise<ChatRoomModel[]> => {
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
    projection: ProjectionType<ChatRoomDocument> = {},
    populate?: PopulateOptions[]
  ): Promise<ChatRoomModel | null> => {
    try {
      const chatRoom = await this.chatRoomModel.findById(id, projection);
      if (populate) await chatRoom?.populate(populate);

      return chatRoom;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  getOneRoom = async (
    projection: FilterQuery<ChatRoomDocument> = {},
    populate?: PopulateOptions[]
  ): Promise<ChatRoomModel | null> => {
    try {
      const chatRoom = await this.chatRoomModel.findOne(projection);
      if (populate) await chatRoom?.populate(populate);

      return chatRoom;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  upadeRoomById = async (
    id: string,
    updateData: Partial<ChatRoomModel>
  ): Promise<ChatRoomModel | null> => {
    try {
      const chatRoom = await this.chatRoomModel.findById(id);

      if (!chatRoom) {
        throw new AppError(404, "Chat room not found");
      }
      const existingRoom = await this.chatRoomModel.findOne({
        name: updateData.name,
        _id: { $ne: chatRoom.id },
      });

      if (existingRoom) {
        throw new AppError(409, "Chat room with that name already exists");
      }

      Object.assign(chatRoom, updateData);
      await chatRoom.save();
      return chatRoom;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  createNewRoom = async (createData: ChatRoomCreateData) => {
    try {
      const existRoom = await this.getOneRoom({ name: createData.name });
      if (existRoom) {
        throw new AppError(409, "Chat room with that name already exists");
      }

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
      await this.chatRoomModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };
}

export const chatRoomService = new ChatRoomService(ChatRoom);
export type { ChatRoomService, ChatRoomCreateData };

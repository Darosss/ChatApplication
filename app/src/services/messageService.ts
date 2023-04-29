import { IMessage, IMessageDocument } from "@types";
import { Message } from "@/models/message";
import { handleAppError } from "@/utils/ErrorHandler";
import { FilterQuery, Model, PopulateOptions, ProjectionType } from "mongoose";

type MessageCreateData = Omit<IMessage, "_id">;

class MessageService {
  constructor(private readonly messageModel: Model<IMessageDocument>) {
    this.messageModel = messageModel;
  }
  getMessagesList = async (
    filter: FilterQuery<IMessageDocument> = {},
    projection: ProjectionType<IMessageDocument> = {},
    populate?: PopulateOptions
  ): Promise<IMessage[]> => {
    try {
      const messages = await this.messageModel
        .find(filter, projection)
        .populate(populate || []);

      return messages;
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return [];
    }
  };

  getMessageById = async (
    id: string,
    projection: ProjectionType<IMessageDocument> = {},
    populate?: PopulateOptions
  ): Promise<IMessage | null> => {
    try {
      const message = await this.messageModel.findById(id, projection);
      if (populate) await message?.populate(populate);

      return message;
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return null;
    }
  };

  updateMessageById = async (
    id: string,
    updateData: Partial<IMessageDocument>
  ): Promise<IMessage | null> => {
    try {
      const message = await this.messageModel.findByIdAndUpdate(id, updateData);

      return message;
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return null;
    }
  };

  createNewMessage = async (createData: MessageCreateData) => {
    try {
      const newMessage = await this.messageModel.create(createData);

      return newMessage;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };
}

const messageService = new MessageService(Message);

export { messageService, MessageService, MessageCreateData };

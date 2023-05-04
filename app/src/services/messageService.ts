import { MessageModel, MessageDocument } from "@types";
import { Message } from "@/models/message";
import { handleAppError } from "@/utils/ErrorHandler";
import { FilterQuery, Model, PopulateOptions, ProjectionType } from "mongoose";

type MessageCreateData = Omit<MessageModel, "_id">;

class MessageService {
  constructor(private readonly messageModel: Model<MessageDocument>) {
    this.messageModel = messageModel;
  }
  getMessagesList = async (
    filter: FilterQuery<MessageDocument> = {},
    projection: ProjectionType<MessageDocument> = {},
    populate?: PopulateOptions
  ): Promise<MessageModel[]> => {
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
    projection: ProjectionType<MessageDocument> = {},
    populate?: PopulateOptions
  ): Promise<MessageModel | null> => {
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
    updateData: Partial<MessageDocument>
  ): Promise<MessageModel | null> => {
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

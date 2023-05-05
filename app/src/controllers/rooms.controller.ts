import { NextFunction, Request, Response } from "express";
import { RequestUserAuth } from "@types";
import { ChatRoomService, chatRoomService } from "@/services/chatRoomService";
import { MessageService, messageService } from "@/services/messageService";
import { AppError } from "@/utils/ErrorHandler";
import makeUserChatFilter from "@/utils/makeUserChatFilter";

class ChatRoomsController {
  constructor(
    private readonly chatRoomService: ChatRoomService,
    private readonly messageService: MessageService
  ) {}

  getListOfLoggedUserRooms = async (
    req: RequestUserAuth,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id;
    if (!userId) throw new AppError(500, "Something went wrong");

    try {
      const usersChatRooms = await this.chatRoomService.getRoomsList(
        { createdBy: userId },
        { __v: 0 }
      );
      return res.status(200).send({ rooms: usersChatRooms });
    } catch (err) {
      return next(err);
    }
  };

  createNewRoom = async (
    req: RequestUserAuth,
    res: Response,
    next: NextFunction
  ) => {
    const createdBy = req.user?.id;
    if (!createdBy) throw new AppError(500, "Something went wrong");

    try {
      const room = await this.chatRoomService.createNewRoom({
        name: req.body.name,
        availableRanges: req.body.availableRanges,
        allowedUsers: req.body.allowedUsers,
        bannedUsers: req.body.bannedUsers,
        createdBy: createdBy,
      });
      res
        .status(201)
        .send({ message: "Room created successfully!", room: room });
    } catch (err) {
      return next(err);
    }
  };

  getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    try {
      const chatRoomEdit = await this.chatRoomService.getRoomById(
        _id,
        { __v: 0 },
        [
          { path: "availableRanges", select: "id name" },
          { path: "allowedUsers", select: "id username" },
          { path: "bannedUsers", select: "id username" },
          { path: "createdBy", select: "id username" },
        ]
      );

      res.status(200).send({
        chatRoom: chatRoomEdit,
      });
    } catch (err) {
      return next(err);
    }
  };

  editRoomById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    try {
      const updatedRoom = await this.chatRoomService.upadeRoomById(_id, {
        name: req.body.name,
        availableRanges: req.body.availableRanges,
        allowedUsers: req.body.allowedUsers,
        bannedUsers: req.body.bannedUsers,
      });
      return res
        .status(200)
        .send({ message: "Successfully edited room", room: updatedRoom });
    } catch (err) {
      return next(err);
    }
  };

  deleteRoomById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    try {
      await this.chatRoomService.removeRoomById(_id);
      res.status(200).send({ message: "Succesfully removed room" });
    } catch (err) {
      return next(err);
    }
  };

  getListOfUsersRooms = async (
    req: RequestUserAuth,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new AppError(500, "Something went wrong");

      const chatRoomFilter = await makeUserChatFilter(userId);
      if (!chatRoomFilter) throw new AppError(500, "Something went wrong");

      const chatRooms = await this.chatRoomService.getRoomsList(
        chatRoomFilter,
        { id: 1, name: 1 }
      );

      return res.status(200).send({ rooms: chatRooms });
    } catch (err) {
      return next(err);
    }
  };

  getRoomsMessagesById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { _id } = req.params;
    try {
      const roomMessages = await this.messageService.getMessagesList(
        { whereSent: _id },
        { __v: 0, whereSent: 0 },
        { path: "sender", select: "id username" }
      );

      return res.status(200).send({
        chatRoom: {
          id: _id,
          messages: Array.from(roomMessages),
        },
      });
    } catch (err) {
      return next(err);
    }
  };
}

export const chatRoomsController = new ChatRoomsController(
  chatRoomService,
  messageService
);

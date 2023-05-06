import { NextFunction, Request, Response } from "express";
import { UserService, userService } from "@/services/userService";
import { ChatRoomService, chatRoomService } from "@/services/chatRoomService";

class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly chatRoomService: ChatRoomService
  ) {}
  getListOfUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getUsersList({}, { __v: 0 });
      return res.status(200).send({ users: users });
    } catch (err) {
      return next(err);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      const user = await this.userService.getUserById(
        _id,
        { __v: 0 },
        { path: "ranges", select: "id name" }
      );

      return res.status(200).send({
        user: user,
      });
    } catch (err) {
      return next(err);
    }
  };

  getUsersRoomsById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { _id } = req.params;
    try {
      const chatRooms = await this.chatRoomService.getRoomsList({
        createdBy: _id,
      });
      return res.status(200).send({ chatRooms: chatRooms });
    } catch (err) {
      return next(err);
    }
  };

  editUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    const update = {
      username: req.body.username,
      firstname: req.body.firstname,
      surname: req.body.surname,
      country: req.body.country,
      gender: req.body.gender,
      nickColor: req.body.nickColor,
      email: req.body.email,
      phone: req.body.phone,
      ranges: req.body.ranges,
    };

    try {
      const user = await this.userService.updateUserById(_id, update);
      return res.status(200).send({ message: "User edited", user: user });
    } catch (err) {
      return next(err);
    }
  };

  banUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    const banTime = req.body.banTime || 5;
    const banReason = req.body.banReason;

    const bannedDate = new Date(),
      banExpiresDate = new Date();
    const banMinutes = banExpiresDate.getMinutes() + parseInt(banTime);
    banExpiresDate.setMinutes(banMinutes);

    const update = {
      isBanned: true,
      bannedDate: bannedDate,
      banExpiresDate: banExpiresDate,
      banReason: banReason,
    };
    try {
      const user = await this.userService.updateUserById(_id, update);
      return res.status(200).send({ message: "User banned", user: user });
    } catch (err) {
      return next(err);
    }
  };

  unbanUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    const update = {
      isBanned: false,
    };
    try {
      const user = await this.userService.updateUserById(_id, update);
      return res.status(200).send({ message: "User unbanned", user: user });
    } catch (err) {
      return next(err);
    }
  };
}

export const usersController = new UsersController(
  userService,
  chatRoomService
);

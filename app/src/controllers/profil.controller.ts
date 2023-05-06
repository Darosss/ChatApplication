import { NextFunction, Response } from "express";
import { RequestUserAuth } from "@types";

import { UserService, userService } from "@/services/userService";
import { AppError } from "@/utils/ErrorHandler";

class ProfilController {
  constructor(private readonly userService: UserService) {}

  getUserProfile = async (
    req: RequestUserAuth,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id || "";

    try {
      const loggedUser = await this.userService.getUserById(
        userId,
        { __v: 0 },
        { path: "ranges", select: "__v:0" }
      );

      return res.status(200).send({ user: loggedUser });
    } catch (err) {
      return next(err);
    }
  };

  editUserProfile = async (
    req: RequestUserAuth,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id;

    if (!userId) throw new AppError(500, "Something went wrong");

    try {
      await this.userService.updateUserById(userId, {
        firstname: req.body.firstname,
        surname: req.body.surname,
        birthday: req.body.birthday,
        country: req.body.country,
        gender: req.body.gender,
        nickColor: req.body.nickColor,
        email: req.body.email,
        phone: req.body.phone,
      });

      if (req.body.oldPassword || req.body.newPassword) {
        const passwordUpdated = await this.userService.updateUserPassword(
          userId,
          req.body.oldPassword,
          req.body.newPassword
        );

        if (!passwordUpdated) {
          throw new AppError(400, "Passwords do not match");
        }
      }
      return res.status(200).send({ message: "Profile updated successfully" });
    } catch (err) {
      return next(err);
    }
  };
}

export const profilController = new ProfilController(userService);

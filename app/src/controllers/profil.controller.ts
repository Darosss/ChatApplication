import { NextFunction, Response } from "express";
import { User } from "@/models/user";
import { IMongooseError, IUserDocument, RequestUserAuth } from "@types";
import errorHandlerMiddleware from "@/middlewares/errorHandler.middleware";
import bcrypt from "bcrypt";
import { Error } from "mongoose";

export const getUserProfile = async (req: RequestUserAuth, res: Response) => {
  const userId = req.user?.id;

  const userDB = await User.findById(userId, {
    password: 0,
    __v: 0,
  }).populate("ranges", { __v: 0 });

  return res.send({ userDetails: userDB });
};

export const editUserProfile = async (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  const {
    oldPassword,
    newPassword,
    firstname,
    surname,
    birthday,
    country,
    gender,
    nickColor,
    email,
    phoneNumber,
  } = req.body;

  User.findById(userId, async function (err: Error, user: IUserDocument) {
    user.firstname = firstname;
    user.surname = surname;
    user.birthday = birthday;
    user.country = country;
    user.gender = gender;
    user.nickColor = nickColor;
    user.email = email;
    user.phoneNumber = phoneNumber;

    //password validation, for now it's here
    //TODO move this to other file / function
    if (await bcrypt.compare(oldPassword, user.password)) {
      user.password = newPassword;
    } else if (oldPassword || newPassword) {
      return next(
        errorHandlerMiddleware(
          new Error("Password do not match") as IMongooseError,
          req,
          res,
          next
        )
      );
    }

    user
      .save()
      .then(() => {
        res.status(201).send({ message: "Succesfully edited profile" });
      })
      .catch((error) => {
        return next(
          errorHandlerMiddleware(error as IMongooseError, req, res, next)
        );
      });
  });
};

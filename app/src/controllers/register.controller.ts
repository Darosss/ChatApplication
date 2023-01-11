import { User } from "@/models/user";
import { NextFunction, Request, Response } from "express";
import { IMongooseError } from "@types";
import errorHandlerMiddleware from "@/middlewares/errorHandler.middleware";

export const register = (req: Request, res: Response, next: NextFunction) => {
  const userData: {
    username: string;
    password: string;
    firstname: string;
    surname: string;
    birthday: Date;
    country: string;
    gender: string;
    nickColor: string;
    email: string;
    phoneNumber: string;
  } = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    surname: req.body.surname,
    birthday: req.body.birthday,
    country: req.body.country,
    gender: req.body.gender,
    nickColor: req.body.nickColor,
    email: req.body.email,
    phoneNumber: req.body.phone,
  };

  User.findOne(
    { username: req.body.username },
    async (err: Error, doc: Array<object>) => {
      if (err) throw err;
      if (doc) res.send("User already exist");
      if (!doc) {
        const newUser = new User(userData);
        try {
          await newUser.save();
          res.status(201).send("Account created");
        } catch (error) {
          return next(
            errorHandlerMiddleware(error as IMongooseError, req, res, next)
          );
        }
      }
    }
  );
};

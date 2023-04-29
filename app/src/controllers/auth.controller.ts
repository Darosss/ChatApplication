import { NextFunction, Request, Response } from "express";
import { RequestUserAuth } from "@types";
import { UserCreateData, userService } from "@/services/userService";
import passport from "passport";

export const login = (req: RequestUserAuth, res: Response) => {
  return res.status(200).send({ token: req.session?.jwt, user: req.user });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.session = null;
  return res.status(200).send({ message: "Logout succes" });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData: UserCreateData = {
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

  try {
    const message = await userService.createNewUser(
      userData.username,
      userData
    );
    return res.status(201).send(message);
  } catch (err) {
    return next(err);
  }
};

export const getSession = (req: Request, res: Response) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(200).send(false);
    } else {
      return res.status(200).send(user);
    }
  })(req, res);
};

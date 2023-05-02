import { NextFunction, Request, Response } from "express";
import { RequestUserAuth } from "@types";
import {
  UserCreateData,
  UserService,
  userService,
} from "@/services/userService";
import passport from "passport";

class AuthController {
  constructor(private readonly userService: UserService) {}

  login = (req: RequestUserAuth, res: Response) => {
    return res.status(200).send({ token: req.session?.jwt, user: req.user });
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    req.logOut(function (err) {
      if (err) {
        return next(err);
      }
    });
    req.session = null;
    return res.status(200).send({ message: "Logout succes" });
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
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
      const created = await this.userService.createNewUser(
        userData.username,
        userData
      );
      if (created) {
        return res
          .status(201)
          .send({ message: "Account created successfully" });
      }

      return res
        .status(400)
        .send({ message: "Account with that username already exist" });
    } catch (err) {
      return next(err);
    }
  };

  getSession = (req: Request, res: Response) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).send(false);
      } else {
        return res.status(200).send(user);
      }
    })(req, res);
  };
}

export const authController = new AuthController(userService);

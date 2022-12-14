import { User } from "@/models/user";
import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
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
        } catch (err) {
          console.log("reg,body", req.body);
          console.log("Register error", err);
          res
            .status(400)
            .send({ message: "Some fields can't be empty", body: req.body });
        }
      }
    }
  );
};

import { Response } from "express";
import { User } from "@/models/user";
import { IUserDocument, RequestUserAuth } from "@types";

export const getUserProfile = async (req: RequestUserAuth, res: Response) => {
  const userId = req.user?.id;

  const userDB = await User.findById(userId, {
    password: 0,
    __v: 0,
  }).populate("ranges", { __v: 0 });

  return res.send({ userDetails: userDB });
};

export const editUserProfile = async (req: RequestUserAuth, res: Response) => {
  const userId = req.user?.id;

  let user;
  const oldPassword = req.body.oldPassword,
    newPassword = req.body.newPassword;

  const update = {
    firstname: req.body.firstname,
    surname: req.body.surname,
    birthday: req.body.birthday,
    country: req.body.country,
    gender: req.body.gender,
    nickColor: req.body.nickColor,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };

  try {
    user = await User.findByIdAndUpdate(userId, update, { new: true });
    if (req.body.oldPassword && user)
      await changePassword(user, oldPassword, newPassword);

    res.status(201).send({ message: "Succesfully edited profile" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Can't edit profile" });
  }
};

async function changePassword(
  user: IUserDocument,
  oldPassword: string,
  newPassword: string
) {
  user.comparePassword(
    oldPassword,
    async function (err: Error, isMatch: boolean) {
      if (err) console.log(err);
      else if (isMatch) {
        user.password = newPassword;
        await user.save();
      } else {
        console.log("Cant change not same passwords");
      }
    }
  );
}

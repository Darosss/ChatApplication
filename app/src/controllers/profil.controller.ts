import { Request, Response } from "express";
import { User, IUser } from "@/models/user";

export const getUserProfile = async (req: Request, res: Response) => {
  const userDB = await User.findById(req.params.userId, {
    password: 0,
    __v: 0,
  }).populate("ranges");
  return res.send({ userDetails: userDB });
};

export const editUserProfile = async (req: Request, res: Response) => {
  let user;
  const oldPassword = req.body.oldPassword,
    newPassword = req.body.newPassword;

  const filter = req.params.userId;
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
    user = await User.findByIdAndUpdate(filter, update, { new: true });
    if (req.body.oldPassword && user)
      await changePassword(user, oldPassword, newPassword);

    res.status(201).send({ message: "Succesfully edited profile" });
  } catch (e) {
    res.status(400).send({ message: "Can't edit profile" });
  }
};

async function changePassword(
  user: IUser,
  oldPassword: string,
  newPassword: string
) {
  user.comparePassword(oldPassword, async function (err, isMatch) {
    if (err) console.log(err);
    else if (isMatch) {
      user.password = newPassword;
      await user.save();
    } else {
      console.log("Cant change not same passwords");
    }
  });
}

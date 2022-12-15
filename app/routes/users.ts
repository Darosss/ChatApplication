import express, { Request, Response } from "express";
import { User } from "../models/user";
import { Range } from "../models/range";
import { ChatRoom } from "../models/chatRoom";
import isAdmin from "./middlewares/isAdmin";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  let users;
  try {
    users = await User.find({}, { password: 0, __v: 0 });
    res.send({ usersList: users });
  } catch {
    res.send({ message: "Can't get users" });
  }
});

//Get user by id
router.get("/:userId", async (req: Request, res: Response) => {
  const userEdit = await User.findById(req.params.userId, {
    password: 0,
    __v: 0,
    createdAt: 0,
  });
  const ranges = await Range.find({});
  const chatRooms = await ChatRoom.find({ createdBy: userEdit?.id });
  res.send({
    user: userEdit,
    ranges: ranges,
    chatRooms: chatRooms,
  });
});

//Edit user by id route
router.post("/edit/:userId", isAdmin, async (req: Request, res: Response) => {
  const body = req.body;
  const update = {
    username: body.username,
    firstname: body.firstname,
    surname: body.surname,
    country: body.country,
    gender: body.gender,
    nickColor: body.nickColor,
    email: body.email,
    phoneNumber: body.phoneNumber,
    ranges: body.ranges,
  };
  try {
    await User.findByIdAndUpdate(req.params.userId, update);
    res.send({ message: "User edited" });
  } catch (e) {
    res.send({ message: "Can't edit user" });
    console.log(e);
  }
});

//Ban user by id route
router.post("/ban/:userId/", isAdmin, async (req: Request, res: Response) => {
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
    await User.findByIdAndUpdate(req.params.userId, update);
    res.send({ message: "User banned" });
  } catch (e) {
    //Fe. add validation if admin want to ban admin or sth like that
    res.send({ message: "User can't be banned" });
  }
});

//Unban user by id route
router.post("/unban/:userId", isAdmin, async (req: Request, res: Response) => {
  const update = {
    isBanned: false,
  };
  try {
    await User.findByIdAndUpdate(req.params.userId, update);
    res.send({ message: "User unbanned" });
  } catch (e) {
    res.send({ message: "User can't be unbanned" });
    console.log(e);
  }
});

export default router;

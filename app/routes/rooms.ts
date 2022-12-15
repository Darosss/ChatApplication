import express, { Request, Response } from "express";
import { ChatRoom } from "../models/chatRoom";
import { User } from "../models/user";
import { Range } from "../models/range";
import chatRoomValidation from "./middlewares/chatRoomValidation";
import { RequestUserAuth } from "../@types/types";

const router = express.Router();

router.get("/", async (req: RequestUserAuth, res: Response) => {
  const userId = req.user?.id;
  let usersChatRooms: Array<string>;

  try {
    usersChatRooms = await ChatRoom.find({ createdBy: userId })
      .populate("createdBy", "_id username")
      .populate("availableRanges", "_id name");

    res.send({ usersRooms: usersChatRooms });
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", async (_req: Request, res: Response) => {
  const ranges = await Range.find({});
  const users = await User.find({}, "_id username"); //TODO this add to method model user
  res.status(200).send({ availableRanges: ranges, usersList: users });
});

//Create new chatroom
router.post("/create", async (req: RequestUserAuth, res: Response) => {
  const createdBy = req.user;
  const name = req.body.roomName;
  const ranges = req.body.availableRanges;
  const room = new ChatRoom({
    name: name,
    availableRanges: ranges,
    allowedUsers: req.body.allowedUsers,
    bannedUsers: req.body.bannedUsers,
    createdBy: createdBy?.id,
  });

  try {
    await room.save();
    res.status(201).send({ message: "Room created succesfully!" });
  } catch (error) {
    res.status(400).send({ message: "Cannot create room!" });
  }
});

//Get chatroom by id
router.get("/:roomId", async (req: Request, res: Response) => {
  const ranges = await Range.find({}, "_id name");
  const users = await User.find({}, "_id username"); //TODO this add to method model user
  const chatRoomEdit = await ChatRoom.findById(req.params.roomId);
  res.send({
    chatRoom: chatRoomEdit,
    availableRanges: ranges,
    usersList: users,
  });
});

//Edit chatroom by id route
router.post(
  "/:roomId",
  chatRoomValidation,
  async (req: Request, res: Response) => {
    const roomIdParam = req.params.roomId;
    const update = {
      name: req.body.roomName,
      availableRanges: req.body.availableRanges,
      allowedUsers: req.body.allowedUsers,
      bannedUsers: req.body.bannedUsers,
    };
    try {
      await ChatRoom.findByIdAndUpdate(roomIdParam, update).then(() => {
        res.send({ message: "Successfully edited room" });
      });
    } catch (err) {
      res.send({ message: "Can't edit room" });
      console.log(err);
    }
  }
);

router.get(
  "/delete/:roomId",
  chatRoomValidation,
  async (req: Request, res: Response) => {
    await ChatRoom.findById(req.params.roomId).then((room) => {
      res.send({ chatRoomDelete: room });
    });
  }
);

// Remove chatroom route
router.delete(
  "/delete/:roomId",
  chatRoomValidation,
  async (req: Request, res: Response) => {
    const room = await ChatRoom.findById(req.params.roomId);
    try {
      await room?.remove();
      res.status(201).send({ message: "Succesfully removed room" });
    } catch {
      res.status(403).send({ message: "Can't remove room" });
    }
  }
);

export default router;

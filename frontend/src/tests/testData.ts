import { faker } from "@faker-js/faker";
import { IAuth, IChatRoomRes, IMessagesRes, IRangeRes, IUserRes } from "@src/@types/types";
import { MessageSocket } from "../../../app/src/socket";

export const getAuthData = (opts?: { admin?: boolean; isBanned?: boolean }): IAuth => {
  const auth: IAuth = {
    id: faker.database.mongodbObjectId(),
    username: faker.internet.userName(),
    exp: faker.number.int(),
    iat: faker.number.int(),
    administrator: opts?.admin || false,
    isBanned: opts?.isBanned || false,
  };

  return auth;
};

export const getStrongPassword = (): string => {
  return faker.internet.password({
    length: 30,
    memorable: false,
    pattern: /\w/,
    prefix: "!Za3",
  });
};
export const getRangeData = (userData: IUserRes): IRangeRes => {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.word.adjective(),
    createdBy: userData,
    createdAt: faker.date.anytime(),
  };
};

export const getUserData = (rangeData?: IRangeRes[]): IUserRes => {
  return {
    _id: faker.database.mongodbObjectId(),
    createdAt: faker.date.anytime(),
    isBanned: false,
    ranges: rangeData || [],
    username: faker.internet.userName({ firstName: "Random" }),
    email: faker.internet.email(),
    firstname: faker.person.firstName(),
    surname: faker.person.lastName(),
    birthday: faker.date.anytime(),
    gender: faker.person.sex(),
    country: faker.location.country(),
    nickColor: faker.color.human(),
    phone: faker.phone.number("#########"),
  };
};

export const getRoomData = (
  availableRanges?: string[],
  allowedUsers?: string[],
  bannedUsers?: string[],
): IChatRoomRes => {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.word.adjective(),
    availableRanges: availableRanges || [],
    allowedUsers: allowedUsers || [],
    bannedUsers: bannedUsers || [],
    createdBy: faker.database.mongodbObjectId(),
  };
};

export const getMessageSocketData = (): MessageSocket => {
  return {
    roomId: faker.database.mongodbObjectId(),
    userId: faker.database.mongodbObjectId(),
    message: faker.word.words(),
    sender: faker.person.firstName(),
    date: new Date(),
  };
};

export const getMessageData = (): IMessagesRes => {
  return {
    _id: faker.database.mongodbObjectId(),
    whereSent: getRoomData(),
    sentTime: new Date(),
    roomId: faker.database.mongodbObjectId(),
    message: faker.word.words(),
    sender: getUserData(),
  };
};

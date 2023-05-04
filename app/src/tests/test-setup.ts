import { User } from "@/models/user";
import mongoose from "mongoose";
import { afterAll, afterEach, beforeAll, beforeEach } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getFakerUserData } from "./helpers/userData";
import { getCookiesToken } from "./helpers/userCookiesToken";

export const userData = getFakerUserData();
export const adminUserData = {
  ...getFakerUserData(),
  administrator: true,
};
export const userCookiesToken = getCookiesToken(userData.username);
export const userAdminCookiesToken = getCookiesToken(adminUserData.username);

export let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  const user = new User(userData);
  const userAdmin = new User(adminUserData);
  await user.save();
  await userAdmin.save();
});

afterEach(async () => {
  await User.deleteMany({});
});

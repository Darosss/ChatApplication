import request from "supertest";
import { app } from "app";

import { describe, it, beforeEach, afterEach } from "@jest/globals";

import {
  adminUserData,
  userAdminCookiesToken,
  userCookiesToken,
} from "../test-setup";
import { ChatRoom } from "@/models/chatRoom";
import { faker } from "@faker-js/faker";

const chatRoomData = {
  _id: faker.database.mongodbObjectId(),
  name: faker.name.firstName(),
  createdBy: adminUserData._id,
};

beforeEach(async () => {
  await new ChatRoom(chatRoomData).save();
});

afterEach(async () => {
  await ChatRoom.deleteMany({});
});

describe("rooms api", () => {
  describe("GET /api/v1/rooms", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get("/api/v1/rooms")
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get("/api/v1/rooms")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });

  describe("GET /api/v1/rooms/users-rooms", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get(`/api/v1/rooms/users-rooms`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get(`/api/v1/rooms/users-rooms`)
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("POST /api/v1/rooms/create", () => {
    it("should respond with status code 201", function (done) {
      request(app)
        .post(`/api/v1/rooms/create`)
        .send({
          name: faker.name.firstName(),
          availableRanges: [],
          allowedUsers: [],
          bannedUsers: [],
        })
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
    it("should respond with status code 400 with no data", function (done) {
      request(app)
        .post(`/api/v1/rooms/create`)
        .send({})
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .post(`/api/v1/rooms/create`)
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("DELETE /api/v1/rooms/delete/:_id", () => {
    it("should respond with status code 200 as room owner", function (done) {
      request(app)
        .delete(`/api/v1/rooms/delete/${chatRoomData._id}`)
        .set("Cookie", userAdminCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 403 as room member", function (done) {
      request(app)
        .delete(`/api/v1/rooms/delete/${chatRoomData._id}`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(403, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .delete(`/api/v1/rooms/delete/${chatRoomData._id}`)
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("GET /api/v1/rooms/:_id", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get(`/api/v1/rooms/${chatRoomData._id}`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 400 with wrong id", function (done) {
      request(app)
        .get(`/api/v1/rooms/wrongId`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get(`/api/v1/rooms/${chatRoomData._id}`)
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("GET /api/v1/rooms/:_id/messages", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get(`/api/v1/rooms/${chatRoomData._id}/messages`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 400 with wrong id", function (done) {
      request(app)
        .get(`/api/v1/rooms/wrongId/messages`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get(`/api/v1/rooms/${chatRoomData._id}/messages`)
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("PATCH /api/v1/rooms/:_id/messages", () => {
    it("should respond with status code 200 as user owner", function (done) {
      request(app)
        .patch(`/api/v1/rooms/edit/${chatRoomData._id}`)
        .set("Cookie", userAdminCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 403 as user member", function (done) {
      request(app)
        .patch(`/api/v1/rooms/edit/${chatRoomData._id}`)
        .set("Cookie", userAdminCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 400 with wrong id", function (done) {
      request(app)
        .patch(`/api/v1/rooms/edit/wrongId`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .patch(`/api/v1/rooms/edit/${chatRoomData._id}`)
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
});

import request from "supertest";
import app from "app";

import { describe, it } from "@jest/globals";

import {
  userAdminCookiesToken,
  userCookiesToken,
  userData,
} from "../test-setup";

describe("users api", () => {
  describe("GET /api/v1/users", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get("/api/v1/users")
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get("/api/v1/users")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });

  describe("GET /api/v1/users/:_id", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get(`/api/v1/users/${userData._id}`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 400 with wrong Id", function (done) {
      request(app)
        .get(`/api/v1/users/wrongID`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get(`/api/v1/users/${userData._id}`)
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("GET /api/v1/users/rooms/:_id", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get(`/api/v1/users/rooms/${userData._id}`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 400 with wrong Id", function (done) {
      request(app)
        .get(`/api/v1/users/rooms/wrongID`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get(`/api/v1/users/rooms/${userData._id}`)
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("PATCH /api/v1/users/admin", () => {
    describe("PATCH /ban/:_id", () => {
      it("should respond with status code 200 as admin", function (done) {
        request(app)
          .patch(`/api/v1/users/admin/ban/${userData._id}`)
          .set("Cookie", userAdminCookiesToken)
          .expect("Content-Type", /json/)
          .expect(200, done);
      });
      it("should respond with status code 403 as non admin", function (done) {
        request(app)
          .patch(`/api/v1/users/admin/ban/${userData._id}`)
          .set("Cookie", userCookiesToken)
          .expect("Content-Type", /json/)
          .expect(403, done);
      });
      it("should respond with status code 401 as logged out user", function (done) {
        request(app)
          .patch(`/api/v1/users/admin/ban/${userData._id}`)
          .expect("Content-Type", /json/)
          .expect(401, done);
      });
    });
    describe("PATCH /unban/:_id", () => {
      it("should respond with status code 200 as admin", function (done) {
        request(app)
          .patch(`/api/v1/users/admin/unban/${userData._id}`)
          .set("Cookie", userAdminCookiesToken)
          .expect("Content-Type", /json/)
          .expect(200, done);
      });
      it("should respond with status code 403 as non admin", function (done) {
        request(app)
          .patch(`/api/v1/users/admin/unban/${userData._id}`)
          .set("Cookie", userCookiesToken)
          .expect("Content-Type", /json/)
          .expect(403, done);
      });
      it("should respond with status code 401 as logged out user", function (done) {
        request(app)
          .patch(`/api/v1/users/admin/unban/${userData._id}`)
          .expect("Content-Type", /json/)
          .expect(401, done);
      });
    });
  });
});

import request from "supertest";
import { app } from "app";

import { describe, it } from "@jest/globals";

import { userCookiesToken, userData } from "../test-setup";

describe("profil api", () => {
  describe("GET /api/v1/profil", () => {
    it("should respond with status code 200 as logged user", function (done) {
      request(app)
        .get("/api/v1/profil")
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get("/api/v1/profil")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });

  describe("PATCH /api/v1/profil/edit", () => {
    it("should respond with status code 200 ", function (done) {
      request(app)
        .patch("/api/v1/profil/edit")
        .send(userData)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 400 with bad old password ", function (done) {
      request(app)
        .patch("/api/v1/profil/edit")
        .send({ ...userData, oldPassword: "wrong old password" })
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 400 with weak new password ", function (done) {
      request(app)
        .patch("/api/v1/profil/edit")
        .send({ ...userData, newPassword: "weakpassword" })
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user ", function (done) {
      request(app)
        .patch("/api/v1/profil")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
});

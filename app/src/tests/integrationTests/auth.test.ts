import request from "supertest";
import { app } from "app";

import { describe, it, expect, afterEach } from "@jest/globals";

import { userCookiesToken, userData } from "../test-setup";
import { User } from "@/models/user";

const registerUser = { ...userData, username: "registerUser" };

afterEach(async () => {
  await User.findOneAndDelete({ username: registerUser.username });
});

describe("authentication api", () => {
  describe("POST /api/v1/login", () => {
    it("should respond with status code 200 with correct credentials", function (done) {
      request(app)
        .post("/api/v1/login")
        .send({
          username: userData.username,
          password: userData.password,
        })
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 401 with wrong password", function (done) {
      request(app)
        .post("/api/v1/login")
        .send({
          username: userData.username,
          password: "badpassword",
        })
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
    it("should respond with status code 401 with wrong username", function (done) {
      request(app)
        .post("/api/v1/login")
        .send({
          username: "nonexisting",
          password: userData.password,
        })
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });

  describe("POST /api/v1/register", () => {
    it("should respond with status code 201 with strong password", function (done) {
      request(app)
        .post("/api/v1/register")
        .send({ ...userData, username: "registerUser" })
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
    it("should respond with status code 400 with weak password", function (done) {
      request(app)
        .post("/api/v1/register")
        .send({
          ...userData,
          username: "registerUser",
          password: "weakpassword",
        })
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 400 with wrong username", function (done) {
      request(app)
        .post("/api/v1/register")
        .send({
          ...userData,
          username: "  ",
        })
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 400 with wrong email", function (done) {
      request(app)
        .post("/api/v1/register")
        .send({
          ...userData,
          email: "wrongmail",
        })
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 400 with wrong phone number", function (done) {
      request(app)
        .post("/api/v1/register")
        .send({
          ...userData,
          phoneNumber: "12",
        })
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
  });

  describe("POST /api/logout", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .post("/api/v1/logout")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
  describe("GET /api/session", () => {
    it("should respond with status code 200 as logged user", function (done) {
      request(app)
        .get("/api/v1/session")
        .expect("Content-Type", /json/)
        .withCredentials(true)
        .set("Cookie", userCookiesToken)
        .send()
        .expect(200, done);
    });

    it("should respond with status code 401", function (done) {
      request(app)
        .get("/api/v1/session")
        .expect("Content-Type", /json/)
        .expect(401)
        .then((response) => {
          expect(response.body).toBe(false);
          done();
        });
    });
  });
});

import request from "supertest";
import app from "app";

import { describe, it, beforeEach, afterEach } from "@jest/globals";

import {
  adminUserData,
  userAdminCookiesToken,
  userCookiesToken,
} from "../test-setup";
import { Range } from "@/models/range";
import { faker } from "@faker-js/faker";

const rangeData = {
  _id: faker.database.mongodbObjectId(),
  name: faker.name.firstName(),
  createdBy: adminUserData._id,
};

beforeEach(async () => {
  await new Range(rangeData).save();
});

afterEach(async () => {
  await Range.deleteMany({});
});

describe("ranges api", () => {
  describe("GET /api/v1/ranges", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get("/api/v1/ranges")
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get("/api/v1/ranges")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("POST /api/v1/ranges/admin/create", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .post("/api/v1/ranges/admin/create")
        .send({ name: faker.name.firstName() })
        .set("Cookie", userAdminCookiesToken)
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
    it("should respond with status code 403 as non admin", function (done) {
      request(app)
        .post("/api/v1/ranges/admin/create")
        .send({ name: faker.name.firstName() })
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(403, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .post("/api/v1/ranges/admin/create")
        .send({ name: faker.name.firstName() })
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("GET /api/v1/ranges/:_id", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .get(`/api/v1/ranges/${rangeData._id}`)
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 400 with wrong Id", function (done) {
      request(app)
        .get("/api/v1/ranges/wrongId")
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .get("/api/v1/ranges/:_id")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
  describe("PATCH /api/v1/ranges/admin/edit/:_id", () => {
    it("should respond with status code 200", function (done) {
      request(app)
        .patch(`/api/v1/ranges/admin/edit/${rangeData._id}`)
        .send({ name: faker.name.firstName() })
        .set("Cookie", userAdminCookiesToken)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("should respond with status code 403 as non admin", function (done) {
      request(app)
        .patch(`/api/v1/ranges/admin/edit/${rangeData._id}`)
        .send({ name: faker.name.firstName() })
        .set("Cookie", userCookiesToken)
        .expect("Content-Type", /json/)
        .expect(403, done);
    });
    it("should respond with status code 400 with wrong Id", function (done) {
      request(app)
        .patch("/api/v1/ranges/admin/edit/wrongId")
        .send({ name: faker.name.firstName() })
        .set("Cookie", userAdminCookiesToken)
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should respond with status code 401 as logged out user", function (done) {
      request(app)
        .patch("/api/v1/ranges/admin/edit/:_id")
        .send({ name: faker.name.firstName() })
        .expect("Content-Type", /json/)
        .expect(401, done);
    });
  });
});

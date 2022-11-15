const app = require("../app.js");
let session = require("supertest-session");

const mongoose = require("mongoose");
const user = require("../models/user");
const chatRoom = require("../models/chatRoom");
const range = require("../models/range");

let unauthorizedSession = null;

let accDetails = {
  firstname: "firstname",
  surname: "surname",
  birthday: "1999-12-12",
  country: "poland",
  gender: "male",
  nickColor: "red",
  email: "email",
  phoneNumber: "phone",
};
let adminCredentials = {
  username: "adminTestJest",
  password: "adminTestJest",
  administrator: true,
};
let userCredentials = { username: "userTestJest", password: "userTestJest" };
let adminId;
let userId;

beforeAll(async () => {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

  await new user(Object.assign(adminCredentials, accDetails))
    .save()
    .then((admin) => {
      adminId = admin.id;
    })
    .catch((err) => {
      console.log("LUl");
    });
  await new user(Object.assign(userCredentials, accDetails))
    .save()
    .then((user) => {
      userId = user.id;
    })
    .catch((err) => {
      console.log("LUl");
    });
});

afterAll(async () => {
  await user.findOneAndDelete({ username: adminCredentials.username });
  await user.findOneAndDelete({ username: userCredentials.username });
  mongoose.disconnect();
});

beforeEach(async () => {
  unauthorizedSession = session(app);
});

describe("routes", function () {
  let authenticatedSession;
  let authenticatedSessionAdmin;

  beforeAll(function (done) {
    //create two sessions (normal user and admin)
    authenticatedSession = session(app);
    authenticatedSessionAdmin = session(app);

    authenticatedSession
      .post("/api/v1/login")
      .send(userCredentials)
      .expect(200)
      .end(done);

    authenticatedSessionAdmin
      .post("/api/v1/login")
      .send(adminCredentials)
      .expect(200)
      .end(done);
  });

  describe("/register route", function () {
    let registerUserCredentials = {
      username: "testUserRegisterJest",
      password: "test",
    };
    afterAll(async () => {
      //delete user after tests
      await user.findOneAndDelete({
        username: registerUserCredentials.username,
      });
    });

    it("should register new user", function (done) {
      unauthorizedSession
        .post("/api/v1/register")
        .send(Object.assign(registerUserCredentials, accDetails))
        .expect(201)
        .end(done);
    });
  });

  describe("/chats route", function () {
    describe("/chats authenticated", function () {
      it("should return user's rooms and msgs", function (done) {
        authenticatedSession
          .get("/api/v1/chats")
          .expect(200)
          .expect("Content-Type", /json/)
          .end(done);
      });
    });

    describe("/chats not authenticated", function () {
      it("should fail accesing chats route", function (done) {
        unauthorizedSession.get("/api/v1/chats").expect(401).end(done);
      });
    });
  });

  describe("/profil route", function () {
    describe("/profil route authenticated", function () {
      it("should return user profile", function (done) {
        authenticatedSession
          .get(`/api/v1/profil/${userId}`)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(done);
      });

      it("should succesfully edit user's profile", function (done) {
        authenticatedSession
          .post(`api/v1/profil/${userId}`)
          .send(accDetails)
          .expect(201)
          .expect("Content-Type", /json/)
          .end(done);
      });

      it("should succesfully edit user's with same passwords profile", function (done) {
        authenticatedSession
          .post(`api/v1/profil/${userId}`)
          .send(accDetails)
          .expect(201)
          .expect("Content-Type", /json/)
          .end(done);
      });
      it("should fail edit other user profile", function (done) {
        authenticatedSession
          .post(`api/v1/profil/${adminId}`)
          .send(accDetails)
          .expect(403)
          .expect("Content-Type", /json/)
          .end(done);
      });
    });
    describe("/profile not authenticated", function () {
      it("should fail accesing (GET and POST) profil route", function (done) {
        unauthorizedSession
          .get(`/api/v1/profil/${userId}`)
          .expect(401)
          .end(done);
        unauthorizedSession
          .post(`api/v1/profil/${userId}`)
          .expect(401)
          .end(done);
      });
    });
  });

  describe("/rooms route", function () {
    let roomId;
    let newRoomDetails = {
      roomName: "testRoomJest",
      availableRanges: [],
      bannedUsers: [],
      allowedUsers: [],
    };

    afterAll(async () => {
      //delete room if exist when tests fails
      await chatRoom.findOneAndDelete({ name: newRoomDetails.roomName });
    });

    describe("/rooms authenticated", function () {
      it("should return user's rooms", function (done) {
        authenticatedSession
          .get("/api/v1/rooms")
          .expect(200)
          .expect("Content-Type", /json/)
          .end(done);
      });

      it("should get available ranges and users", function (done) {
        authenticatedSession
          .get("/api/v1/rooms/create")
          .expect(200)
          .expect("Content-Type", /json/)
          .end(done);
      });

      it("should create new room", function (done) {
        authenticatedSession
          .post("/api/v1/rooms/create")
          .send(newRoomDetails)
          .expect(201)
          .expect("Content-Type", /json/)
          .end(function (err) {
            chatRoom.findOne(
              { name: newRoomDetails.roomName },
              function (err, data) {
                if (err) return err;
                roomId = data.id;
                //assign room id for operations
                done();
              }
            );
          });
      });

      it("should return bad request for create existing room", function (done) {
        authenticatedSession
          .post("/api/v1/rooms/create")
          .send(newRoomDetails)
          .expect(400)
          .expect("Content-Type", /json/)
          .end(done);
      });

      it("should get room by id", function (done) {
        authenticatedSession
          .get(`/api/v1/rooms/${roomId}`)
          .expect(200)
          .end(done);
      });

      it("should delete room by id", function (done) {
        authenticatedSession
          .delete(`api/v1/rooms/delete/${roomId}`)
          .expect(201)
          .end(done);
      });
    });

    describe("/rooms not authenticated", function () {
      it("should fail accesing every rooms route", function (done) {
        unauthorizedSession.get("/api/v1/rooms").expect(401);
        unauthorizedSession.get("/api/v1/rooms/create").expect(401);
        unauthorizedSession.post("/api/v1/rooms/create").expect(401);
        unauthorizedSession.get(`/api/v1/rooms/${roomId}`).expect(401);
        unauthorizedSession.post(`api/v1/rooms/${roomId}`).expect(401);
        unauthorizedSession.get(`/api/v1/rooms/${roomId}`).expect(401);
        unauthorizedSession
          .delete(`api/v1/rooms/${roomId}`)
          .expect(401)
          .end(done);
      });
    });
  });

  describe("/ranges route", function () {
    let rangeId;
    let newRangeDetails = {
      name: "testRangeJest",
    };

    afterAll(async () => {
      // delete range if exist when tests fails
      await range.findOneAndDelete({ name: newRangeDetails.name });
    });

    describe("/ranges as admin", function () {
      it("should create new range", function (done) {
        authenticatedSessionAdmin
          .post("/api/v1/ranges/create")
          .send(newRangeDetails)
          .expect(201)
          .end(function (err) {
            range.findOne({ name: newRangeDetails.name }, function (err, data) {
              if (err) return err;
              rangeId = data.id;
              //assign range id for operations
              done();
            });
          });
      });

      it("should get range by id", function (done) {
        authenticatedSessionAdmin
          .get(`/api/v1/ranges/${rangeId}`)
          .expect(200)
          .end(done);
      });

      it("should edit range by id", function (done) {
        authenticatedSessionAdmin
          .post(`api/v1/ranges/edit/${rangeId}`)
          .send(newRangeDetails)
          .expect(200)
          .end(done);
      });

      it("should remove range by id", function (done) {
        authenticatedSessionAdmin
          .delete(`api/v1/ranges/delete/${rangeId}`)
          .expect(200)
          .end(done);
      });
    });

    describe("/ranges authenticated", function () {
      it("should access range routes", function (done) {
        authenticatedSession.get("/api/v1/ranges").expect(200).end(done);
      });

      it("should fail accesing forbidden range routes", function (done) {
        authenticatedSession
          .post("/api/v1/ranges/create")
          .expect(403)
          .end(done);
        authenticatedSession
          .get(`/api/v1/ranges/${rangeId}`)
          .expect(403)
          .end(done);
        authenticatedSession
          .post(`api/v1/ranges/edit/${rangeId}`)
          .expect(403)
          .end(done);
        authenticatedSession
          .delete(`api/v1/ranges/delete/${rangeId}`)
          .expect(403)
          .end(done);
      });
    });
    describe("/ranges not authenticated", function () {
      it("should fail accesing every ranges route", function (done) {
        unauthorizedSession.get("/api/v1/ranges").expect(401).end(done);
        unauthorizedSession.post("/api/v1/ranges/create").expect(401).end(done);
        unauthorizedSession
          .get(`/api/v1/ranges/${rangeId}`)
          .expect(401)
          .end(done);
        unauthorizedSession
          .get(`/api/v1/ranges/edit/${rangeId}`)
          .expect(401)
          .end(done);
        unauthorizedSession
          .get(`/api/v1/ranges/delete/${rangeId}`)
          .expect(401)
          .end(done);
      });
    });
  });

  describe("/users route", function () {
    describe("/users as admin", function () {
      it("should edit user", function (done) {
        authenticatedSessionAdmin
          .post(`api/v1/users/edit/${userId}`)
          .send(accDetails)
          .expect(200)
          .end(done);
      });

      it("should ban user by id", function (done) {
        authenticatedSessionAdmin
          .post(`api/v1/users/ban/${userId}`)
          .expect(200)
          .end(done);
      });

      it("should unban user by id", function (done) {
        authenticatedSessionAdmin
          .post(`api/v1/users/unban/${userId}`)
          .expect(200)
          .end(done);
      });
    });

    describe("/users authenticated", function () {
      it("should access all users list", function (done) {
        authenticatedSession.get("/api/v1/users").expect(200).end(done);
      });

      it("should access profile of other user", function (done) {
        authenticatedSession.get("/api/v1/users").expect(200).end(done);
      });

      it("should fail accesing forbidden users routes", function (done) {
        authenticatedSession
          .post(`api/v1/users/edit/${adminId}`)
          .expect(403)
          .end(done);
        authenticatedSession
          .post(`api/v1/users/ban/${adminId}`)
          .expect(403)
          .end(done);
        authenticatedSession
          .post(`api/v1/users/unban/${adminId}`)
          .expect(403)
          .end(done);
      });
    });
    describe("/ranges not authenticated", function () {
      it("should fail accesing every users route", function (done) {
        unauthorizedSession.get("/api/v1/users").expect(401).end(done);
        unauthorizedSession
          .get(`/api/v1/users/${adminId}`)
          .expect(401)
          .end(done);
        unauthorizedSession
          .post(`api/v1/users/edit/${adminId}`)
          .expect(401)
          .end(done);
        unauthorizedSession
          .post(`api/v1/users/ban/${adminId}`)
          .expect(401)
          .end(done);
        unauthorizedSession
          .post(`api/v1/users/unban/${adminId}`)
          .expect(401)
          .end(done);
      });
    });

    describe("/logout route", function () {
      it("should logout user", function (done) {
        authenticatedSession.post("/api/v1/logout").expect(200).end(done);
      });
    });
  });
});

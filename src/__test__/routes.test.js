const express = require("express");
const srcRoute = require("../api/app");
const config = require("../config/index");
const mongoose = require("mongoose");
const request = require("supertest");
const passport = require("passport");

let token = "";

const app = express();
mongoose.set("strictQuery", false);
const mongoDB = config.mongoUri;
mongoose.connect("mongodb://127.0.0.1/testDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(srcRoute);

describe("user Authentication", () => {
  it("POST /signup --> to register new user", async () => {
    const { body, status } = await request(app).post("/signup").send({
      username: "amit kumar",
      email: "amit@gmail.com",
      password: "123456",
    });
    expect(status).toBe(201);
  });

  it("POST /login --> For user login", async () => {
    const { body, status } = await request(app).post("/login").send({
      email: "amit@gmail.com",
      password: "123456",
    });
    token = body.userData.token;
    expect(status).toBe(201);
  });

  it("POST /signup --> DEMO", async () => {
    const { body, status } = await request(app).post("/signup");
    expect(status).toBe(500);
  });
});

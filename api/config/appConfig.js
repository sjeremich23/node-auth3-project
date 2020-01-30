const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session"); // install

const sessionConfig = require("./sessionConfig");

module.exports = app => {
  app.use(logger("dev"));
  app.use(helmet());
  app.use(session(sessionConfig)); // turn on sessions
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
};

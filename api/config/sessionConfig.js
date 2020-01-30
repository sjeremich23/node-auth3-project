const session = require("express-session"); // install
const KnexSessionStore = require("connect-session-knex")(session);

const dbConnection = require("../../database/dbConfig");

module.exports = {
  name: "trackpad life",
  // secret is used for cookie encryption
  secret:
    process.env.SESSION_SECRET || "monsoon demons are messing with my gutters",
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    secure: false, // set to true in production, only send cookies over HTTPS
    httpOnly: true // JS cannot access the cookies on the browser
  },
  resave: false,
  saveUninitialized: true, // read about it for GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60000
  })
};

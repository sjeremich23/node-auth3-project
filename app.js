const express = require("express");

const createError = require("http-errors");
const appConfig = require("./api/config/appConfig");
const authentication = require("./middlewares/authentication");

const indexRouter = require("./bin");
const usersRouter = require("./api/routes/users");
const authRouter = require("./api/auth/auth-router");

const app = express();

appConfig(app);

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authentication, authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res
    .status(err.status || 500)
    .json(`WHY THE HELL DID I RECIEVE A ${err.status} ERROR`);
});

module.exports = app;

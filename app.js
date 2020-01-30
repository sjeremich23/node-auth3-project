const express = require("express");

const createError = require("http-errors");
const appConfig = require("./api/config/appConfig");

const indexRouter = require("./bin");
const usersRouter = require("./api/routes/users");

const app = express();

appConfig(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

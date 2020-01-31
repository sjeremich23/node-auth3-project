const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("auth", authorization);

  if (authorization) {
    const secret = process.env.JWT_SECRET;
    console.log("secret", secret);

    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.token = decodedToken;

        next();
      }
    });
  } else {
    res.status(400).json({ validateLogin: "Please login and try again" });
  }
};

// const jwt = require("jsonwebtoken");
// const { jwtSecret } = require("../config/secrets");

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   console.log("auth", authorization);

//   if (authorization) {
//     jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({ you: "shall not pass!" });
//       } else {
//         req.token = decodedToken;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ validateLogin: "Please login and try again" });
//   }
// };

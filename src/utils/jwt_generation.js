const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const jwtGeneration = (id = -1) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: "8h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("Token no fue generado.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { jwtGeneration };

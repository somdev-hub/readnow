/**
 * @file authController.js
 * @description Authentication Controller for handling authentication.
 * @module Authentication Controller
 *
 * @requires bcrypt Bcrypt for hashing passwords.
 * @requires User User model for database.
 * @requires jwt Json Web Token for handling authentication.
 * @requires dotenv Dotenv for handling environment variables.
 *
 * @exports authenticationController
 * @exports decodeUserController
 *
 */

const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @function authenticationController
 * @description Controller for authenticating user.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.password - User's password.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object with status and message.
 *
 * @example
 * // POST /auth
 * // Request body: { "email": "user@example.com", "password": "password123" }
 * // Returns: { "status": 200, "message": "User authenticated successfully", "token": "jwt_token" }
 *
 * @throws {500} If there is a server error.
 * @throws {401} If the credentials are invalid.
 * @throws {404} If the user is not found.
 */
const authenticationController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // the user object is searched in the database using the email provided by the user with case insensitivity
    const user = await User.findOne({
      email: { $regex: new RegExp(email, "i") }
    });
    // if the user is not found, return 404 status code
    if (!user) {
      return res.send({
        status: 404,
        message: "User not found"
      });
    }
    // if the user is found, compare the password provided by the user with the password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    // if the passwords do not match, return 401 status code
    if (!isMatch) {
      return res.send({
        status: 401,
        message: "Invalid credentials"
      });
    }
    // if the passwords match, sign a jwt token and return it to the user
    jwt.sign(
      { user: user },
      process.env.JWT_SECRET,
      // the token expires in 1 hour
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.send({
            status: 500,
            message: "Server error"
          });
        } else {
          return res.send({
            status: 200,
            message: "User authenticated successfully",
            token: token
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Server error"
    });
  }
};

/**
 * @function decodeUserController
 * @description Controller for decoding user.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.token - User's token.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object with status, message and decoded user.
 *
 * @example
 * // POST /auth/decode
 *
 * @throws {500} If there is a server error.
 * @throws {401} If the token is invalid.
 * @throws {200} If the token is valid.
 *
 */
const decodeUserController = async (req, res) => {
  const { token } = req.body;
  try {
    // verify the token provided by the user
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        // if the token is invalid, return 401 status code
        res.send({
          status: 401,
          message: err
        });
      } 
      // if the token is valid, return 200 status code with decoded user
      else {
        res.send({
          status: 200,
          message: "User decoded successfully",
          data: decoded
        });
      }
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Server error"
    });
  }
};

module.exports = {
  authenticationController,
  decodeUserController
};

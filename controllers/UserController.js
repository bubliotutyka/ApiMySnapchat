const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailValidator = require('email-validator');
const User = require('../models/UserModel');

class UserController {
  static async login(req, res) {
    const {email, password} = req.fields;

    if (!emailValidator.validate(email)) {
      res.status(400).send({"error": "invalid email"});
    } else {
      const user = await User.getByEmail(email);

      if (user === "error") {
        res.status(400).send({"error": "Login failed"});
      } else {
        if (!user) {
          res.status(403).send({"error": "User not exist !"})
        } else if (bcrypt.compareSync(password, user.password)) {
          res.status(200).send({
            token : jwt.sign({
              id: user._id,
              email: user.email,
              username: user.username,
            }, "oui", {expiresIn: "31d"})
          });
        } else {
          res.status(200).send({"error": "Wrong password !"})
        }
      }
    }
  }

  static async register(req, res) {
    const {email, password, cpassword, username} = req.fields;

    if (!emailValidator.validate(email)) {
      res.status(200).send({"error": "Email not valid"});
    } else if (password !== cpassword) {
      res.status(200).send({"error": "Password are not the same"});
    } else {
      const emailAlreadyUsed = await User.getByEmail(email);
      const usernameAlreadyUsed = await User.getByUsername(username);

      if (emailAlreadyUsed) {
        res.status(200).send({
          "result": false,
          "error": "Email already used",
        });
      } else if (usernameAlreadyUsed) {
        res.status(200).send({
          "result": false,
          "error": "Username already used",
        });
      } else {
        if (await User.create(email, username, password))
          res.status(200).send({"result": true});
        else
          res.status(400).send({
            "result": false,
            "error": "Creation failed",
          });
      }
    }
  }

  static async verify(token) {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, "oui", (error, decode) => {
        if (error) {
          resolve(false);
        } 
        if (decode) {
          resolve(true)
        }
      });
    });
  }

  static async getAll(req, res) {
    const USERS = await User.getAll();

    const users = USERS.map((user) => {
      const {_id, username, email} = user._doc;
      return{
        _id,
        username,
        email,
      };
    });

    if (users) {
      res.status(200).send({
        ...users
      });
    }
    else {
      res.status(404).send("Users not found");
    }
  }

  static async getById(req, res) {
    const user = await User.getById(req.params.id);

    if (user) {
      const {_id, username, email} = user;
      res.status(200).send({
        _id,
        username,
        email,
      });
    }
    else {
      res.status(404).send("User not found");
    }
  }
}

module.exports = UserController;
const bcrypt = require("bcrypt");

// MONGODB
const mongoose = require('mongoose');
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
mongoose.connect(`${config.database.host}/${config.database.name}`, {useNewUrlParser: true});

// SHEMA
const {UserShema} = require('../shema');

class UserModel {
  static getByEmail(email) {
    return new Promise((resolve, reject) => {
      UserShema.findOne({email}, (error, user) => {
        if (error) {
          reject(new Error("No user found"));
        } else {
          resolve(user);
        }
      });
    });
  }

  static getByUsername(username) {
    return new Promise((resolve, reject) => {
      UserShema.findOne({username}, (error, user) => {
        if (error) {
          reject(new Error("No user found"));
        } else {
          resolve(user);
        }
      });
    });
  }

  static getAll() {
    return new Promise(function(resolve, reject) {
      UserShema.find((error, users) => {
        if (error)
          reject(new Error(error.message));
        else if (users)
          resolve(users);
        else
          reject(new Error("No user found"));
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      UserShema.findOne({_id: id}, (error, user) => {
        if (error)
          reject(new Error(error.message));
        else if (user)
          resolve(user._doc);
        else
          reject(new Error("No user found"));
      });
    });
  }

  static create(email, username, password) {
    const salt = bcrypt.genSaltSync(10);
    const cryptPass = bcrypt.hashSync(password, salt);
    const User = new UserShema({
      email,
      username,
      password: cryptPass,
    });

    return new Promise((resolve, reject) => {
      User.save((error , result) => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
    });
  }
}

module.exports = UserModel;
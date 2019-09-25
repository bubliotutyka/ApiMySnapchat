// MONGODB
const mongoose = require('mongoose');
const fs = require("fs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
mongoose.connect(`${config.database.host}/${config.database.name}`, {useNewUrlParser: true});

// SHEMA
const {SnapShema} = require('../shema');

class SnapModel {
  static getAll() {
    return new Promise((resolve, reject) => {
      SnapShema.find({seen: false}, (error , snaps) => {
        if (error)
          reject(new Error(error.message));
        else if (snaps)
          resolve(snaps);
        else
          reject(new Error("No snaps found"));
      })
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      SnapShema.findOne({_id: id, seen: false}, (error , snap) => {
        if (error)
          reject(new Error(error.message));
        else if (snap)
          resolve(snap);
        else
          reject(new Error("No snap found"));
      })
    });
  }

  static getByTo(username) {
    return new Promise((resolve, reject) => {
      SnapShema.find({to: username, seen: false}, (error , snaps) => {
        if (error)
          reject(new Error(error.message));
        else if (snaps)
          resolve(snaps);
        else
          reject(new Error("No snap found"));
      })
    });
  }

  static create(from, to, duration, url) {
    const Snap = new SnapShema({
      from,
      to,
      duration,
      url,
    });

    return new Promise((resolve, reject) => {
      Snap.save((error , result) => {
        if (error) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
    });
  }

  static update(snap) {
    return new Promise((resolve, reject) => {
      snap.save((error , result) => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
    });
  }

  static delete() {

  }
}

module.exports = SnapModel;
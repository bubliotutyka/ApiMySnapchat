const fs = require('fs');
const Snap = require('../models/SnapModel');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const __separator = () => {
  if (process.platform === "win32")
    return "\\";
  else
    return "/";
}

class SnapController {
  static async create(req, res) {
    const {image} = req.files;
    const {to, duration} = req.fields;

    const snap = await Snap.create(req.user.username, to, duration, "not upload");

    const filename = `${snap._id}.${image.type.split("/")[1]}`;
    snap.url = config.uploadPath + __separator() + filename;
    const snapPath = `.${snap.url}`;
    const isCreated = await Snap.update(snap);

    await fs.readFile(image.path, (err, data) => {
      if (err) throw err;
      fs.writeFile(snapPath, data, (err) => {
        if (err) throw err;
      });
    });

    if (isCreated) {
      res.status(200).send({
        snap: {
          _id: snap.id,
          to: snap.to,
          from: snap.from,
          duration: snap.duration,
          url: snap.url,
        }
      });
    } else {
      res.status(400).send("Creation failed");
    }
  }

  static async getImage(req, res) {
    try {
      const snap = await Snap.getById(req.params.id);
      const splitPath = __dirname.split(__separator());
      splitPath.pop();
      res.status(200).sendFile(splitPath.join(__separator()) + snap.url);
    } catch (error) {
      res.status(403).send("Snap not found");
    }
  }

  static async getUserSnaps(req, res) {
    try {
      const snaps = await Snap.getByTo(req.user.username);
      const result = [];

      for (let i = 0; i < snaps.length; i++) {
        const {_id, from, duration} = snaps[i];
        
        result.push({
          _id,
          from,
          duration,
          url: `api/snap/image/${_id}`,
        });
      }

      res.status(200).send(result);
    } catch (error) {
      res.status(200).send({});
    }
  }

  static async seen(req, res) {
    const snap = await Snap.getById(req.params.id);

    snap.seen = true;
    const seen = await Snap.update(snap);

    if (seen)
      res.status(200).send({delete: true});
    else
      res.status(200).send({delete: false});
  };
}

module.exports = SnapController;
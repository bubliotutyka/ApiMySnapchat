const express = require('express');
const SnapController = require('../../controllers/SnapController');
const router = express.Router();

router.get("/", (req, res) => {
  SnapController.getUserSnaps(req, res);
});

router.post("/", (req, res) => {
  SnapController.create(req, res);
});

router.get("/image/:id", (req, res) => {
  SnapController.getImage(req, res);
});

router.get("/:id", (req, res) => {
  SnapController.getImage(req, res);
});

router.delete("/:id", (req, res) => {
  SnapController.seen(req, res);
});

module.exports = router;

// i3cithondurrystebist
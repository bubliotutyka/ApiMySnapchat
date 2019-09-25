const express = require('express');
const UserController = require('../../controllers/UserController');

const router = express.Router();

router.post("/login", async (req, res) => {
  UserController.login(req, res);
});

router.post("/", async (req, res) => {
  UserController.register(req, res);
});

router.get("/verify", async (req, res) => {
  res.status(200).send({
    result: await UserController.verify(req.headers.token),
  });
});

router.get("/", async (req, res) => {
  UserController.getAll(req, res);
});

router.get("/:id", async (req, res) => {
  UserController.getById(req, res);
});

module.exports = router;
const router = require("express").Router();

const { getAllUsers, createUser, getUserById } = require("../controllers/user");

router.route("/users").get(getAllUsers).post(createUser);
router.route("/users/:id").get(getUserById);

module.exports = router;

const router = require("express").Router();
const {
  getAllProperties,
  getPropertyDetail,
  createProperty,
} = require("../controllers/property");

router.route("/users").get(getAllProperties).post(createProperty);
router.route("/user/:id").get(getPropertyDetail);

module.exports = router;

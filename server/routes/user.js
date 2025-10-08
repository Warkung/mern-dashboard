const router = require("express").Router();
const {
  getAllProperties,
  getPropertyDetail,
  createProperty,
} = require("../controllers/property");

router.route("/").get(getAllProperties).post(createProperty);
router.route("/:id").get(getPropertyDetail);

module.exports = router;

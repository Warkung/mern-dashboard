const router = require("express").Router();
const {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/property");

router.route("/properties").get(getAllProperties).post(createProperty);
router
  .route("/property/:id")
  .get(getPropertyDetail)
  .put(updateProperty)
  .patch(updateProperty)
  .delete(deleteProperty);

module.exports = router;

const router = require("express").Router();
const taksController = require("../../controllers/taksController");

// Matches with "/api/articles"
router.route("/")
  .get(taksController.findAll)
  .post(taksController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(taksController.findById)
  .put(taksController.update)
  .delete(taksController.remove);

module.exports = router;

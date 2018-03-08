const router = require("express").Router();
const userRoutes = require("./users");
const takRoutes = require("./taks");

// Article routes
router.use("/users", userRoutes);
router.use("/taks", takeRoutes);

module.exports = router;

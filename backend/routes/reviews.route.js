const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews.controller");

router.get("/", reviewsController.getAll);
router.get("/:id", reviewsController.getById);
router.post("/", reviewsController.insert);
router.put("/:id", reviewsController.update);
router.delete("/:id", reviewsController.delete);
module.exports = router;


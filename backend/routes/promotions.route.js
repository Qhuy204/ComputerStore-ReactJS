const express = require("express");
const router = express.Router();
const promotionsController = require("../controllers/promotions.controller");

router.get("/", promotionsController.getAll);
router.get("/:id", promotionsController.getById);
router.post("/", promotionsController.insert);
router.put("/:id", promotionsController.update);
router.delete("/:id", promotionsController.delete);
module.exports = router;


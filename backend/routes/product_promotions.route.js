const express = require("express");
const router = express.Router();
const product_promotionsController = require("../controllers/product_promotions.controller");

router.get("/", product_promotionsController.getAll);
router.get("/:id", product_promotionsController.getById);
router.post("/", product_promotionsController.insert);
router.put("/:id", product_promotionsController.update);
router.delete("/:id", product_promotionsController.delete);
module.exports = router;


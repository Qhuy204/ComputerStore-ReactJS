const express = require("express");
const router = express.Router();
const product_attributesController = require("../controllers/product_attributes.controller");

router.get("/", product_attributesController.getAll);
router.get("/:id", product_attributesController.getById);
router.post("/", product_attributesController.insert);
router.put("/:id", product_attributesController.update);
router.delete("/:id", product_attributesController.delete);
module.exports = router;


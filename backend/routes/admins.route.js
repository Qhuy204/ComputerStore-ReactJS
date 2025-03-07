const express = require("express");
const router = express.Router();
const adminsController = require("../controllers/admins.controller");

router.get("/", adminsController.getAll);
router.get("/:id", adminsController.getById);
router.post("/", adminsController.insert);
router.put("/:id", adminsController.update);
router.delete("/:id", adminsController.delete);
module.exports = router;


const express = require("express");
const router = express.Router();
const passiveController = require("../controllers/passiveController");

// Rota que a Evolution API vai chamar ao receber mensagem
router.post("/webhook/passive", passiveController.handleIncoming);

module.exports = router;


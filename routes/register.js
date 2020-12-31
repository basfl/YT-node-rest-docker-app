const express = require("express");
const regsiterController = require("../controllers/register")
const router = express.Router();
router.post("/login", regsiterController.loginUser);

module.exports = router; 
const express = require("express");
const router = express.Router();
const donationControllers = require("../controllers/donationController");



router.post("/donate/:projectId", donationControllers.userDonate);



module.exports = router
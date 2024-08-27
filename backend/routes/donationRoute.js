const express = require("express");
const router = express.Router();
const donationControllers = require("../controllers/donationController");



router.post("/donate/:projectId", donationControllers.userDonate);
router.patch("/acceptDonate/:projectId/:donationId", donationControllers.donationAccepted)


module.exports = router
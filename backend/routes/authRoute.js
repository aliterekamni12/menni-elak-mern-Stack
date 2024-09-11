const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.logIn);
router.patch("/updatePassword/:userId",authController.protect, authController.updatePassword)
router.patch("/forgotPassword" ,authController.protect, authController.forgotPassword);
router.patch("/resetPassword/:token" ,  authController.resetPassword);

router.post("/verifyEmail",authController.protect, authController.verifyEmail);

router.patch("/verifyEmail/:token" , authController.setEmailVerified);


module.exports = router
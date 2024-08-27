const express= require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")

router.get("/getAllUsers" , adminController.adminValidation , adminController.getAllUsers);

router.delete("/deleteUser/:userId" , adminController.adminValidation , adminController.deleteUser);

router.get("/getAllNotAcceptedPost" , adminController.adminValidation, adminController.getAllNotAcceptedPost);

router.patch("/acceptPost/:postId" , adminController.adminValidation, adminController.acceptPost);

router.patch("/acceptDonate/:projectId/:donationId",adminController.adminValidation, adminController.donationAccepted)



module.exports = router;
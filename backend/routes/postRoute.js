const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/post",postController.identification,  postController.createPost)
router.patch("/editPost/:postId", postController.identification,postController.editPost);
router.get("/post" , postController.getAllAcceptedPosts)

router.delete("/deletePost/:postId" ,postController.identification, postController.deletePost)

module.exports = router;
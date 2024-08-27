const express = require("express");
const router = express.Router();
const projectControllers = require("../controllers/projectControllers");


router.get("/projects" , projectControllers.getAllProject);
router.post("/addProject" , projectControllers.createProject);
router.patch("/editProject/:projectId", projectControllers.editProject)
router.delete("/deleteProject/:projectId", projectControllers.deleteProject)


module.exports = router
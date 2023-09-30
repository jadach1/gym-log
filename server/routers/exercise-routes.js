const express = require("express");
const router = express.Router();
const controller = require("../controllers/exercise.controller")
const USER = require("../models/User")

router.get("/exercises", controller.getExercises);
router.get("/exercises/:exercise/:bodyPart/:date/:sortBy", controller.getExercises);
router.get("/getExercise/:id", controller.getExerciseById);

router.post("/create", controller.createSet);
router.put("/edit", controller.editSet);

router.delete("/deleteExercise/:id", controller.deleteExercise)
module.exports = router;
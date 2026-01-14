const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

//add student
router.post("/", auth, async (req, res) => {
  try {
    const student = await Student.create({ ...req.body, createdBy: req.user });

    res.status(200).json(student);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//get students
router.get("/", auth, async (req, res) => {
  try {
    const students = await Student.find({ createdBy: req.user });

    res.status(200).json(students);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//delete student
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

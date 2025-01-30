const express = require("express");
const Task = require("../models/taskmodels"); // Import the Task model

const router = express.Router();

// Route to GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from MongoDB
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to POST (add) a new task
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({ title });
    await newTask.save(); // Save the new task in the database
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

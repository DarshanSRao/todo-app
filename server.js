app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    res.json(task); // Return the updated task
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
